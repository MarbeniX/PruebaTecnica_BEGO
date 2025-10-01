import { Router } from "express";
import { body, param } from "express-validator";
import { authenticateJWT } from "../middlewares/auth";
import { handleInputErrors } from "../middlewares/validation";
import { LocationController } from "../controllers/locationController";
import { authorizeLocationOwnner } from "../middlewares/authorizeLocationOwner";

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

router.use("/:place_id", authorizeLocationOwnner);
router.get(
    "/:place_id",
    param("place_id")
        .isString()
        .withMessage("place_id must be a string")
        .notEmpty()
        .withMessage("place_id is required"),
    handleInputErrors,
    LocationController.getLocationByPlaceId
);

router.get("/", LocationController.getLocationsByUser);

router.put(
    "/:place_id",
    param("place_id")
        .isString()
        .withMessage("place_id must be a string")
        .notEmpty()
        .withMessage("place_id is required"),
    body("new_place_id")
        .isString()
        .withMessage("new_place_id must be a string")
        .notEmpty()
        .withMessage("new_place_id is required"),
    handleInputErrors,
    LocationController.updateLocation
);

router.delete(
    "/:place_id",
    param("place_id")
        .isString()
        .withMessage("place_id must be a string")
        .notEmpty()
        .withMessage("place_id is required"),
    handleInputErrors,
    LocationController.deleteLocation
);

router.delete("/", LocationController.deleteLocationsByUser);

export default router;
