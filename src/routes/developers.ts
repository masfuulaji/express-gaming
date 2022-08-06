import express from "express";
import developer from "../controllers/developerController";

const router = express.Router();

router.get("/", developer.getDevelopers);

router.get("/:id", developer.getDeveloper);

router.post("/", developer.createDeveloper);

router.delete("/:id", developer.deleteDeveloper);

router.patch("/:id", developer.updateDeveloper)
export = router;
