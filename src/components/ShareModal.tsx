import { X, Copy, Facebook, Twitter, Mail, MessageCircle, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  productUrl: string;
}

export function ShareModal({ isOpen, onClose, productTitle, productUrl }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank')
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(productTitle)}`, '_blank')
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      action: () => window.location.href = `mailto:?subject=${encodeURIComponent(productTitle)}&body=${encodeURIComponent(productUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600 hover:bg-green-700',
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${productTitle} - ${productUrl}`)}`, '_blank')
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full border-3 border-gray-300 shadow-xl">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-3 border-gray-200">
          <h2 className="text-gray-900 text-base sm:text-lg">Udostępnij ogłoszenie</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
            {productTitle}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.name}
                  onClick={option.action}
                  className={`flex flex-col items-center gap-2 p-3 sm:p-4 ${option.color} text-white rounded-lg transition-colors shadow-md`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-xs sm:text-sm">{option.name}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t-2 border-gray-200">
            <label className="block text-xs sm:text-sm text-gray-700 mb-2">
              Link do ogłoszenia
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={productUrl}
                readOnly
                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-xs sm:text-sm focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all shadow-md flex items-center gap-2 whitespace-nowrap ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm hidden sm:inline">Skopiowano</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm hidden sm:inline">Kopiuj</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
