import { literal } from "sequelize";
import models from "../models/index.mjs";

const seatPlanRepository = {
    async getSeatPlanById(seatPlanId) {
        return await models.BusSeatPlan.findOne({
            attributes :['id','prefix',[literal(`REPLACE(REPLACE(seatMap, "'", ""), '\\n', '')`),'seatMap']],
            where: {
                id: seatPlanId,
            },
            include: [
                {
                    model: models.Booking,
                    as: 'bookings',
                    attributes: [
                        'passenger_type',
                        [literal(` REPLACE(selected_seat, "'", "")`),'selected_seats'],
                        [literal(` REPLACE(seat, "'", "")`),'seats'],
                    ],
                },
            ],
        });
    }
}

export default seatPlanRepository;