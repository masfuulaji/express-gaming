import { Document } from "mongoose";

export default interface IDeveloper extends Document {
    name: string;
    about: string;
}