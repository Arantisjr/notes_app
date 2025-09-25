import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './models/database';
import authRoutes from './routes/auth';
import notesRoutes from './routes/notes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Initialize database and start server
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    });