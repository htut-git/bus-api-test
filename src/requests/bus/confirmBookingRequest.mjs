import { body } from "express-validator";

const confirmBookingRequest = [
    body("boardingPoint").notEmpty().withMessage("Boarding point is required"),
    body("droppingPoint").notEmpty().withMessage("Dropping point is required"),
    body("seatNo").notEmpty().withMessage("Seat number is required"),
    body("seatId").isInt().withMessage("Seat ID must be an integer"),
    body("foreigner").isBoolean().withMessage("Foreigner must be a boolean value"),
    body("paymentMethod").isString().isLength({ max: 20 }).withMessage("Payment method is required and max 20 chars"),
    body("guestMobile").notEmpty().withMessage("Guest mobile is required"),
    body("passengerName").isString().isLength({ max: 255 }).withMessage("Passenger name is required and max 255 chars"),
    body("passengerType")
        .isString()
        .isIn(["male", "female", "group", "monk"])
        .isLength({ max: 10 })
        .withMessage("Passenger type must be 'male', 'female', 'group', or 'moke' and max 10 chars"),
    body("nrcNo").isString().isLength({ max: 40 }).withMessage("NRC no is required and max 40 chars"),
    body("note").optional().isString().isLength({ max: 400 }).withMessage("Note max 400 chars"),
];

export default confirmBookingRequest;
