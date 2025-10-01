import { Router } from "express";
import { body, param } from "express-validator";
import { authenticateJWT } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/validation";
import { LocationController } from "../controllers/locationController";

const router = Router();

router.use(authenticateJWT);

router.post(
    "/",
    body("place_id")
        .isString()
        .withMessage("place_id must be a string")
        .notEmpty()
        .withMessage("place_id is required"),
    handleInputErrors,
    LocationController.createLocation
);

export default router;
