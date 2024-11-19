import { createCard } from '../db/db.js';

export const postCard = async (req, res) => {
    const { name, type } = req.body;

    // Validation
    if (!name || !type) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    }

    try {
        const card = await createCard({ name, type })
        res.status(201).json({
            success: true,
            card: {
                id: card._id,
                name: card.name,
                creator: card.creator
            }
        });
    } catch (error) {
        if (error.message === 'Card already registered') {
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