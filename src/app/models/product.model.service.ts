

export interface Product {
  _id: string;
  name: string;
  reference: string;
  description: string;
  category: string;
  price: number;
  inStock: boolean;
  imageUrl?: string;
  compatibility: string;
  manufacturer: string;
  createdAt: string;
  updatedAt: string;
}