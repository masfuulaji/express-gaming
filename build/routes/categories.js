"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../controllers/categoryController"));
const router = express_1.default.Router();
router.get("/", categoryController_1.default.getCategories);
router.get("/:id", categoryController_1.default.getCategory);
router.post("/", categoryController_1.default.createCategory);
router.delete("/:id", categoryController_1.default.deleteCategory);
router.patch("/:id", categoryController_1.default.updateCategory);
module.exports = router;
