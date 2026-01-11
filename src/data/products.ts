export interface Product {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  images: string[];
  category: string;
  featured?: boolean;
  description: string;
  condition: string;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
  };
  specs?: { label: string; value: string }[];
  delivery?: string[];
  reviews?: Review[];
}

export interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

const generateReviews = (productId: number): Review[] => {
  const reviewTemplates = [
    { rating: 5, comment: 'Świetny produkt! Dokładnie jak w opisie, bardzo zadowolony z zakupu.' },
    { rating: 5, comment: 'Polecam! Szybka wysyłka i profesjonalna obsługa.' },
    { rating: 4, comment: 'Dobry produkt, niewielkie ślady użytkowania ale ogólnie jestem zadowolony.' },
    { rating: 5, comment: 'Wszystko jak najbardziej OK. Produkt zgodny z opisem.' },
    { rating: 4, comment: 'Solidny produkt, drobne mankamenty ale za tę cenę wart uwagi.' },
    { rating: 5, comment: 'Bardzo dobry kontakt ze sprzedającym. Produkt pierwsza klasa!' },
    { rating: 3, comment: 'Produkt w porządku, ale spodziewałem się lepszego stanu.' },
    { rating: 4, comment: 'Dobra jakość, szybka realizacja. Polecam sprzedawcę.' },
    { rating: 5, comment: 'Fantastyczny produkt! Przekroczył moje oczekiwania.' },
    { rating: 4, comment: 'W porządku, zgodny z opisem. Drobne niedociągnięcia ale akceptowalne.' }
  ];

  const names = ['Anna K.', 'Piotr M.', 'Kasia W.', 'Marek S.', 'Ola N.', 'Tomasz P.', 'Ewa L.', 'Michał Z.'];
  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100'
  ];

  const reviewCount = 4 + Math.floor(Math.random() * 3); // 4-6 reviews
  const shuffled = [...reviewTemplates].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, reviewCount).map((template, index) => ({
    id: productId * 100 + index,
    author: names[Math.floor(Math.random() * names.length)],
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    rating: template.rating,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toLocaleDateString('pl-PL'),
    comment: template.comment
  }));
};

