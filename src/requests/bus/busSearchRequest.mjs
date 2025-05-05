import { query } from "express-validator";

const busSearchRequest = [
    query("fromDestination").notEmpty().withMessage("From destination is required"),
    query("toDestination").notEmpty().withMessage("To destination is required"),
    query("forDate")
        .notEmpty().withMessage("For date is required")
        .isISO8601().withMessage("For date must be in Y-m-d format")
        .custom((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for comparison
            if (inputDate < today) {
                throw new Error("For date must not be in the past");
            }
            return true;
        }),
];

export default busSearchRequest;