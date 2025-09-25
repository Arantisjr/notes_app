import { Request } from 'express';

export interface User {
    id: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface Note {
    id: string;
    user_id: string;
    title: string;
    content: string;
    created_at: Date;
    updated_at: Date;
}

export interface JwtPayload {
    userId: string;
    email: string;
}

// Request with user property for authenticated routes
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}