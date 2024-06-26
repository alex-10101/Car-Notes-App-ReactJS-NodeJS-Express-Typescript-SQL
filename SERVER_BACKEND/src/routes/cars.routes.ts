import express from "express";
import {
  createCar,
  updateCar,
  deleteCar,
  getAllCars,
  getCar,
  getAllCarsAdminPriviledge,
  deleteCarForAdminPriviledge,
} from "../controllers/cars.controller";
import { verifyJWT } from "../middleware/verifyJWT.middleware";
import { verifyAdmin } from "../middleware/verifyRoles.middleware";

export const carRouter = express.Router();

// We want to protect all these routes. Authorization required for all these routes.
carRouter.use(verifyJWT);

carRouter.post("/", createCar);

carRouter.get("/", getAllCars);
carRouter.get("/admin/", verifyAdmin, getAllCarsAdminPriviledge);

carRouter.get("/:carId", getCar);

carRouter.put("/:carId", updateCar);

carRouter.delete("/:carId", deleteCar);
carRouter.delete("/admin/:carId", verifyAdmin, deleteCarForAdminPriviledge);
