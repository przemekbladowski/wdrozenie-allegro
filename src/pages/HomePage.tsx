import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { CategoryBar } from '../components/CategoryBar';
import { FilterSidebar } from '../components/FilterSidebar';
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';
import { useProducts } from '../hooks/useProducts';

export function HomePage() {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);

  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'Wszystkie') {
      return products;
    } else {
      return products.filter(p => p.category === selectedCategory);
    }
  }, [selectedCategory, products]);

  const filteredProducts = displayedProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(product.condition);
    const matchesLocation = location === '' || product.location.toLowerCase().includes(location.toLowerCase());
    const matchesDelivery = selectedDelivery.length === 0 || (product.delivery && product.delivery.some(d => selectedDelivery.includes(d))) || false;

    return matchesSearch && matchesPrice && matchesCondition && matchesLocation && matchesDelivery;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Ładowanie ogłoszeń...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Błąd: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onToggleFilters={() => setShowFilters(!showFilters)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 py-3 sm:py-4 md:py-6">
        <div className="flex gap-3 sm:gap-4 lg:gap-6">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedConditions={selectedConditions}
              onConditionChange={setSelectedConditions}
              location={location}
              onLocationChange={setLocation}
              selectedDelivery={selectedDelivery}
              onDeliveryChange={setSelectedDelivery}
            />
          </aside>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-full max-w-[320px] sm:max-w-[360px] bg-white overflow-y-auto">
                <div className="p-3 sm:p-4 border-b border-gray-300 flex justify-between items-center bg-white sticky top-0 z-10">
                  <span className="text-gray-900 text-sm sm:text-base">Filtry</span>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Zamknij filtry"
                  >
                    <span className="text-gray-700 text-xl">✕</span>
                  </button>
                </div>
                <FilterSidebar
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                  selectedConditions={selectedConditions}
                  onConditionChange={setSelectedConditions}
                  location={location}
                  onLocationChange={setLocation}
                  selectedDelivery={selectedDelivery}
                  onDeliveryChange={setSelectedDelivery}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-3 sm:mb-4 gap-2">
              <h2 className="text-gray-900 text-sm sm:text-base md:text-xl truncate">
                {selectedCategory === 'Wszystkie' ? 'Wybrane dla Ciebie' : selectedCategory}
              </h2>
              <span className="text-gray-600 text-xs sm:text-sm md:text-base whitespace-nowrap flex-shrink-0">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'ogłoszenie' : 'ogłoszeń'}
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white rounded-lg border-2 border-gray-200">
                <p className="text-gray-600 text-sm sm:text-base">Nie znaleziono ogłoszeń</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}