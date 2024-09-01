"use client";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import "../css/banner.css";

// Define types for the product and state
interface Product {
  image: string;
  title: string;
  price: number;
  category: string;
}

export default function Banner(): JSX.Element {
  const [images, setImages] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch product categories from the API
    axios
      .get<string[]>("https://fakestoreapi.com/products/categories")
      .then((response) => {
        setCategories(["all", ...response.data]); // Add 'all' as the default category
      })
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch product data from the API
    axios
      .get<Product[]>("https://fakestoreapi.com/products")
      .then((response) => {
        const imageUrls: Product[] = response.data.map((product) => ({
          image: product.image,
          title: product.title,
          price: product.price,
          category: product.category,
        }));
        setImages(imageUrls);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredImages: Product[] =
    selectedCategory === "all"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  return (
    <div className="banner-carousel my-8">
      {/* Catalog Buttons */}
      <div className="catalog-buttons flex justify-center mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`mx-2 px-4 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        dynamicHeight={false}
        emulateTouch
        swipeable
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="carousel-arrow carousel-arrow-prev"
            >
              &#9664;
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="carousel-arrow carousel-arrow-next"
            >
              &#9654;
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index) => (
          <button
            type="button"
            onClick={onClickHandler}
            className={`carousel-indicator ${isSelected ? "active" : ""}`}
          />
        )}
      >
        {filteredImages.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="relative"
            style={{ height: "500px", overflow: "hidden" }}
          >
            <img
              src={item.image}
              alt={`Banner ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                padding: "10px",
                borderRadius: "10px",
                width: "80%", // Adjust width as needed
              }}
            >
              <h2 className="text-3xl font-bold mb-2">Jozibali taklif</h2>
              <h1 className="text-5xl font-bold mb-2">QAYNOQ CHEGIRMALAR</h1>
              <p className="text-xl">{item.title}</p>
              <p className="text-xl">{item.price} so'm</p>
              <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors">
                Sotib olish
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
