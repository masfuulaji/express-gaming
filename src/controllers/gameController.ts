import gameModel from "../models/gameModel";
import { Request, Response } from "express";
import { Types } from "mongoose";

const getGames = async (req: Request, res: Response) => {
    try {
        const games = await gameModel.find();
        res.status(200).json(games);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const getGame = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    try {
        const game = await gameModel.findById(id);
        res.status(200).json(game);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const createGame = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }
    if (!description) {
        emptyFields.push("description");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields", emptyFields });
    }
    try {
        const game = await gameModel.create({ name, description });
        res.status(200).json(game);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteGame = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }
    const game = await gameModel.findOneAndDelete({ _id: id });

    if (!game) {
        return res.status(400).json({ error: "no such game" });
    }

    res.status(200).json(game);
};

const updateGame = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    const game = await gameModel.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!game) {
        return res.status(400).json({ error: "no such game" });
    }

    res.status(200).json(game);
};

export default { getGames, getGame, createGame, deleteGame, updateGame };
