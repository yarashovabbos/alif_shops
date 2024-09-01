import Image from 'next/image';
import { FiHeart } from 'react-icons/fi';

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function ProductCard({ product }: ProductCardProps): JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          layout="fill"
          objectFit="cover"
        />
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <FiHeart className="text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
        <p className="text-orange-500 font-bold">{product.price} so'm</p>
        <button className="mt-2 w-full bg-orange-500 text-white py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors">
          Savatga
        </button>
      </div>
    </div>
  );
}
