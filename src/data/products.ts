import type { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Producto de ejemplo',
    description: 'Descripción del producto',
    price: 1000,
    category: 'general',
    image: 'https://via.placeholder.com/300',
  },
];

export const categories = [...new Set(products.map((p) => p.category))];
