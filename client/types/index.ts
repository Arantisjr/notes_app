export interface User {
    id: number;
    email: string;
}

export interface Note {
    id: number;
    user_id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signOut: () => void;
}