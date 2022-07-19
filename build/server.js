"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const categories_1 = __importDefault(require("./routes/categories"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
// route
app.use("/api/category", categories_1.default);
app.use("/", (req, res) => {
    res.send("Welcome to Hell");
});
app.use("/*", (req, res) => {
    res.status(404).json({ message: "Wrong page fool" });
});
let mongo_uri = process.env.MONGO_URI
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/games";
mongoose_1.default
    .connect(mongo_uri)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
    });
})
    .catch((err) => {
    console.log(err);
});
