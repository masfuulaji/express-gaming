import { Document } from "mongoose";

export default interface IGame extends Document {
    name: string;
    description: string;
    release_date: Date;
    price: number;
}