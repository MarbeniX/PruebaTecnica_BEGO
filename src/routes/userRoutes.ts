import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { UserController } from "../controllers/userController";

const router = Router();

router.post(
    "/register",
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    handleInputErrors,
    UserController.createUser
);

export default router;
