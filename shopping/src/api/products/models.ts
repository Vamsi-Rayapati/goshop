import { IsNotEmpty } from 'class-validator';
import { IProduct } from './types';

export class Product implements IProduct {
  productId: string;

  @IsNotEmpty()
    name: string;

  @IsNotEmpty()
    description: string;

  @IsNotEmpty()
    price: number;

  @IsNotEmpty()
    quantity: number;

  @IsNotEmpty()
    category: string;
}
