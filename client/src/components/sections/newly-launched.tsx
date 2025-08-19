import { Sparkles } from 'lucide-react';
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

export default function NewlyLaunched() {
  const { data: allProducts = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ['/api/products'],
  });

  // Get the newest products (last 4 added)
  const products = (allProducts as ApiProduct[])
    .slice(-4)
    .map((product: ApiProduct) => ({
      id: parseInt(product.id) || Math.random(),
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
      reviews: Math.floor(Math.random() * 20), // Low reviews for new products
      badge: 'JUST IN',
      badgeColor: 'blue',
      stockStatus: product.stock > 0 ? 'In Stock' : 'Out of Stock',
      isNew: true
    }));

  if (isLoading) {
    return (
      <section className="section-spacing bg-white">
        <div className="responsive-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2 flex items-center justify-center gap-2 animate-fade-in">
              <Sparkles className="text-blue-600" size={28} />
              Newly Launched
            </h2>
            <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>Fresh arrivals for your furry friends</p>
          </div>
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
    <section className="py-12 bg-[#f0f8ff]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#26732d] mb-8 flex items-center justify-center gap-3">
          <Sparkles size={32} className="text-[#26732d]" />
          Newly Launched
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="transform hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out relative">
              <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1 z-10">
                <Sparkles size={12} />
                JUST IN
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
