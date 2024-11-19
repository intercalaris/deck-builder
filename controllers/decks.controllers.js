import { Deck } from '../Schemas/Deck.js'; // TODO: Remove this
import { createDeck} from '../db/db.js';

// GET - Decks
export const getDecks = async (req, res) => {
    const { user } = req.session //Session
    if (!user) return res.status(403).send('Access not authorized')
    
    try {
        const userDecks = await Deck.find({ creator: user.id });
        res.render('decks', { decks: userDecks });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching decks',
            error: error.message
        });
    }
};

// GET - Create Deck
export const getCreateDeck = (req, res) => {
    const { user } = req.session; //Session
    if (!user) return res.status(403).send('Access not authorized');

    res.render('createDeck');
};

// POST - Create Deck
export const postDecks = async (req, res) => {
    const { user } = req.session; //Session
    if (!user) return res.status(403).send('Access not authorized');

    const { name, cards } = req.body;

    // Validation
    if (!name || !cards) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    };

    try {
        const deck = await createDeck({ name, cards, creator: user.id });
        res.status(201).json({
            success: true,
            user: {
                id: deck._id,
                name: deck.name,
                cards: deck.cards,
                creator: deck.creator
            }
        });
    } catch (error) {
        if (error.message === 'Deck already registered') {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        };

        res.status(400).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    };
};

// DELETE - Delete Deck
export const deleteDeck = async (req, res) => {
    const { user } = req.session; // Session
    if (!user) return res.status(403).send('Access not authorized');

    try {
        await Deck.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting deck'
        });
    };
};

// GET edit page
export const getEditDeck = async (req, res) => {
    const { user } = req.session;
    if (!user) return res.status(403).send('Access not authorized');

    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) {
            return res.status(404).send('Deck not found');
        }
        res.render('editDeck', { deck });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// PUT update deck
export const putEditDeck = async (req, res) => {
    const { user } = req.session;
    if (!user) return res.status(403).send('Access not authorized');

    const { name, cards } = req.body;

    try {
        const updatedDeck = await Deck.findByIdAndUpdate(
            req.params.id,
            { name, cards },
            { new: true }
        );
        
        if (!updatedDeck) {
            return res.status(404).json({
                success: false,
                message: 'Deck not found'
            });
        }

        res.status(200).json({
            success: true,
            deck: updatedDeck
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating deck',
            error: error.message
        });
    }
};