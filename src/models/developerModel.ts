import { Schema,model } from "mongoose";
import developerInterface from "../interfaces/developerInterface";

const DeveloperSchema: Schema = new Schema<developerInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        about: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


export default model<developerInterface>("Developer", DeveloperSchema);
