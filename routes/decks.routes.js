import express from 'express';
import { deleteDeck, getCreateDeck, getDecks, getEditDeck, postDecks, putEditDeck } from '../controllers/decks.controllers.js';

const router = express.Router();

// GET - Decks
router.get('/decks', getDecks);

// GET - Create Deck
router.get('/createDeck', getCreateDeck);

// POST - Create Deck
router.post('/decks', postDecks);

// DELETE - Delete Deck
router.delete('/decks/:id', deleteDeck);

// GET edit page
router.get('/decks/:id/edit', getEditDeck);

// PUT update deck
router.put('/decks/:id', putEditDeck);

export default router;