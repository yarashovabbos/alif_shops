"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useProductStore } from '../store/productStore';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ProductSection from '../components/ProductSection';
import Footer from '../components/Footer';

// Assuming the Product type is defined in your project
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

export default function Home() {
  // useProductStore is assumed to return an object with products and fetchProducts
  const { products, fetchProducts } = useProductStore();
  
  // selectedProduct state is either a Product or null
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // useRouter provides navigation functionality
  // const router = useRouter();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Function to view product detail
  const viewProductDetail = (id: number): void => {
    const product = products.find((product) => product.id === id) || null;
    setSelectedProduct(product);
  };

  // Function to go back to the product list
  const goBack = (): void => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4">
        <Banner />

        {selectedProduct ? (
          <div>
            <button onClick={goBack} className="flex items-center text-blue-600 mb-6">
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back
            </button>
            <div className="flex flex-col md:flex-row">
              <img src={selectedProduct?.image} alt={selectedProduct?.title} className="w-full md:w-1/2 h-auto object-cover" />
              <div className="md:ml-6 mt-4 md:mt-0">
                <h1 className="text-3xl font-bold">{selectedProduct?.title}</h1>
                <p className="text-2xl text-gray-800 my-4">${selectedProduct?.price}</p>
                <p className="text-gray-700">{selectedProduct?.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6">Product List</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <div
                  key={product.id}
                  className="p-4 border rounded shadow hover:shadow-lg cursor-pointer"
                  onClick={() => viewProductDetail(product.id)}
                >
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                  <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedProduct && (
          <>
            <ProductSection title="Chegirmalar 🔥" />
            <ProductSection title="Sizni qiziqtirishi mumkin" />
            <ProductSection title="BQ uskunalari chegirma bilan" />
            <ProductSection title="Maktab bozori" />
            <ProductSection title="Goodwell maishiy texnikasi" />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
