export interface Tool {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  image: string;
  category: string;
  available: boolean;
  rentalPeriod: {
    minDays: number;
    maxDays: number;
  };
  lenderInfo: {
    name: string;
    contact: string;
  };
}

export type UserRole = 'user' | 'admin';

export interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
  walletAddress?: string;
  role?: UserRole;
}

export interface AuthCredentials {
  email: string;
  password: string;
  role: UserRole;
}