import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  sellerName: string;
}

export function MessageModal({ isOpen, onClose, productTitle, sellerName }: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      setSent(true);
      setTimeout(() => {
        onClose();
        setMessage('');
        setSent(false);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-lg w-full border-3 border-gray-300 shadow-xl">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-3 border-gray-200">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-gray-900 text-base sm:text-lg truncate">Wiadomość do sprzedającego</h2>
            <p className="text-xs sm:text-sm text-gray-600 truncate">{sellerName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-green-900 mb-2 text-sm sm:text-base">Wiadomość wysłana!</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Sprzedający otrzyma Twoją wiadomość i odpowie wkrótce.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  Dotyczy: <span className="text-gray-900">{productTitle}</span>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-xs sm:text-sm text-gray-700 mb-2">
                  Twoja wiadomość
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Napisz wiadomość do sprzedającego..."
                  rows={6}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {message.length} / 500 znaków
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="flex-1 px-4 py-2.5 sm:py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Wyślij
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
