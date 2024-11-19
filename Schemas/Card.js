import mongoose from "mongoose";

// Card Schema
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
});

// Card Model
export const Card = mongoose.model("Card", cardSchema);