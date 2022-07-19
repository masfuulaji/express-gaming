import { Schema,model } from "mongoose";
import categoryInterface from "../interfaces/categoryInterface";

const CategorySchema: Schema = new Schema<categoryInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);


export default model<categoryInterface>("Category", CategorySchema);
