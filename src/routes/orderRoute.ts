import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { authenticateJWT } from "../middlewares/auth";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.use(authenticateJWT);

router.post(
    "/",
    body("user")
        .isMongoId()
        .withMessage("user must be a valid Mongo ID")
        .notEmpty()
        .withMessage("user is required"),
    body("truck")
        .isMongoId()
        .withMessage("truck must be a valid Mongo ID")
        .notEmpty()
        .withMessage("truck is required"),
    body("pickup")
        .isMongoId()
        .withMessage("pickup must be a valid Mongo ID")
        .notEmpty()
        .withMessage("pickup is required"),
    body("dropoff")
        .isMongoId()
        .withMessage("dropoff must be a valid Mongo ID")
        .notEmpty()
        .withMessage("dropoff is required")
        .custom((value, { req }) => {
            if (value === req.body.pickup) {
                throw new Error(
                    "pickup and dropoff must be different locations"
                );
            }
            return true;
        }),
    handleInputErrors,
    OrderController.createOrder
);

router.get(
    "/:id",
    param("id")
        .isMongoId()
        .withMessage("id must be a valid Mongo ID")
        .notEmpty()
        .withMessage("id is required"),
    handleInputErrors,
    OrderController.getOrderById
);

router.get("/", OrderController.getOrders);

router.put(
    "/:id",
    param("id")
        .isMongoId()
        .withMessage("id must be a valid Mongo ID")
        .notEmpty()
        .withMessage("id is required"),
    body("user")
        .isMongoId()
        .withMessage("user must be a valid Mongo ID")
        .notEmpty()
        .withMessage("user is required"),
    body("truck")
        .isMongoId()
        .withMessage("truck must be a valid Mongo ID")
        .notEmpty()
        .withMessage("truck is required"),
    body("pickup")
        .isMongoId()
        .withMessage("pickup must be a valid Mongo ID")
        .notEmpty()
        .withMessage("pickup is required"),
    body("dropoff")
        .isMongoId()
        .withMessage("dropoff must be a valid Mongo ID")
        .notEmpty()
        .withMessage("dropoff is required")
        .custom((value, { req }) => {
            if (value === req.body.pickup) {
                throw new Error(
                    "pickup and dropoff must be different locations"
                );
            }
            return true;
        }),
    handleInputErrors,
    OrderController.updateOrderById
);

router.patch(
    "/:id/status",
    param("id")
        .isMongoId()
        .withMessage("id must be a valid Mongo ID")
        .notEmpty()
        .withMessage("id is required"),
    body("status")
        .isIn(["created", "in transit", "completed"])
        .withMessage("status must be one of: created, in transit, completed")
        .notEmpty()
        .withMessage("status is required"),
    handleInputErrors,
    OrderController.updateOrderStatusById
);

router.delete(
    "/:id",
    param("id")
        .isMongoId()
        .withMessage("id must be a valid Mongo ID")
        .notEmpty()
        .withMessage("id is required"),
    handleInputErrors,
    OrderController.deleteOrderById
);

router.delete("/", OrderController.deleteOrders);

export default router;
