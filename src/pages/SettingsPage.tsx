import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Type, Contrast, Bell, Lock, Moon, Check, LogIn } from 'lucide-react';

export function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { fontSize, contrast, setFontSize, setContrast } = useSettings();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <div className="flex-1 max-w-md mx-auto px-4 py-12 flex items-center justify-center">
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sm:p-8 text-center w-full">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Zaloguj się</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Musisz być zalogowany, aby uzyskać dostęp do ustawień
            </p>
            <button
              onClick={() => navigate('/account')}
              className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md"
            >
              Przejdź do logowania
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const fontSizes = [
    { value: 'small', label: 'Mała', size: '14px' },
    { value: 'medium', label: 'Średnia', size: '16px' },
    { value: 'large', label: 'Duża', size: '18px' }
  ] as const;

  const contrastOptions = [
    { value: 'normal', label: 'Normalny', description: 'Standardowa paleta kolorów' },
    { value: 'high', label: 'Wysoki kontrast', description: 'Zwiększona czytelność' }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex-1 max-w-4xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6">
        <Link 
          to="/account"
          className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-orange-600 hover:text-orange-700 transition-colors text-sm sm:text-base"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Powrót do konta
        </Link>

        <h1 className="mb-4 sm:mb-6 text-gray-900">Ustawienia</h1>

        <div className="space-y-4 sm:space-y-6">
          {/* Font Size Settings */}
          <section className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                <Type className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-gray-900 text-sm sm:text-base">Rozmiar czcionki</h2>
                <p className="text-xs sm:text-sm text-gray-600 truncate">Dostosuj rozmiar tekstu do swoich potrzeb</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {fontSizes.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFontSize(option.value)}
                  className={`relative p-3 sm:p-4 border-2 rounded-lg transition-all ${
                    fontSize === option.value
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {fontSize === option.value && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    </div>
                  )}
                  <div className="text-center">
                    <div 
                      className="mb-2 text-gray-900" 
                      style={{ fontSize: option.size }}
                    >
                      Aa
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.size}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 sm:p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-900" style={{ fontSize: fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px' }}>
                Przykładowy tekst w wybranym rozmiarze czcionki. To zdanie pomoże Ci ocenić, czy wybrany rozmiar jest dla Ciebie wygodny.
              </p>
            </div>
          </section>

          {/* Contrast Settings */}
          <section className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <Contrast className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-gray-900 text-sm sm:text-base">Kontrast</h2>
                <p className="text-xs sm:text-sm text-gray-600">Wybierz poziom kontrastu interfejsu</p>
              </div>
            </div>

            <div className="space-y-3">
              {contrastOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setContrast(option.value)}
                  className={`w-full p-3 sm:p-4 border-2 rounded-lg transition-all text-left ${
                    contrast === option.value
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-900 text-sm sm:text-base truncate">{option.label}</span>
                        {contrast === option.value && (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600">{option.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Notifications Settings */}
          <section className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-gray-900 text-sm sm:text-base">Powiadomienia</h2>
                <p className="text-xs sm:text-sm text-gray-600">Zarządzaj powiadomieniami</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <label className="flex items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-1 text-sm sm:text-base">Powiadomienia email</div>
                  <p className="text-xs sm:text-sm text-gray-600">Otrzymuj wiadomości o nowych ofertach</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-600 border-gray-400 rounded focus:ring-orange-500 flex-shrink-0 mt-1 sm:mt-0"
                  defaultChecked
                />
              </label>

              <label className="flex items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-1 text-sm sm:text-base">Powiadomienia push</div>
                  <p className="text-xs sm:text-sm text-gray-600">Powiadomienia w przeglądarce</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-600 border-gray-400 rounded focus:ring-orange-500 flex-shrink-0 mt-1 sm:mt-0"
                />
              </label>

              <label className="flex items-start sm:items-center justify-between gap-3 p-3 sm:p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-1 text-sm sm:text-base">Wiadomości od sprzedających</div>
                  <p className="text-xs sm:text-sm text-gray-600">Odpowiedzi na Twoje zapytania</p>
                </div>
                <input
                  type="checkbox"
                  className="w-5 h-5 text-orange-600 border-gray-400 rounded focus:ring-orange-500 flex-shrink-0 mt-1 sm:mt-0"
                  defaultChecked
                />
              </label>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div className="min-w-0">
                <h2 className="text-gray-900 text-sm sm:text-base">Prywatność i bezpieczeństwo</h2>
                <p className="text-xs sm:text-sm text-gray-600">Kontroluj swoją prywatność</p>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                <div className="text-gray-900 mb-1 text-sm sm:text-base">Zmień hasło</div>
                <p className="text-xs sm:text-sm text-gray-600">Zaktualizuj swoje hasło logowania</p>
              </button>

              <button className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                <div className="text-gray-900 mb-1 text-sm sm:text-base">Uwierzytelnianie dwuskładnikowe</div>
                <p className="text-xs sm:text-sm text-gray-600">Dodatkowe zabezpieczenie konta</p>
              </button>

              <button className="w-full p-3 sm:p-4 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-left">
                <div className="text-gray-900 mb-1 text-sm sm:text-base">Aktywne sesje</div>
                <p className="text-xs sm:text-sm text-gray-600">Zarządzaj zalogowanymi urządzeniami</p>
              </button>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="bg-white rounded-lg border-2 border-red-200 p-4 sm:p-6">
            <h3 className="text-red-900 mb-4 text-sm sm:text-base">Strefa niebezpieczna</h3>
            <div className="space-y-3">
              <button className="w-full p-3 sm:p-4 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left">
                <div className="mb-1 text-sm sm:text-base">Wyczyść historię przeglądania</div>
                <p className="text-xs sm:text-sm text-red-500">Usuń wszystkie ostatnio przeglądane produkty</p>
              </button>

              <button className="w-full p-3 sm:p-4 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-left">
                <div className="mb-1 text-sm sm:text-base">Usuń konto</div>
                <p className="text-xs sm:text-sm text-red-500">Trwale usuń swoje konto i wszystkie dane</p>
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}