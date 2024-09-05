"use client";
import React, { useState, useEffect } from 'react';
import Logo from '../img/logo.png';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { HiMenu } from 'react-icons/hi';

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); // Tanlangan mahsulot holati

  // Mahsulotlarni API orqali olish
  const fetchProducts = async () => {
    setLoading(true); 
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=30');
      const products = await response.json();
      setProductList(products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product list:", error);
      setLoading(false);
    }
  };

  // Qidiruv va filtr qilish funksiyasi
  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = productList.filter((product: any) =>
        product.title.toLowerCase().startsWith(searchTerm.toLowerCase()) // startsWith bilan almashtirildi
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, productList]);

  // Komponent yuklanganda mahsulotlar ro'yxatini olish
  useEffect(() => {
    fetchProducts();
  }, []);

  // Mahsulot tanlash va modalni ochish
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
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
            onClick={() => setShowModal(true)}
          >
            <HiMenu className="text-2xl mr-2" />
            Tovarlar Katalogi
          </button>
        </div>
        <div className="flex-1 mx-6 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tovarlarni izlash"
            className="w-full border border-yellow-500 rounded-full py-2 px-4"
          />
          {/* Qidiruv natijalari */}
          {loading ? (
            <div className="absolute bg-white border border-yellow-500 w-full mt-2 rounded-lg shadow-lg p-4">
              Yuklanmoqda...
            </div>
          ) : searchTerm && filteredProducts.length > 0 && (
            <ul
              className="absolute bg-white border border-yellow-500 w-full mt-2 rounded-lg shadow-lg max-h-60 overflow-y-auto z-1000"
              style={{ position: 'relative' }} // position: relative qo'shildi
            >
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleProductClick(product)} // Mahsulot ustiga bosganda
                >
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
                <li key={product.id} className="px-4 py-2 border-b cursor-pointer" onClick={() => handleProductClick(product)}>
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

      {/* Mahsulot haqida modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <p className="mt-4 font-bold">${selectedProduct.price}</p>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-32 h-32 mt-4" />
            <button
              className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setSelectedProduct(null)}
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
