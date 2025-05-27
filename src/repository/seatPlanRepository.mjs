import { literal } from "sequelize";
import models from "../models/index.mjs";

const seatPlanRepository = {
    async getSeatPlanById(seatPlanId) {
        return await models.BusSeatPlan.findOne({
            attributes: ['id', 'prefix', 'bus_travel_date',
                [literal(`REPLACE(REPLACE(seatMap, "'", ""), '\\n', '')`), 'seatMap'],
                [literal(`REPLACE(REPLACE(BusSeatPlan.blockMap, "'", ""), '\\n', '')`), 'blockSeats',],
            ],
            where: {
                id: seatPlanId,
            },
            include: [
                {
                    model: models.Booking,
                    as: 'bookings',
                    attributes: [
                        [literal(` REPLACE(bookings.selected_seat, "'", "")`), 'selected_seats'],
                    ],
                },
                {
                    model: models.ReservedSeat,
                    as: 'reservedSeats',
                    attributes: [
                        [literal(` REPLACE(reservedSeats.blockMap, "'", "")`), 'reserved_seats']
                    ]
                },
                {
                    model: models.TempSeat,
                    as: 'tempSeats',
                    attributes: [
                        [literal(` REPLACE(tempSeats.selected_seat, "'", "")`), 'temp_seats']
                    ]
                },
            ],
        });
    },
}



export default seatPlanRepository;