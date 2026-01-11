import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MessageModal } from '../components/MessageModal';
import { ShareModal } from '../components/ShareModal';
import { Heart, MapPin, Share2, Star, ChevronLeft, ChevronRight, MessageCircle, Shield } from 'lucide-react';
import { mockProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductPage() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === Number(id));
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();
  const { user, updateUser } = useUser();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (product) {
      setIsFavorite(user.favorites.includes(product.id));
    }
  }, [user.favorites, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="mb-4 text-gray-900">Produkt nie znaleziony</h2>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Powrót do strony głównej
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
    });
  };

  const handleSendMessage = () => {
    requireAuth(() => {
      setIsMessageModalOpen(true);
    });
  };

  const handleToggleFavorite = () => {
    requireAuth(() => {
      const newFavorites = isFavorite
        ? user.favorites.filter(favId => favId !== product.id)
        : [...user.favorites, product.id];
      updateUser({ ...user, favorites: newFavorites });
      setIsFavorite(!isFavorite);
    });
  };

  const averageRating = product.reviews
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        productTitle={product.title}
        sellerName={product.seller.name}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productTitle={product.title}
        productUrl={window.location.href}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 pb-32 lg:pb-6">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 text-xs sm:text-sm overflow-x-auto whitespace-nowrap pb-2">
          <Link to="/" className="text-orange-600 hover:text-orange-700">Strona główna</Link>
          <span className="mx-2 text-gray-500">&gt;</span>
          <Link to={`/?category=${product.category}`} className="text-orange-600 hover:text-orange-700">
            {product.category}
          </Link>
          <span className="mx-2 text-gray-500">&gt;</span>
          <span className="text-gray-700">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Image Gallery */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-white rounded-lg border-2 border-gray-200 overflow-hidden">
              {/* Main Image */}
              <div className="relative aspect-[4/3] bg-gray-100">
                <ImageWithFallback
                  src={product.images[currentImageIndex]}
                  alt={`${product.title} - zdjęcie ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                      aria-label="Poprzednie zdjęcie"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                      aria-label="Następne zdjęcie"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/70 text-white rounded-full text-xs sm:text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="p-3 sm:p-4 flex gap-2 overflow-x-auto bg-gray-50 scrollbar-hide">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === index
                          ? 'border-orange-600 ring-2 ring-orange-200'
                          : 'border-gray-300 hover:border-gray-400'
                        }`}
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-2">
            {/* Price & Actions */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <div className="text-orange-600 mb-2 text-xl sm:text-2xl">
                  {product.price.toLocaleString('pl-PL')} zł
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{product.location}</span>
                </div>
                <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs sm:text-sm">
                  {product.condition}
                </div>
              </div>

              <div className="space-y-3 mb-4 sm:mb-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md text-sm sm:text-base"
                >
                  Dodaj do koszyka
                </button>
                <button
                  onClick={handleSendMessage}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <MessageCircle className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
                  Wyślij wiadomość
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${isFavorite
                        ? 'border-orange-600 bg-orange-50 text-orange-600'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Heart className={`w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0 ${isFavorite ? 'fill-orange-600' : ''}`} />
                    <span className="hidden sm:inline">Obserwuj</span>
                  </button>
                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Share2 className="w-5 h-5 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="hidden sm:inline">Udostępnij</span>
                  </button>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="p-3 sm:p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Shield className="w-5 h-5 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <h4 className="text-blue-900 text-sm sm:text-base">Bezpieczna transakcja</h4>
                </div>
                <ul className="text-xs sm:text-sm text-blue-800 space-y-1 ml-6 sm:ml-7">
                  <li>• Spotkaj się w miejscu publicznym</li>
                  <li>• Sprawdź produkt przed zakupem</li>
                  <li>• Unikaj przedpłat</li>
                </ul>
              </div>
            </div>

            {/* Seller Info */}
            <div className="mt-4 sm:mt-6 bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
              <h3 className="mb-4 text-gray-900">Sprzedający</h3>
              <div className="flex items-start gap-3 sm:gap-4">
                <ImageWithFallback
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 mb-1 text-sm sm:text-base truncate">{product.seller.name}</h4>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700">{product.seller.rating}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      ({product.seller.reviews} opinii)
                    </span>
                  </div>
                  <button className="text-xs sm:text-sm text-orange-600 hover:text-orange-700">
                    Zobacz profil
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Reviews - Full Width on Mobile, Below Everything */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            {/* Description */}
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
              <h3 className="mb-4 text-gray-900">Opis</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {product.description}
              </p>

              {/* Specs */}
              {product.specs && product.specs.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 text-gray-900">Specyfikacja</h4>
                  <div className="space-y-2">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex flex-col sm:flex-row py-2 border-b border-gray-200 last:border-0 gap-1 sm:gap-0">
                        <span className="sm:w-1/3 text-gray-600 text-sm">{spec.label}</span>
                        <span className="sm:w-2/3 text-gray-900 text-sm">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-4 sm:mt-6 bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-gray-900">Opinie</h3>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-gray-900">{averageRating}</span>
                    <span className="text-gray-600 text-sm">({product.reviews.length} opinii)</span>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => requireAuth(() => alert('Funkcja dodawania opinii (demo)'))}
                    className="px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm font-medium"
                  >
                    Dodaj opinię
                  </button>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="pb-4 sm:pb-6 border-b border-gray-200 last:border-0">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <ImageWithFallback
                          src={review.avatar}
                          alt={review.author}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 mb-2">
                            <h4 className="text-gray-900 text-sm sm:text-base">{review.author}</h4>
                            <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                  }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed break-words">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}