import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDB } from './db/db.js';
import cookieParser from 'cookie-parser';

// Import Middleware
import { authMiddleware } from './middleware/auth.middleware.js';

// Import Routes
import users from './routes/users.routes.js';
import decks from './routes/decks.routes.js';
import cards from './routes/cards.routes.js';

const PORT = process.env.PORT || 8000;

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB();


// Initialize Express
const app = express();

// Cofigure view engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authMiddleware)

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', users);
app.use('/', decks);
app.use('/', cards);

// Listen Server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});