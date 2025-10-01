import { Router } from "express";
import { body, param } from "express-validator";
import { authenticateJWT } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/validation";
import { TruckController } from "../controllers/truckController";

const router = Router();

router.use(authenticateJWT);

router.post(
    "/",
    body("year")
        .isString()
        .withMessage("Year must be a string")
        .custom((value) => {
            if (!/^\d{4}$/.test(value)) {
                throw new Error("Year must be a 4-digit number");
            }
        })
        .notEmpty()
        .withMessage("Year must be a 4-digit number"),
    body("color").isString().withMessage("Color must be a string").notEmpty(),
    body("plates").isString().withMessage("Plates must be a string").notEmpty(),
    handleInputErrors,
    TruckController.createTruck
);

router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    body("year")
        .isString()
        .withMessage("Year must be a string")
        .custom((value) => {
            if (!/^\d{4}$/.test(value)) {
                throw new Error("Year must be a 4-digit number");
            }
        })
        .notEmpty(),
    body("color").isString().withMessage("Color must be a string").notEmpty(),
    body("plates").isString().withMessage("Plates must be a string").notEmpty(),
    handleInputErrors,
    TruckController.updateTruck
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    handleInputErrors,
    TruckController.deleteTruckById
);

router.get("/", TruckController.getAllTrucks);

export default router;
