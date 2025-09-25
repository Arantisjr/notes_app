import { Response } from 'express';
import { pool } from '../models/database';
import { AuthenticatedRequest, Note } from '../types';

export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const result = await pool.query(
            'SELECT * FROM notes WHERE user_id = $1 ORDER BY updated_at DESC',
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Get notes error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const noteId = req.params.id;

        const result = await pool.query(
            'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
            [noteId, userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get note error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const createNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const { title, content } = req.body;

        if (!title) {
            res.status(400).json({ error: 'Title is required' });
            return;
        }

        const result = await pool.query(
            'INSERT INTO notes (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, content || '']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create note error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const noteId = req.params.id;
        const { title, content } = req.body;

        if (!title) {
            res.status(400).json({ error: 'Title is required' });
            return;
        }

        const result = await pool.query(
            'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND user_id = $4 RETURNING *',
            [title, content || '', noteId, userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update note error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.userId;
        const noteId = req.params.id;

        const result = await pool.query(
            'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
            [noteId, userId]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Delete note error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};