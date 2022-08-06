import { Document, Types } from "mongoose";

export default interface IGame extends Document {
    name: string;
    description: string;
    release_date: Date;
    price: number;
    category: Array<Types.ObjectId>;
    developer:Types.ObjectId;
}