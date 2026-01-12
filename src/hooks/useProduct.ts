import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../data/products';

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProduct() {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*, categories(name)')
                    .eq('id', id)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    const mappedProduct: Product = {
                        id: data.id,
                        title: data.name,
                        price: data.price,
                        location: data.location || 'Polska',
                        image: data.image_url,
                        images: [data.image_url], // Since DB currently has single image, arrayify it
                        category: data.categories?.name || 'Inne',
                        featured: false,
                        description: data.description,
                        condition: data.condition || 'Nowy',
                        delivery: data.delivery || [],
                        seller: {
                            name: 'Sprzedawca',
                            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
                            rating: 5.0,
                            reviews: 0
                        },
                        reviews: []
                    };
                    setProduct(mappedProduct);
                }
            } catch (err: any) {
                console.error('Error fetching product:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}
