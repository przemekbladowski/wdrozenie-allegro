import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { User, Heart, ShoppingBag, Settings, Package, Star, MapPin, Mail, Phone, Edit, LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { mockProducts } from '../data/products';
import { useUser } from '../contexts/UserContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { EditProfileModal } from '../components/EditProfileModal';

export function AccountPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'listings' | 'favorites' | 'orders'>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, resetUser } = useUser();
  const { isAuthenticated, login, logout } = useAuth();
  const { clearCart } = useCart();

  // Mock user stats - wyzerowane
  const userStats = {
    rating: 0,
    reviews: 0,
    memberSince: '2024'
  };

  // Dynamic data from user context
  const myListings = user.listings || [];
  const favorites = mockProducts.filter(p => user.favorites.includes(p.id));

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'listings', label: 'Moje ogłoszenia', icon: Package },
    { id: 'favorites', label: 'Obserwowane', icon: Heart },
    { id: 'orders', label: 'Zamówienia', icon: ShoppingBag }
  ] as const;

  const handleLogout = () => {
    logout(resetUser, clearCart);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Podaj adres email');
      return;
    }

    if (!email.includes('@')) {
      setError('Podaj prawidłowy adres email');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków');
      return;
    }

    const success = login(email, password);
    if (!success) {
      setError('Nieprawidłowe dane logowania');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="flex-1 max-w-md mx-auto px-4 py-12 flex items-center justify-center">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 w-full">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-gray-900 mb-2 text-center">Zaloguj się</h2>
            <p className="text-gray-600 mb-6 text-sm text-center">
              Wpisz swoje dane aby uzyskać dostęp do konta
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Adres email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="twoj@email.com"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Hasło</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 znaków"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
              >
                Zaloguj się
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                To jest demo. Użyj dowolnego emaila i hasła (min. 6 znaków)
              </p>
            </form>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />

      <div className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="mb-4 sm:mb-6 text-gray-900 px-2 sm:px-0">Moje konto</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
              {/* User Info */}
              <div className="text-center mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-gray-200">
                <ImageWithFallback
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                />
                <h3 className="text-gray-900 mb-1 text-sm sm:text-base truncate px-2">{user.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span className="text-gray-700">{userStats.rating}</span>
                  <span className="text-gray-500">({userStats.reviews})</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Członek od {userStats.memberSince}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${activeTab === tab.id
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
                <Link
                  to="/settings"
                  className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm sm:text-base"
                >
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Ustawienia</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base border-2 border-red-200"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Wyloguj się</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6 gap-2">
                  <h2 className="text-gray-900">Dane osobowe</h2>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg border-2 border-orange-600 transition-colors text-sm sm:text-base"
                  >
                    <Edit className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Edytuj</span>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Imię i nazwisko</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 text-sm sm:text-base truncate">{user.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Lokalizacja</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 text-sm sm:text-base truncate">{user.location}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Email</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 text-sm sm:text-base truncate">{user.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm text-gray-600 mb-2">Telefon</label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-300">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-900 text-sm sm:text-base truncate">{user.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-gray-200">
                    <h3 className="mb-4 text-gray-900">Statystyki</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-orange-600 mb-1 text-base sm:text-lg">{myListings.length}</div>
                        <p className="text-xs sm:text-sm text-gray-700">Ogłoszenia</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-orange-600 mb-1 text-base sm:text-lg">0</div>
                        <p className="text-xs sm:text-sm text-gray-700">Sprzedane</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-orange-600 mb-1 text-base sm:text-lg">{favorites.length}</div>
                        <p className="text-xs sm:text-sm text-gray-700">Obserwowane</p>
                      </div>
                      <div className="p-3 sm:p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                        <div className="text-orange-600 mb-1 text-base sm:text-lg">0</div>
                        <p className="text-xs sm:text-sm text-gray-700">Opinie</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-gray-900">Moje ogłoszenia</h2>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Dodaj nowe
                  </button>
                </div>

                <div className="space-y-4">
                  {myListings.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-all"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 mb-1 truncate">{product.title}</h3>
                        <p className="text-orange-600 mb-2">
                          {product.price.toLocaleString('pl-PL')} zł
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{product.location}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-3 py-1.5 text-sm border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                          Edytuj
                        </button>
                        <button className="px-3 py-1.5 text-sm border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          Usuń
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                <h2 className="mb-6 text-gray-900">Obserwowane ogłoszenia</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favorites.map(product => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      className="flex gap-4 p-4 hover:bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-orange-300 transition-all"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 mb-1 line-clamp-2">{product.title}</h4>
                        <p className="text-orange-600 mb-1">
                          {product.price.toLocaleString('pl-PL')} zł
                        </p>
                        <p className="text-sm text-gray-600">{product.location}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                <h2 className="mb-6 text-gray-900">Moje zamówienia</h2>
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Nie masz jeszcze żadnych zamówień</p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Przeglądaj oferty
                  </Link>
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