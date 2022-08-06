import developerModel from "../models/developerModel";
import { Request, Response } from "express";
import { Types } from "mongoose";

const getDevelopers = async (req: Request, res: Response) => {
    try {
        const developers = await developerModel.find();
        res.status(200).json(developers);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const getDeveloper = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    try {
        const developer = await developerModel.findById(id);
        res.status(200).json(developer);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const createDeveloper = async (req: Request, res: Response) => {
    const { name, about } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push("name");
    }
    if (!about) {
        emptyFields.push("about");
    }

    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields", emptyFields });
    }
    try {
        const developer = await developerModel.create({ name, about });
        res.status(200).json(developer);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteDeveloper = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }
    const developer = await developerModel.findOneAndDelete({ _id: id });

    if (!developer) {
        return res.status(400).json({ error: "no such developer" });
    }

    res.status(200).json(developer);
};

const updateDeveloper = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    const developer = await developerModel.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!developer) {
        return res.status(400).json({ error: "no such developer" });
    }

    res.status(200).json(developer);
};

export default { getDevelopers, getDeveloper, createDeveloper, deleteDeveloper, updateDeveloper };
