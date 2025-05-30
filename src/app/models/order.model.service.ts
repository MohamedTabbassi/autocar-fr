

import {Product} from './product.model.service';
import { User } from './user-model.service';

export interface Order {
  _id: string;
  userId: string | User;
  products: { productId: string | Product; quantity: number }[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}