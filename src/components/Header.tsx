import { Search, Heart, User, PlusCircle, Menu, ShoppingCart, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { useState, useRef, useEffect } from 'react';
import { Smartphone, Laptop, Home, Car, Dumbbell, Baby, BookOpen, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleFilters?: () => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const categories = [
  { name: 'Wszystkie', icon: null },
  { name: 'Elektronika', icon: Laptop },
  { name: 'Dom', icon: Home },
  { name: 'Sport', icon: Dumbbell },
  { name: 'Motoryzacja', icon: Car },
  { name: 'Dzieci', icon: Baby },
  { name: 'Książki', icon: BookOpen },
];

export function Header({ searchQuery, onSearchChange, onToggleFilters, selectedCategory = 'Wszystkie', onSelectCategory }: HeaderProps) {
  const { totalItems } = useCart();
  const { user } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when expanded
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleCategorySelect = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    setIsDropdownOpen(false);
  };

  const selectedCategoryData = categories.find(cat => cat.name === selectedCategory);
  const SelectedIcon = selectedCategoryData?.icon;

  return (
    <header className="bg-white border-b-3 border-gray-300 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Mobile Layout: Two Rows in one container */}
        <div className="md:hidden">
          {/* First Row: Logo + Icons */}
          <div className="flex items-center justify-between gap-2 py-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="text-orange-600 text-sm whitespace-nowrap min-[380px]:inline hidden">Marketplace</span>
            </Link>

            {/* Icons */}
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Link
                to="/account"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Moje konto"
              >
                <User className="w-5 h-5 text-gray-700" />
              </Link>

              <Link
                to="/favorites"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Obserwowane"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                {user.favorites.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-600 text-white rounded-full flex items-center justify-center text-[9px]">
                    {user.favorites.length}
                  </span>
                )}
              </Link>

              <Link
                to="/checkout"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Koszyk"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-orange-600 text-white rounded-full flex items-center justify-center text-[9px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Second Row: Search Bar + Category Selector */}
          <div className="flex gap-1.5 pb-2 relative">
            {/* Category Dropdown */}
            <div className="flex-1 min-w-0" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-10 flex items-center justify-center gap-1 px-2 bg-gray-100 border-2 border-gray-200 rounded-lg text-gray-800 hover:bg-gray-200 transition-all text-sm"
              >
                {SelectedIcon && <SelectedIcon className="w-4 h-4 flex-shrink-0" />}
                <span className="truncate text-sm">{selectedCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute left-2 mt-1 w-56 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.name;
                    
                    return (
                      <button
                        key={category.name}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors text-left text-sm border-b border-gray-100 last:border-b-0 ${
                          isSelected
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {Icon && <Icon className={`w-5 h-5 flex-shrink-0 ${isSelected ? 'text-orange-600' : 'text-gray-600'}`} />}
                        <span className={isSelected ? 'font-medium' : ''}>{category.name}</span>
                        {isSelected && (
                          <span className="ml-auto text-orange-600 text-lg">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 min-w-0 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onClick={() => setIsSearchExpanded(true)}
                placeholder="Szukaj..."
                className="w-full h-10 px-3 pl-9 pr-14 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-orange-600 text-white rounded text-xs hover:bg-orange-700 transition-colors whitespace-nowrap">
                Szukaj
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Search Overlay - Mobile Only */}
        {isSearchExpanded && (
          <div className="md:hidden fixed inset-0 bg-black/50 z-[100]" onClick={() => setIsSearchExpanded(false)}>
            <div className="bg-white p-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative mb-3">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Szukaj..."
                  className="w-full px-4 py-3 pl-11 pr-11 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-base"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setIsSearchExpanded(false);
                    }
                  }}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <button
                  onClick={() => setIsSearchExpanded(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Zamknij"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                <span>Szukaj</span>
              </button>
            </div>
          </div>
        )}

        {/* Desktop Layout: Single Row */}
        <div className="hidden md:flex items-center gap-2 md:gap-4 py-2.5 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-orange-600 text-base md:text-lg whitespace-nowrap">Marketplace</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl min-w-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Szukaj..."
                className="w-full px-3 md:px-4 py-2 md:py-2.5 pl-9 md:pl-10 pr-16 md:pr-20 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm md:text-base"
              />
              <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 pointer-events-none" />
              <button className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 px-2 md:px-3 py-1 md:py-1.5 bg-orange-600 text-white rounded text-xs md:text-sm hover:bg-orange-700 transition-colors whitespace-nowrap">
                Szukaj
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            <Link
              to="/account"
              className="p-2 md:p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Moje konto"
            >
              <User className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
            </Link>

            <Link
              to="/favorites"
              className="p-2 md:p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Obserwowane"
            >
              <Heart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
              {user.favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs">
                  {user.favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/checkout"
              className="p-2 md:p-2.5 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Koszyk"
            >
              <ShoppingCart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}