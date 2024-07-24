import express from "express";
import { getUsersController } from "./controllers/userControllers";

const router = express.Router();

router.get("/", (req, res) => {
	res.send("Hello World!");
});

router.get("/users", getUsersController);

router.post("/users");

export { router };
