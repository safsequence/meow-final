import { Cat } from 'lucide-react';
import ProductCard from '@/components/ui/product-card';
import { useQuery } from '@tanstack/react-query';

interface ApiProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
}

export default function BestsellersCats() {
  const { data: allProducts = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ['/api/products'],
  });

  // Filter products for cat-related categories and get top-rated ones
  const products = (allProducts as ApiProduct[])
    .filter((product: ApiProduct) => 
      product.category === 'cat-food' || 
      product.category === 'cat-toys' ||
      product.category === 'cat-litter'
    )
    .sort((a: ApiProduct, b: ApiProduct) => b.rating - a.rating)
    .slice(0, 4)
    .map((product: ApiProduct) => ({
      id: parseInt(product.id) || Math.random(),
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
      reviews: Math.floor(Math.random() * 200) + 50,
      badge: product.rating >= 4.8 ? 'BESTSELLER' : undefined,
      badgeColor: product.rating >= 4.8 ? 'yellow' : undefined,
      stockStatus: product.stock > 0 ? 'In Stock' : 'Out of Stock'
    }));

  if (isLoading) {
    return (
      <section className="section-spacing bg-gray-50">
        <div className="responsive-container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#26732d] mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
            <Cat size={32} className="text-[#26732d]" />
            Bestsellers for Cats
          </h2>
          <div className="responsive-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-spacing bg-gray-50">
      <div className="responsive-container">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#26732d] mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in">
          <Cat size={32} className="text-[#26732d]" />
          Bestsellers for Cats
        </h2>
        <div className="responsive-grid">
          {products.map((product: any, index: number) => (
            <div 
              key={product.id} 
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}