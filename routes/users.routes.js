import express from 'express';
import { getHomepage, getLogin, getSignup, postLogin, postLogOut, postSignup } from '../controllers/users.controllers.js';

const router = express.Router();

// GET - Hompage
router.get('/', getHomepage);

// User Auth - Login
router.get('/login', getLogin);
router.post('/login', postLogin);

// User Auth - Sign up
router.get('/signup', getSignup);
router.post('/signup', postSignup);

// User Auth - Log out
router.post('/logout', postLogOut);

export default router;