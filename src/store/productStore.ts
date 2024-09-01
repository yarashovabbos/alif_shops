import create from 'zustand';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductStore {
  products: Product[];
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
      set({ products: response.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
}));
