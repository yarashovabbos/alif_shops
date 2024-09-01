// components/Header.tsx
"use client";
import React, { useState } from 'react';
import Logo from '../img/logo.png';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';
import { IoPersonCircle } from 'react-icons/io5';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productList, setProductList] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const filteredProducts = products.filter((product: any) =>
          product.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=30');
      const products = await response.json();
      setProductList(products);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={Logo.src}
            alt="Alif Shop Logo"
            className="h-8"
          />
          <button
            className="ml-6 text-black bg-yellow-500 p-3 rounded-lg font-semibold flex items-center"
            onClick={fetchProducts}
          >
            <HiMenu className="text-2xl mr-2" />
            Tovarlar Katalogi
          </button>
        </div>
        <div className="flex-1 mx-6 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tovarlarni izlash"
            className="w-full border border-yellow-500 rounded-full py-2 px-4"
          />
          {searchTerm && searchResults.length > 0 && (
            <ul className="absolute bg-white border border-yellow-500 w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((product) => (
                <li key={product.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center space-x-6">
          <FaShoppingCart className="text-xl text-gray-600" />
          <FaHeart className="text-xl text-gray-600" />
          <button className="text-yellow-500 font-semibold">Kirish</button>
          <div className="text-gray-600">PYС / UZB</div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Tovarlar Katalogi</h2>
            <ul className="max-h-60 overflow-y-auto">
              {productList.map((product) => (
                <li key={product.id} className="px-4 py-2 border-b">
                  {product.title}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
