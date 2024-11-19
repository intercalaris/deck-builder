import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectionString = process.env.DB_STRING;
export const connectToDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            autoIndex: true
        })
        console.log('Connected to Mongodb Atlas');
    } catch (error) {
        console.error(error);
    }
};

// Schemas Import
import { User } from '../Schemas/User.js';
import { Deck } from '../Schemas/Deck.js';
import { Card } from '../Schemas/Card.js';

// User-DB Interactions
export async function createUser({ name, email, password }) {
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const user = await User.create({ name, email, password: hashedPassword });
        console.log(`User registered: ${user.name}`);
        return user;
    } catch (error) {
        throw error;
    }
};

export async function loginUser({ email, password }) {
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Email not found');
        };

        // Compares passwords
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        };

        console.log(`${user.name} logged successfully`);
        return user;
    } catch (error) {
        throw error;
    }
};

// Deck-DB Interactions
export async function createDeck({ name, cards, creator }) {
    try {
        // Check if deck already exists
        const existingDeck = await Deck.findOne({ name });
        if (existingDeck) {
            throw new Error('Deck already registered');
        };

        // Creates new deck
        const deck = await Deck.create({ name, cards, creator });
        console.log(`Deck registered: ${deck.name}`);
        return deck;
    } catch (error) {
        throw error;
    }
};

// Card-DB Interactions
export async function createCard({ name, type }) {
    try {
        // Check if card already exists
        const existingCard = await Card.findOne({ name });
        if (existingCard) {
            throw new Error('Card already registered');
        };

        // Creates new card
        const card = await Card.create({ name, type });
        console.log(`Card registered: ${card.name}`);
        return card;
    } catch (error) {
        throw error;
    }
};
