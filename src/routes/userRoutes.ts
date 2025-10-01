import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { UserController } from "../controllers/userController";
import { authenticateJWT } from "../middlewares/auth";

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

router.post(
    "/login",
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    handleInputErrors,
    UserController.login
);

router.use(authenticateJWT);

router.get("/", handleInputErrors, UserController.getAllUsers);

router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid user ID"),
    handleInputErrors,
    UserController.getUserById
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid user ID"),
    handleInputErrors,
    UserController.deleteUserById
);

router.delete("/", handleInputErrors, UserController.deleteAllUsers);

router.put(
    "/change-email",
    body("newEmail").isEmail().withMessage("Invalid email format"),
    handleInputErrors,
    UserController.updateUserEmail
);

router.put(
    "/change-password",
    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    handleInputErrors,
    UserController.updateUserPassword
);

export default router;
