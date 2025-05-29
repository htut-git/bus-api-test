import { serialize, unserialize } from "php-serialize";
import { addDurationToDepartureTime, convertMyanmarToUTC } from "../helpers/dateTimeHelper.mjs";
import busRepository from "../repository/busRepository.mjs";
import seatPlanRepository from "../repository/seatPlanRepository.mjs";
import models from "../models/index.mjs";
import { now } from "sequelize/lib/utils";
import { getNewBookingRef, getRawBookingRef, getSeatRawNumber } from "../helpers/bookingHelper.mjs";

const busSearch = async (req, res) => {
    const { fromDestination, toDestination, forDate } = req.query;
    const formattedDate = new Date(forDate);
    try {
        const buses = await busRepository.searchBuses(
            fromDestination,
            toDestination,
            formattedDate
        );
        const formattedBuses = [];
        buses.forEach(bus => {
            bus.busSeatPlans.forEach(seatPlan => {
                const formattedDepartureTime = convertMyanmarToUTC(`${seatPlan.bus_travel_date} ${bus.departure_time}`);
                formattedBuses.push({
                    seatPlanId: seatPlan.id,
                    busCompany: "JJ Express",
                    busType: bus.busCompany.name,
                    departureTime: formattedDepartureTime,
                    guessedArrivalTime: addDurationToDepartureTime(formattedDepartureTime, bus.duration),
                    duration: bus.duration,
                    fromTownship: bus.busFrom.name,
                    toTownship: bus.busTo.name,
                    busInfo: unserialize(seatPlan.bus_info),
                    busBoardingPoints: bus.busBoardingPoints.map(boardingPoint => boardingPoint.station.name),
                    busDroppingPoints: bus.busDroppingPoints.map(droppingPoint => droppingPoint.station.name),
                    description: bus.description,
                    busAmenities: bus.description,
                    sellingPrice: [
                        {
                            currency: "MMK",
                            localPassenger: bus.local_sell_price,
                            foreignerPassenger: bus.foreigner_sell_price,
                        }
                    ]
                });

            })
        });
        res.json(formattedBuses);
    } catch (error) {
        console.error('Error searching for buses:', error);
        res.status(500).json({ message: 'Failed to retrieve buses' });
    }
}

const formattedSeatPlan = async (seatPlanId) => {
    const seatPlanInstance = await seatPlanRepository.getSeatPlanById(seatPlanId);
    const seatPlan = seatPlanInstance.get({ plain: true });
    const seatMapArray = seatPlan.seatMap.split(',').map(item => item.split(''));
    const rawSeatMap = [];
    let reservedSeats = "";
    let temporaryHoldingSeats = "";
    let bookedSeats = "";
    seatPlan.reservedSeats.forEach((seat) => {
        reservedSeats += seat.reserved_seats
    });
    seatPlan.tempSeats.forEach((seat) => {
        temporaryHoldingSeats += seat.temp_seats;
    })
    seatPlan.bookings.forEach((booking) => {
        bookedSeats += booking.selected_seats
    });
    for (let i = 0; i < seatMapArray.length; i++) {
        const seatRow = seatMapArray[i];
        const seatRawRow = [];
        let sCount = 0;
        for (let a = 0; a < seatRow.length; a++) {
            const seat = seatRow[a];
            if (seat == 's') {
                let seatNumber = '';
                if (seatPlan.prefix == 'A') {
                    seatNumber = `${i + 1}${String.fromCharCode("A".charCodeAt(0) + sCount)}`;
                } else {
                    seatNumber = `${String.fromCharCode("A".charCodeAt(0) + i)}${sCount + 1}`;
                }
                seatRawRow.push({ [`${i + 1}_${a + 1}`]: seatNumber });
                sCount++;
            } else {
                seatRawRow.push({ "": "" });
            }
        }
        rawSeatMap.push(seatRawRow);
    }
    return {
        id: seatPlan.id,
        prefix: seatPlan.prefix,
        seatMap: rawSeatMap,
        blockSeats: seatPlan.blockSeats,
        reservedSeats: reservedSeats,
        temporaryHoldingSeats: temporaryHoldingSeats,
        bookedSeats: bookedSeats,
        travelDate: seatPlan.bus_travel_date,
    }
}

