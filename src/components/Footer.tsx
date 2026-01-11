import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'react-feather';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t-3 border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About */}
          <div className="min-w-0">
            <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">O nas</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">Kim jesteśmy</Link></li>
              <li><Link to="/careers" className="hover:text-orange-400 transition-colors">Kariera</Link></li>
              <li><Link to="/press" className="hover:text-orange-400 transition-colors">Dla prasy</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div className="min-w-0">
            <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">Pomoc</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/faq" className="hover:text-orange-400 transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-orange-400 transition-colors">Wysyłka</Link></li>
              <li><Link to="/returns" className="hover:text-orange-400 transition-colors">Zwroty</Link></li>
              <li><Link to="/support" className="hover:text-orange-400 transition-colors">Wsparcie</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="min-w-0">
            <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">Informacje prawne</h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link to="/terms" className="hover:text-orange-400 transition-colors">Regulamin</Link></li>
              <li><Link to="/privacy" className="hover:text-orange-400 transition-colors">Polityka prywatności</Link></li>
              <li><Link to="/cookies" className="hover:text-orange-400 transition-colors">Polityka cookies</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="min-w-0">
            <h3 className="text-white mb-3 sm:mb-4 text-sm sm:text-base">Śledź nas</h3>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-center sm:text-left">
              © 2024 Marketplace. Wszystkie prawa zastrzeżone.
            </p>
            <div className="text-center sm:text-right">
              <p className="text-xs sm:text-sm text-orange-400 mb-1">Projekt: WSB Merito</p>
              <p className="text-xs text-gray-300 break-words">
                Autorzy: Rafał Bojarski, Przemysław Bladowski, Jakub Dampc, Kacper Rynkiewicz, Nikita Kostiuchok
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}