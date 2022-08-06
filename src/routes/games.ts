import express from "express";
import game from "../controllers/gameController";

const router = express.Router();

router.get("/", game.getGames);

router.get("/:id", game.getGame);

router.post("/", game.createGame);

router.delete("/:id", game.deleteGame);

router.patch("/:id", game.updateGame)
export = router;
