import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
import categoryRoutes from "./routes/categories";
import gameRoutes from "./routes/games";
import developerRoutes from "./routes/developers";

const app: Express = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next();
});

// route
app.use("/api/category", categoryRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/developer", developerRoutes);
app.use("/", (req: Request, res: Response) => {
    res.send("Welcome to Hell");
});

app.use("/*", (req, res) => {
    res.status(404).json({ message: "Wrong page fool" });
});

let mongo_uri: string = process.env.MONGO_URI
    ? process.env.MONGO_URI
    : "mongodb://localhost:27017/games";
mongoose
    .connect(mongo_uri)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(
                `[server]: Server is running at http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err: object) => {
        console.log(err);
    });
