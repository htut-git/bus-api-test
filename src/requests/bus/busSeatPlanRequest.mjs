import { query } from "express-validator";

const busSeatPlanRequest = [
    query("seatPlanId").notEmpty().withMessage("Seat plan ID is required"),
]

export default busSeatPlanRequest;