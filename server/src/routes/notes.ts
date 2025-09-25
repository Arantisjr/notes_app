import express from 'express';
import { getNotes, getNote, createNote, updateNote, deleteNote } from '../controllers/noteController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication - FIXED: Use router.use() instead of router.use(authenticateToken)
router.use(authenticateToken as express.RequestHandler);

// FIXED: Add proper typing for the routes
router.get('/', (req, res, next) => {
    getNotes(req as any, res).catch(next);
});

router.get('/:id', (req, res, next) => {
    getNote(req as any, res).catch(next);
});

router.post('/', (req, res, next) => {
    createNote(req as any, res).catch(next);
});

router.put('/:id', (req, res, next) => {
    updateNote(req as any, res).catch(next);
});

router.delete('/:id', (req, res, next) => {
    deleteNote(req as any, res).catch(next);
});

export default router;