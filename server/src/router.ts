import express from "express";
import {
	createUserController,
	getUserController,
	getUsersController,
} from "./controllers/userControllers";
import {
	createUserCornerModel,
	getUserCornersModel,
} from "./models/cornerModels";
import {
	createUserCornerController,
	getUserCornersController,
} from "./controllers/cornerControllers";
import { createPrimitiveController } from "./controllers/primitiveControllers";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

// * USERS ROUTES
// Gets all the users
router.get("/users", getUsersController);

// Creates a new user
router.post("/users", createUserController);

// Gets a specific user
router.get("/user/:userId/", getUserController);

// * CORNERS ROUTES
// Gets the corners for a specific user
router.get("/user/:userId/corners", getUserCornersController);

// Creates a new corner for a specific user
router.post("/user/:userId/corner", createUserCornerController);

// Gets information about a user's corner
router.get("/user/:userId/corner/:cornerId/");

// * PRIMITIVES ROUTES
// Get the primitives for a user's corner
router.get("/user/:userId/corner/:cornerId/primitives");

// Create a new primitive for a user's corner
router.post(
	"/user/:userId/corner/:cornerId/primitive",
	createPrimitiveController,
);

// Update primitives for a user's corner

// Delete primitives for a user's corner

export { router };
