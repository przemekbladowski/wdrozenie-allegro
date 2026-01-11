import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { useUser } from '../contexts/UserContext';
import { mockProducts } from '../data/products';
import { Heart } from 'lucide-react';

export function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useUser();

  const favoriteProducts = mockProducts.filter(product => 
    user.favorites.includes(product.id)
  );

  const filteredProducts = favoriteProducts.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-600" />
            <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl">Obserwowane</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            {favoriteProducts.length === 0 
              ? 'Nie masz jeszcze żadnych obserwowanych produktów'
              : `${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'produkt' : favoriteProducts.length < 5 ? 'produkty' : 'produktów'}`
            }
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="mb-4 sm:mb-6">
              <Heart className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-gray-900 mb-2 text-lg sm:text-xl md:text-2xl">
              {searchQuery 
                ? 'Nie znaleziono produktów' 
                : 'Brak obserwowanych produktów'
              }
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {searchQuery 
                ? 'Spróbuj zmienić wyszukiwane słowa' 
                : 'Kliknij ikonę serca na produktach, które chcesz obserwować'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                featured={product.featured}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
