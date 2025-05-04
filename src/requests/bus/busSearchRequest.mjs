import { query } from "express-validator";

const busSearchRequest = [
    query("fromDestination").notEmpty().withMessage("From destination is required"),
    query("toDestination").notEmpty().withMessage("To destination is required"),
    query("forDate")
        .notEmpty().withMessage("For date is required")
        .isISO8601().withMessage("For date must be in Y-m-d format"),
];

export default busSearchRequest;