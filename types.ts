
export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
  TRAINER = 'trainer',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  specs: Record<string, string>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  imageUrl: string;
  tags: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: string;
  imageUrl: string;
  modules: { title: string; content: string }[];
}
