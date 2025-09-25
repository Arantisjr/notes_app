import express from 'express';
import { signup, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup', (req, res, next) => {
    signup(req, res).catch(next);
});

router.post('/login', (req, res, next) => {
    login(req, res).catch(next);
});

export default router;