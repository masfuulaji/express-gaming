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
        },
        category:{
            type: [Schema.Types.ObjectId],
            ref: "Category",
        },
        developer:{
            type: Schema.Types.ObjectId,
            ref: "Developer",
        }
    },
    {
        timestamps: true,
    }
);


export default model<gameInterface>("Game", GameSchema);
