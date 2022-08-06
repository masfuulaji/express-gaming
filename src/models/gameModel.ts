import { Schema,model } from "mongoose";
import gameInterface from "../interfaces/gameInterface";

const GameSchema: Schema = new Schema<gameInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        release_date:{
            type: Date,
        },
        price:{
            type: Number,
        }
    },
    {
        timestamps: true,
    }
);


export default model<gameInterface>("Game", GameSchema);
