import { Router } from "express";
import { exampleController } from "../ExampleController/example.controller";

const router = Router();

router.get("/", (req, res) => exampleController.getAll(req, res));
router.get("/:id", (req, res) => exampleController.getOne(req, res));
router.post("/", (req, res) => exampleController.create(req, res));
router.put("/:id", (req, res) => exampleController.update(req, res));
router.delete("/:id", (req, res) => exampleController.delete(req, res));

export { router as exampleRouter };
