import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, CreditCard, Truck, Shield, CheckCircle, LogIn } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CheckoutPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'blik' | 'transfer'>('card');

  const deliveryCost = 15;
  const finalTotal = totalPrice + (items.length > 0 ? deliveryCost : 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/account');
      return;
    }
    setStep('payment');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <div className="flex-1 max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-12 flex items-center">
          <div className="bg-white rounded-lg border-2 border-green-200 p-6 sm:p-8 text-center w-full">
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 mx-auto mb-4" />
            <h1 className="mb-4 text-green-900">Zamówienie złożone!</h1>
            <p className="text-gray-700 mb-6 text-sm sm:text-base">
              Dziękujemy za zakupy. Potwierdzenie zamówienia zostało wysłane na Twój adres email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link 
                to="/account"
                className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm sm:text-base"
              >
                Moje zamówienia
              </Link>
              <Link 
                to="/"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Kontynuuj zakupy
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        
        <div className="flex-1 max-w-4xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6">
          <button 
            onClick={() => setStep('cart')}
            className="mb-4 sm:mb-6 text-orange-600 hover:text-orange-700 text-sm sm:text-base"
          >
            ← Powrót do koszyka
          </button>

          <h1 className="mb-4 sm:mb-6 text-gray-900">Płatność</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handlePayment} className="space-y-4 sm:space-y-6">
                {/* Delivery Address */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                  <h2 className="mb-4 text-gray-900">Adres dostawy</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700 mb-2">Imię i nazwisko</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-700 mb-2">Ulica i numer</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          placeholder="ul. Przykładowa 123"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-700 mb-2">Kod pocztowy</label>
                        <input
                          type="text"
                          required
                          pattern="[0-9]{2}-[0-9]{3}"
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          placeholder="00-000"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-700 mb-2">Miasto</label>
                        <input
                          type="text"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          placeholder="Warszawa"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          required
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          placeholder="+48 123 456 789"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6">
                  <h2 className="mb-4 text-gray-900">Metoda płatności</h2>
                  <div className="space-y-3">
                    <label className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-orange-600 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4 text-orange-600"
                      />
                      <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0" />
                      <span className="text-gray-900 text-sm sm:text-base">Karta płatnicza</span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'blik' ? 'border-orange-600 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="blik"
                        checked={paymentMethod === 'blik'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4 text-orange-600"
                      />
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-orange-600 rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                        B
                      </div>
                      <span className="text-gray-900 text-sm sm:text-base">BLIK</span>
                    </label>

                    <label className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'transfer' ? 'border-orange-600 bg-orange-50' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <input
                        type="radio"
                        name="payment"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="w-4 h-4 text-orange-600"
                      />
                      <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 flex-shrink-0" />
                      <span className="text-gray-900 text-sm sm:text-base">Przelew bankowy</span>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-4 sm:mt-6 space-y-4">
                      <div>
                        <label className="block text-xs sm:text-sm text-gray-700 mb-2">Numer karty</label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-gray-700 mb-2">Data ważności</label>
                          <input
                            type="text"
                            required
                            placeholder="MM/RR"
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'blik' && (
                    <div className="mt-4 sm:mt-6">
                      <label className="block text-xs sm:text-sm text-gray-700 mb-2">Kod BLIK</label>
                      <input
                        type="text"
                        required
                        placeholder="000 000"
                        maxLength={6}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md text-sm sm:text-base"
                >
                  Zapłać {finalTotal.toLocaleString('pl-PL')} zł
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="mb-4 text-gray-900">Podsumowanie</h3>
                <div className="space-y-3 mb-4 pb-4 border-b-2 border-gray-200">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-2 sm:gap-3">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600">x{item.quantity}</p>
                        <p className="text-xs sm:text-sm text-orange-600">
                          {(item.price * item.quantity).toLocaleString('pl-PL')} zł
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Produkty:</span>
                    <span>{totalPrice.toLocaleString('pl-PL')} zł</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Dostawa:</span>
                    </div>
                    <span>{deliveryCost.toLocaleString('pl-PL')} zł</span>
                  </div>
                  <div className="pt-3 border-t-2 border-gray-200 flex justify-between text-gray-900 text-sm sm:text-base">
                    <span>Do zapłaty:</span>
                    <span>{finalTotal.toLocaleString('pl-PL')} zł</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-4 sm:py-6">
        <h1 className="mb-4 sm:mb-6 text-gray-900">Koszyk</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-gray-200 p-8 sm:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              <h2 className="mb-2 text-gray-900">Koszyk jest pusty</h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Dodaj produkty do koszyka, aby kontynuować zakupy
              </p>
              <Link 
                to="/"
                className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm sm:text-base"
              >
                Przeglądaj oferty
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-lg border-2 border-gray-200 p-3 sm:p-4">
                  <div className="flex gap-3 sm:gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-gray-900 mb-2 hover:text-orange-600 transition-colors text-sm sm:text-base truncate">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-orange-600 mb-3 text-sm sm:text-base">
                        {item.price.toLocaleString('pl-PL')} zł
                      </p>
                      
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Zmniejsz ilość"
                          >
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                          </button>
                          <span className="px-3 sm:px-4 text-gray-900 text-sm sm:text-base">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 transition-colors"
                            aria-label="Zwiększ ilość"
                          >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Usuń z koszyka"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-900 text-sm sm:text-base">
                        {(item.price * item.quantity).toLocaleString('pl-PL')} zł
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border-2 border-gray-200 p-4 sm:p-6 lg:sticky lg:top-24">
                <h3 className="mb-4 text-gray-900">Podsumowanie</h3>
                
                <div className="space-y-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-gray-200 text-sm sm:text-base">
                  <div className="flex justify-between text-gray-700">
                    <span>Produkty ({items.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                    <span>{totalPrice.toLocaleString('pl-PL')} zł</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center gap-1">
                      <Truck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Dostawa:</span>
                    </div>
                    <span>{deliveryCost.toLocaleString('pl-PL')} zł</span>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <div className="flex justify-between text-gray-900 mb-4 text-sm sm:text-base">
                    <span>Razem:</span>
                    <span className="text-orange-600">
                      {finalTotal.toLocaleString('pl-PL')} zł
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors shadow-md mb-3 text-sm sm:text-base"
                >
                  {isAuthenticated ? 'Przejdź do płatności' : 'Zaloguj się aby kontynuować'}
                </button>

                <Link 
                  to="/"
                  className="block text-center text-orange-600 hover:text-orange-700 transition-colors text-sm sm:text-base"
                >
                  Kontynuuj zakupy
                </Link>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm text-blue-900 mb-1">Bezpieczna płatność</h4>
                      <p className="text-xs text-blue-800">
                        Twoje dane są chronione szyfrowaniem SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
