export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  SERVICE_USER = 'SERVICE_USER'
}

export interface User {
  _id: string; // Matches backend
  name: string; // Single name field
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  createdAt?: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}