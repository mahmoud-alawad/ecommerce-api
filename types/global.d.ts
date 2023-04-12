import { Role, User, type Product } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: any;
      userId?: string;
      currentUser?: CurrentUser | undefined | any;
    }
  }
  interface Window {
    products: Product[];
  }

  enum Role {
    USER,
    ADMIN,
  }

  type UserStore = {
    id: string;
    email: string;
    password: string;
    salt: string;
    name: string | null;
    address: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
  };

  type UserLoginCredentials = {
    email: string;
    password: string;
  };

  type UserSignUpCredentials = {
    name: string | null;
    email: string;
    password: string;
    address: string | null;
    phoneNumber: string | null;
  };
}

export {};
