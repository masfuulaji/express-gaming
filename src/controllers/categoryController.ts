import categoryModel from "../models/categoryModel";
import { Request, Response } from "express";
import { Types } from "mongoose";

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    try {
        const category = await categoryModel.findById(id);
        res.status(200).json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const createCategory = async (req: Request, res: Response) => {
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
        const category = await categoryModel.create({ name, description });
        res.status(200).json(category);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteCategory = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }
    const category = await categoryModel.findOneAndDelete({ _id: id });

    if (!category) {
        return res.status(400).json({ error: "no such category" });
    }

    res.status(200).json(category);
};

const updateCategory = async (req:Request, res:Response) => {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    const category = await categoryModel.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!category) {
        return res.status(400).json({ error: "no such category" });
    }

    res.status(200).json(category);
};

export default { getCategories, getCategory, createCategory, deleteCategory, updateCategory };
