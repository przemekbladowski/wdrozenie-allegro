import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../data/products';

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, categories(name)');

                if (error) {
                    throw error;
                }

                if (data) {
                    const mappedProducts: Product[] = data.map((item: any) => ({
                        id: item.id,
                        title: item.name,
                        price: item.price,
                        location: item.location || 'Polska',
                        image: item.image_url,
                        images: [item.image_url],
                        category: item.categories?.name || 'Inne',
                        featured: false,
                        description: item.description,
                        condition: item.condition || 'Nowy',
                        delivery: item.delivery || [],
                        seller: {
                            name: 'Sprzedawca',
                            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
                            rating: 5.0,
                            reviews: 0
                        },
                        reviews: []
                    }));
                    setProducts(mappedProducts);
                }
            } catch (err: any) {
                console.error('Error fetching products:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return { products, loading, error };
}
