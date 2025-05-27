import { Op, where } from 'sequelize';
import models from '../models/index.mjs';

const BusRepository = {
    async searchBuses(fromDestination, toDestination, forDate) {
        const formattedDate = new Date(forDate);
        return await models.Bus.findAll({
            include: [
                {
                    model: models.BusCompany,
                    as: 'busCompany',
                    attributes: ['name'],
                },
                {
                    model: models.Destination,
                    as: 'busFrom',
                    attributes: ['name', 'id'],
                },
                {
                    model: models.Destination,
                    as: 'busTo',
                    attributes: ['name', 'id'],
                },
                {
                    model: models.BusSeatPlan,
                    as: 'busSeatPlans',
                    required: true,
                },
                {
                    model: models.BusDroppingPoint,
                    as: 'busDroppingPoints',
                    attributes: ['bus_id', 'station_id'],
                    include: [
                        {
                            model: models.Station,
                            as: 'station',
                            attributes: ['id', 'name'],
                        }
                    ]
                },
                {
                    model: models.BusBoardingPoint,
                    as: 'busBoardingPoints',
                    attributes: ['bus_id', 'station_id'],
                    include: [
                        {
                            model: models.Station,
                            as: 'station',
                            attributes: ['id', 'name'],
                        }
                    ]
                }
            ],
            where: {
                '$busFrom.name$': fromDestination,
                '$busTo.name$': toDestination,
                'is_active': 1,
                '$busSeatPlans.bus_travel_date$': {
                    [Op.eq]: formattedDate,
                },
            },
        });
    },
    async getTownships() {
        return await models.Destination.findAll();
    },
};

export default BusRepository;