export const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Laptop Dell XPS 15',
    price: 4500,
    location: 'Warszawa',
    image: 'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQzNTY3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1511385348-a52b4a160dc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjQzNTY3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'
    ],
    category: 'Elektronika',
    featured: true,
    description: 'Laptop Dell XPS 15 w bardzo dobrym stanie. Używany przez 6 miesięcy, głównie do pracy biurowej. Kompletny zestaw z ładowarką i oryginalnym opakowaniem. Procesor Intel Core i7, 16GB RAM, dysk SSD 512GB. Idealny do pracy i rozrywki.',
    condition: 'Bardzo dobry',
    seller: {
      name: 'Jan Kowalski',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1c2VyJTIwcHJvZmlsZXxlbnwxfHx8fDE3NjUwMDU4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      reviews: 42
    },
    specs: [
      { label: 'Procesor', value: 'Intel Core i7-11800H' },
      { label: 'RAM', value: '16GB DDR4' },
      { label: 'Dysk', value: '512GB SSD NVMe' },
      { label: 'Ekran', value: '15.6" Full HD IPS' },
      { label: 'Karta graficzna', value: 'NVIDIA GTX 1650' }
    ],
    delivery: ['Wysyłka', 'Kurier', 'Odbiór osobisty'],
    reviews: generateReviews(1)
  },
  {
    id: 2,
    title: 'iPhone 14 Pro 256GB',
    price: 3200,
    location: 'Kraków',
    image: 'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2NDMzNzU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzbWFydHBob25lJTIwbW9iaWxlfGVufDF8fHx8MTc2NDMzNzU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    category: 'Elektronika',
    featured: true,
    description: 'iPhone 14 Pro w kolorze Space Black, 256GB pamięci. Stan idealny, bez żadnych zarysowań. Komplet z pudełkiem i akcesoriami. Bateria w 98% pojemności.',
    condition: 'Jak nowy',
    seller: {
      name: 'Anna Nowak',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      rating: 5.0,
      reviews: 28
    },
    specs: [
      { label: 'Pamięć', value: '256GB' },
      { label: 'Kolor', value: 'Space Black' },
      { label: 'Stan baterii', value: '98%' },
      { label: 'Gwarancja', value: 'Do 06.2025' }
    ],
    delivery: ['Wysyłka', 'Kurier'],
    reviews: generateReviews(2)
  },
  {
    id: 3,
    title: 'Rower górski Trek',
    price: 1800,
    location: 'Gdańsk',
    image: 'https://images.unsplash.com/photo-1724047314116-de588bcd8c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwYmlrZXxlbnwxfHx8fDE3NjQzOTg4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1724047314116-de588bcd8c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxiaWN5Y2xlJTIwYmlrZXxlbnwxfHx8fDE3NjQzOTg4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    category: 'Sport',
    featured: true,
    description: 'Rower górski Trek w świetnym stanie technicznym. Regularnie serwisowany, nowe opony i hamulce. Idealny na wyprawy w góry.',
    condition: 'Bardzo dobry',
    seller: {
      name: 'Piotr Wiśniewski',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      rating: 4.6,
      reviews: 15
    },
    delivery: ['Odbiór osobisty'],
    reviews: generateReviews(3)
  },
  {
    id: 4,
    title: 'Fotel biurowy ergonomiczny',
    price: 890,
    location: 'Poznań',
    image: 'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjQ0NDcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1636212644134-5867a3807ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmdXJuaXR1cmUlMjBjaGFpcnxlbnwxfHx8fDE3NjQ0NDcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    category: 'Dom',
    featured: false,
    description: 'Ergonomiczny fotel biurowy z regulacją wysokości, podłokietników i oparcia. Świetnie sprawdza się podczas długich godzin pracy.',
    condition: 'Dobry',
    seller: {
      name: 'Kasia Lewandowska',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 4.9,
      reviews: 33
    },
    delivery: ['Kurier', 'Odbiór osobisty'],
    reviews: generateReviews(4)
  },
  {
    id: 5,
    title: 'Aparat Canon EOS R6',
    price: 6500,
    location: 'Wrocław',
    image: 'https://images.unsplash.com/photo-1657826377012-9f444ed01c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1lcmElMjBwaG90b3xlbnwxfHx8fDE3NjQ0NDcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1657826377012-9f444ed01c89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjYW1lcmElMjBwaG90b3xlbnwxfHx8fDE3NjQ0NDcxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    category: 'Elektronika',
    featured: false,
    description: 'Profesjonalny aparat Canon EOS R6 z obiektywem 24-105mm. Niska liczba migawek, stan idealny.',
    condition: 'Jak nowy',
    seller: {
      name: 'Marcin Zieliński',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      rating: 5.0,
      reviews: 19
    },
    delivery: ['Wysyłka', 'Kurier'],
    reviews: generateReviews(5)
  },
  {
    id: 6,
    title: 'Piłka do koszykówki Spalding',
    price: 120,
    location: 'Katowice',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800',
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800'
    ],
    category: 'Sport',
    featured: false,
    description: 'Profesjonalna piłka do koszykówki Spalding. Używana kilka razy, w doskonałym stanie.',
    condition: 'Bardzo dobry',
    seller: {
      name: 'Tomasz Wójcik',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
      rating: 4.8,
      reviews: 31
    },
    delivery: ['Wysyłka', 'Odbiór osobisty'],
    reviews: generateReviews(6)
  },
  {
    id: 7,
    title: 'Stół drewniany rozkładany',
    price: 450,
    location: 'Łódź',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800'
    ],
    category: 'Dom',
    featured: false,
    description: 'Solidny drewniany stół z możliwością rozkładania. Idealny na rodzinne spotkania.',
    condition: 'Dobry',
    seller: {
      name: 'Ewa Kowalczyk',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      rating: 4.7,
      reviews: 24
    },
    delivery: ['Odbiór osobisty', 'Kurier'],
    reviews: generateReviews(7)
  },
  {
    id: 8,
    title: 'Słuchawki Sony WH-1000XM5',
    price: 1200,
    location: 'Warszawa',
    image: 'https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzY0MzU0ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    images: [
      'https://images.unsplash.com/photo-1572119244337-bcb4aae995af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxoZWFkcGhvbmVzJTIwYXVkaW98ZW58MXx8fHwxNzY0MzU0ODg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    category: 'Elektronika',
    featured: false,
    description: 'Najnowsze słuchawki Sony z aktywną redukcją szumów. Komplet z etui i wszystkimi akcesoriami.',
    condition: 'Jak nowy',
    seller: {
      name: 'Michał Szymański',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      rating: 4.9,
      reviews: 47
    },
    delivery: ['Wysyłka', 'Kurier', 'Odbiór osobisty'],
    reviews: generateReviews(8)
  }
];