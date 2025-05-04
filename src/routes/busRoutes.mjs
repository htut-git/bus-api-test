import express from "express";
import busSearchRequest from "../requests/bus/busSearchRequest.mjs";
import { validateRequest } from "../middlewares/validateRequest.mjs";
import busController from "../controllers/busController.mjs";
import busSeatPlanRequest from "../requests/bus/busSeatPlanRequest.mjs";
const busRoutes = express.Router();

busRoutes.get("/",busSearchRequest,validateRequest,busController.busSearch);
busRoutes.get("/get-bus-seat-plan",busSeatPlanRequest,validateRequest,busController.getBusSeatPlan);
busRoutes.get("/townships",busController.getTownships);

export default busRoutes;