const getBusSeatPlan = async (req, res) => {
    const { seatPlanId } = req.query;
    try {
        const seatPlan = await formattedSeatPlan(seatPlanId);
        res.json(seatPlan);
    } catch (error) {
        console.error('Error retrieving bus seat plan:', error);
        res.status(500).json({ message: 'Failed to retrieve bus seat plan' });
    }
}

const getTownships = async (req, res) => {
    try {
        const townships = await busRepository.getTownships();
        res.json(townships);
    } catch (error) {
        console.error('Error retrieving townships:', error);
        res.status(500).json({ message: 'Failed to retrieve townships' });
    }
}

const confirmBooking = async (req, res) => {
    const request = req.body;
    try {
        const seatPlanModel = await models.BusSeatPlan.findByPk(request.seatId, {
            include: [{
                as: 'bus',
                model: models.Bus,
                attributes: ['local_sell_price', 'foreigner_sell_price','departure_time']
            }]
        });
        const departureDateTime = new Date(`${seatPlanModel.bus_travel_date}T${seatPlanModel.bus.departure_time}`);
        if (departureDateTime < new Date()) {
            return res.status(400).json({ message: 'Cannot book for past travel dates' });
        }
        if (!seatPlanModel) {
            return res.status(404).json({ message: 'Seat plan not found' });
        }
        const seatPlan = await formattedSeatPlan(request.seatId);
        const seatNumberArray = request.seatNo.split(',').map(seat => seat.trim());
        const rawSeatArray = getSeatRawNumber(seatNumberArray, seatPlan);
        if (rawSeatArray.length !== seatNumberArray.length) {
            return res.status(400).json({ message: 'Invalid seat numbers provided' });
        }
        rawSeatArray.forEach((rawNo,i) => {
            if (seatPlan.blockSeats.includes(rawNo)) {
                return res.status(400).json({ message: `Seat ${seatNumberArray[i]} is blocked` });
            } else if (seatPlan.reservedSeats.includes(rawNo)) {
                return res.status(400).json({ message: `Seat ${seatNumberArray[i]} is already reserved` });
            } else if (seatPlan.temporaryHoldingSeats.includes(rawNo)) {
                return res.status(400).json({ message: `Seat ${seatNumberArray[i]} is hold by other users` });
            } else if (seatPlan.bookedSeats.includes(rawNo)) {
                return res.status(400).json({ message: `Seat ${seatNumberArray[i]} is already booked` });
            }
        });
        const originalSellingPrice = request.type === 'local' ? seatPlanModel.bus.local_sell_price : seatPlanModel.bus.foreigner_sell_price;
        const selectedSeatWithQuotes = rawSeatArray.map(seat => `'${seat}'`).join(',');
        const newBookingRef = await getNewBookingRef();
        models.Booking.create({
            b_ref: await getNewBookingRef(),
            ref: getRawBookingRef(newBookingRef, seatPlanModel.bus_id, 0),
            seat_id: seatPlanModel.id,
            bus_id: seatPlanModel.bus_id,
            original_selling_price: originalSellingPrice,
            price: originalSellingPrice,
            service_fee: 0,
            amount: rawSeatArray.length * originalSellingPrice,
            travel_date: seatPlanModel.bus_travel_date,
            payment_method: 'kbz_pay',
            adult: rawSeatArray.length,
            guest_name: request.passengerName,
            guest_mobile: request.guestMobile,
            nrc_no: request.nrcNo,
            seat: request.seatNo+',',
            selected_seat: selectedSeatWithQuotes+',',
            note: request.note || '',
            type: request.foreigner ? 'foreigner' : 'local',
            passenger_name: request.passengerName,
            passenger_type: request.passengerType.toLowerCase(),
            boarding_point: serialize(request.boardingPoint),
            dropping_point: serialize(request.droppingPoint),
            booking_expire: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
        });
        res.json({
            message: 'Booking confirmed successfully',
            bookingRef: newBookingRef,
        });
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ message: 'Failed to confirm booking' });
    }
}

export default { busSearch, getBusSeatPlan, getTownships, confirmBooking }