interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedConditions: string[];
  onConditionChange: (conditions: string[]) => void;
  location: string;
  onLocationChange: (location: string) => void;
  selectedDelivery: string[];
  onDeliveryChange: (delivery: string[]) => void;
}

export function FilterSidebar({ 
  priceRange, 
  onPriceRangeChange,
  selectedConditions,
  onConditionChange,
  location,
  onLocationChange,
  selectedDelivery,
  onDeliveryChange
}: FilterSidebarProps) {
  const handleConditionToggle = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      onConditionChange(selectedConditions.filter(c => c !== condition));
    } else {
      onConditionChange([...selectedConditions, condition]);
    }
  };

  const handleDeliveryToggle = (delivery: string) => {
    if (selectedDelivery.includes(delivery)) {
      onDeliveryChange(selectedDelivery.filter(d => d !== delivery));
    } else {
      onDeliveryChange([...selectedDelivery, delivery]);
    }
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-3 sm:p-4">
      <h3 className="mb-3 sm:mb-4 text-gray-900 text-sm sm:text-base">Filtry</h3>
      
      {/* Price Range */}
      <div className="mb-4 sm:mb-6">
        <label className="block mb-2 text-gray-800 text-xs sm:text-sm">Cena (zł)</label>
        <div className="flex gap-2 mb-2 sm:mb-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
            placeholder="Od"
            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
            placeholder="Do"
            className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
          />
        </div>
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-600 mb-1">
          <span>{priceRange[0]} zł</span>
          <span>{priceRange[1]} zł</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          value={priceRange[1]}
          onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-orange-600"
        />
      </div>

      {/* Condition */}
      <div className="mb-4 sm:mb-6">
        <label className="block mb-2 text-gray-800 text-xs sm:text-sm">Stan</label>
        <div className="space-y-1.5 sm:space-y-2">
          {['Nowe', 'Używane', 'Uszkodzone'].map((condition) => (
            <label key={condition} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={() => handleConditionToggle(condition)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 border-gray-400 rounded focus:ring-orange-500 accent-orange-600"
              />
              <span className="text-gray-800 text-xs sm:text-sm">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-4 sm:mb-6">
        <label className="block mb-2 text-gray-800 text-xs sm:text-sm">Lokalizacja</label>
        <input
          type="text"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          placeholder="Wpisz miasto"
          className="w-full px-2 sm:px-3 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-xs sm:text-sm"
        />
      </div>

      {/* Delivery */}
      <div>
        <label className="block mb-2 text-gray-800 text-xs sm:text-sm">Dostawa</label>
        <div className="space-y-1.5 sm:space-y-2">
          {['Odbiór osobisty', 'Wysyłka', 'Kurier'].map((delivery) => (
            <label key={delivery} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded-lg transition-colors">
              <input
                type="checkbox"
                checked={selectedDelivery.includes(delivery)}
                onChange={() => handleDeliveryToggle(delivery)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 border-gray-400 rounded focus:ring-orange-500 accent-orange-600"
              />
              <span className="text-gray-800 text-xs sm:text-sm">{delivery}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}