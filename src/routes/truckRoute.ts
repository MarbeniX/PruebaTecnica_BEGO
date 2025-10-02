import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { TruckController } from "../controllers/truckController";
import { authenticateJWT } from "../middlewares/auth";

const router = Router();

router.use(authenticateJWT);

router.post(
    "/",
    body("id")
        .isMongoId()
        .withMessage("Invalid user id")
        .notEmpty()
        .withMessage("User id is required"),
    body("year")
        .isString()
        .withMessage("Year must be a string")
        .custom((value) => {
            if (!/^\d{4}$/.test(value)) {
                throw new Error("Year must be a 4-digit string");
            }
            const yearNum = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if (yearNum > currentYear + 1) {
                throw new Error(
                    `Year cannot be greater than ${currentYear + 1}`
                );
            }
            return true;
        })
        .notEmpty()
        .withMessage("Year is required"),
    body("color")
        .isString()
        .withMessage("Color must be a string")
        .notEmpty()
        .withMessage("Color is required"),
    body("plates")
        .isString()
        .withMessage("Plates must be a string")
        .notEmpty()
        .withMessage("Plates is required"),
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
        .custom((value) => {
            if (!/^\d{4}$/.test(value)) {
                throw new Error("Year must be a 4-digit string");
            }
            const yearNum = parseInt(value, 10);
            const currentYear = new Date().getFullYear();
            if (yearNum > currentYear + 1) {
                throw new Error(
                    `Year cannot be greater than ${currentYear + 1}`
                );
            }
            return true;
        })
        .notEmpty()
        .withMessage("Year is required"),
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
    TruckController.getTruckById
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid id"),
    handleInputErrors,
    TruckController.deleteTruckById
);

router.delete("/", TruckController.deleteAllTrucks);

export default router;
