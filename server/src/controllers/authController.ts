import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../models/database';
import { User } from '../types';

// Validation schema (you might want to use a library like Joi)
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Get JWT secret and expiration from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        if (!validateEmail(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ error: 'Password must be at least 6 characters' });
            return;
        }

        // Check if user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            res.status(409).json({ error: 'User already exists' });
            return;
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at',
            [email, hashedPassword]
        );

        const user: User = result.rows[0];

        // Generate JWT - FIXED with proper typing
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        // Find user
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        const user: User = result.rows[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Generate JWT - FIXED with proper typing
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] }
        );

        res.json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};