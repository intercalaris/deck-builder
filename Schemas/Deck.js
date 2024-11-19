import mongoose from "mongoose";

// Deck Schema
const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cards: {
        type: Array,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Deck Model
export const Deck = mongoose.model("Deck", deckSchema);