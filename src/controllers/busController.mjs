import { unserialize } from "php-serialize";
import { addDurationToDepartureTime, convertMyanmarToUTC } from "../helpers/dateTimeHelper.mjs";
import busRepository from "../repository/busRepository.mjs";
import seatPlanRepository from "../repository/seatPlanRepository.mjs";

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
        res.status(500).json({ error: 'Failed to retrieve buses' });
    }
}

const getBusSeatPlan = async (req, res) => {
    const { seatPlanId } = req.query;
    try {
        const seatPlanInstance = await seatPlanRepository.getSeatPlanById(seatPlanId);
        const seatPlan = seatPlanInstance.get({ plain: true });
        const seatMapArray = seatPlan.seatMap.split(',').map(item => item.split(''));
        const rawSeatMap = [];
        let reservedSeats = "";
        let temporaryHoldingSeats = "";
        console.log(seatPlan.reservedSeats);
        
        seatPlan.reservedSeats.forEach((seat)=>{
            reservedSeats += seat.reserved_seats
        });

        seatPlan.tempSeats.forEach((seat)=>{
            temporaryHoldingSeats += seat.temp_seats;
        })
        delete seatPlan.tempSeats;
        
        
        for (let i = 0; i < seatMapArray.length; i++) {
            const seatRow = seatMapArray[i];
            const seatRawRow = [];
            let sCount = 0 ;
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
                    sCount ++;
                } else {
                    seatRawRow.push({ "": "" });
                }
            }
            rawSeatMap.push(seatRawRow);
        }
        seatPlan.seatMap = rawSeatMap;
        seatPlan.reservedSeats = reservedSeats;
        seatPlan.temporaryHoldingSeats = temporaryHoldingSeats;
        res.json(seatPlan);
    } catch (error) {
        console.error('Error retrieving bus seat plan:', error);
        res.status(500).json({ error: 'Failed to retrieve bus seat plan' });
    }
}

const getTownships = async (req, res) => {
    try {
        const townships = await busRepository.getTownships();
        res.json(townships);
    } catch (error) {
        console.error('Error retrieving townships:', error);
        res.status(500).json({ error: 'Failed to retrieve townships' });
    }
}

export default { busSearch, getBusSeatPlan , getTownships }