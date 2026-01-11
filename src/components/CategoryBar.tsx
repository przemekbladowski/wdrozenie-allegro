import { Smartphone, Laptop, Home, Car, Dumbbell, Baby, BookOpen, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
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

export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
  return (
    <div className="hidden md:block bg-white border-b-3 border-gray-300 sticky top-[56px] sm:top-[60px] md:top-[73px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Desktop Horizontal Scroll */}
        <div className="flex gap-1.5 sm:gap-2 py-2 sm:py-2.5 md:py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category.name)}
                className={`flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-lg whitespace-nowrap transition-all min-w-max text-xs sm:text-sm md:text-base ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-md border-2 border-orange-600'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-200'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
