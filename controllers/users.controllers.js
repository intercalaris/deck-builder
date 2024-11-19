import { createUser, loginUser } from '../db/db.js';
import { SECRET_JWT_KEY } from '../config/auth.config.js';
import jwt from 'jsonwebtoken';

// GET - Hompage
export const getHomepage = (req, res) => {
    const { user } = req.session; //Session
    res.render('index', user);
};

// User Auth - Login
export const getLogin = (req, res) => {
    const { user } = req.session; //Session
    res.render('login', user);
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginUser({ email, password });

        // Create Token
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, SECRET_JWT_KEY, { expiresIn: '1h' });
        res
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })
            .status(200)
            .json({
                success: true,
                user: {
                    email: user.email,
                    name: user.name
                }
            });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

// User Auth - Sign up
export const getSignup = (req, res) => {
    res.render('signup');
};

export const postSignup = async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields'
        });
    };

    try {
        const user = await createUser({ name, email, password })

        // Generate Token
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, SECRET_JWT_KEY, { expiresIn: '1h' });
        res.status(201)
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })
            .json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
    } catch (error) {
        if (error.message === 'Email already registered') {
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

// User Auth - Log out
export const postLogOut = (req, res) => {
    res
        .clearCookie('access_token')
        .json({ message: 'Logout Successful' })
};