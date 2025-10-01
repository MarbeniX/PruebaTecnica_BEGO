import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { TruckController } from "../controllers/truckController";

const router = Router();

router.post(
    "/",
    body("id").isMongoId().withMessage("Invalid user id").notEmpty(),
    body("year")
        .isString()
        .withMessage("Year must be a string")
        .custom((value) => {
            const yearNum = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if (isNaN(yearNum) || yearNum > currentYear + 1) {
                throw new Error(
                    `Year must be a valid 4-digit number not greater than ${
                        currentYear + 1
                    }`
                );
            }
        })
        .notEmpty(),
    body("color").isString().withMessage("Color must be a string").notEmpty(),
    body("plates").isString().withMessage("Plates must be a string").notEmpty(),
    handleInputErrors,
    TruckController.createTruck
);

router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    body("userId").isMongoId().withMessage("Invalid user id").notEmpty(),
    body("year")
        .isString()
        .withMessage("Year must be a string")
        .notEmpty()
        .custom((value) => {
            const yearNum = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if (isNaN(yearNum) || yearNum > currentYear + 1) {
                throw new Error(
                    `Year must be a valid 4-digit number not greater than ${
                        currentYear + 1
                    }`
                );
            }
        }),
    body("color").isString().withMessage("Color must be a string").notEmpty(),
    body("plates").isString().withMessage("Plates must be a string").notEmpty(),
    handleInputErrors,
    TruckController.updateTruck
);

router.get("/", TruckController.getAllTrucks);

router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    handleInputErrors,
    TruckController.getTrickById
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    handleInputErrors,
    TruckController.deleteTruckById
);

router.delete("/", TruckController.deleteAllTrucks);

export default router;
