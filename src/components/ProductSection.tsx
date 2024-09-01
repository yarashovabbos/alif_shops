import { useProductStore } from '../store/productStore';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductSectionProps {
  title: string;
}

export default function ProductSection({ title }: ProductSectionProps): JSX.Element {
  const { products } = useProductStore(); // Make sure useProductStore is typed correctly in your store file

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.slice(0, 6).map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
