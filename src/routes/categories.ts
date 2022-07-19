import express from "express";
import category from "../controllers/categoryController";

const router = express.Router();

router.get("/", category.getCategories);

router.get("/:id", category.getCategory);

router.post("/", category.createCategory);

router.delete("/:id", category.deleteCategory);

router.patch("/:id", category.updateCategory)
export = router;
