import { Flame } from 'lucide-react';
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

export default function FlashSale() {
  const { data: allProducts = [], isLoading } = useQuery<ApiProduct[]>({
    queryKey: ['/api/products'],
  });

  // Show specific products on flash sale
  const flashSaleProducts = (allProducts as ApiProduct[])
    .filter((product: ApiProduct) => 
      product.name === 'Premium Dry Cat Food - Adult' || 
      product.name === 'Clumping Cat Litter - Premium'
    )
    .map((product: ApiProduct) => ({
      id: parseInt(product.id) || Math.random(),
      name: product.name,
      image: product.image,
      price: Math.floor(product.price * 0.7), // 30% discount
      originalPrice: product.price,
      discount: 30,
      badge: '30% OFF',
      badgeColor: 'red',
      rating: product.rating,
      reviews: Math.floor(Math.random() * 100) + 20,
      stockStatus: product.stock > 0 ? 'In Stock' : 'Out of Stock'
    }));

  if (isLoading) {
    return (
      <section className="section-spacing bg-gradient-to-br from-red-50 to-orange-50">
        <div className="responsive-container">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-2 animate-fade-in">⚡ Flash Sale</h2>
            <p className="text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>Limited time offers - grab them before they're gone!</p>
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
    <section className="section-spacing bg-red-50">
      <div className="responsive-container">
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-red-100 px-4 sm:px-6 py-3 rounded-lg mb-6 w-fit mx-auto border-2 border-red-200 animate-scale-up">
            <Flame className="text-red-600" size={24} />
            <span className="text-red-600 font-bold text-lg">Flash Sale</span>
            <span className="text-sm text-red-600 font-medium">Limited Time Offers</span>
          </div>
        </div>

        <div className="responsive-grid">
          {flashSaleProducts.map((product, index) => (
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