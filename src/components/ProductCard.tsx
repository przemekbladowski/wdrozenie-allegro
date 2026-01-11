import { Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  category: string;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { requireAuth } = useAuth();
  const { user, updateUser } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user.favorites.includes(product.id));
  }, [user.favorites, product.id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    requireAuth(() => {
      const newFavorites = isFavorite
        ? user.favorites.filter(id => id !== product.id)
        : [...user.favorites, product.id];
      
      updateUser({ favorites: newFavorites });
      setIsFavorite(!isFavorite);
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-200 cursor-pointer group h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-2 left-2 px-3 py-1.5 bg-orange-600 text-white rounded-md shadow-md text-xs">
              Wyróżnione
            </div>
          )}
          
          {/* Favorite Button */}
          <button 
            onClick={handleToggleFavorite}
            className={`absolute top-2 right-2 w-9 h-9 sm:w-8 sm:h-8 rounded-full transition-colors shadow-md flex items-center justify-center ${
              isFavorite 
                ? 'bg-orange-50 hover:bg-orange-100' 
                : 'bg-white hover:bg-orange-50'
            }`}
            aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
          >
            <Heart className={`w-5 h-5 sm:w-4 sm:h-4 transition-colors ${
              isFavorite 
                ? 'text-orange-600 fill-orange-600' 
                : 'text-gray-700'
            }`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col">
          <h3 className="mb-2 text-gray-900 line-clamp-2 min-h-[2.5em] sm:min-h-[3em] text-sm sm:text-base">
            {product.title}
          </h3>
          
          <div className="mb-2 sm:mb-3 mt-auto">
            <span className="text-orange-600 text-base sm:text-lg">{product.price.toLocaleString('pl-PL')} zł</span>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600">
            <MapPin className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{product.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}