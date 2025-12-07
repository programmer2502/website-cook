import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getItems } from '../utils/api';

const Menu = () => {
    const { addToCart } = useCart();
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState('All');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to load menu items", error);
            }
        };
        fetchItems();
    }, []);

    const categories = ['All', ...new Set(items.map(i => i.category))];
    const filteredItems = category === 'All' ? items : items.filter(i => i.category === category);

    return (
        <div className="container animate-fade-in" style={{ padding: '40px 20px' }}>
            <div className="flex flex-col items-center gap-4" style={{ marginBottom: '40px' }}>
                <h1 className="text-2xl">Our Menu</h1>
                <div className="flex gap-2" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`btn ${category === cat ? 'btn-primary' : 'btn-secondary'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-3">
                {filteredItems.map(item => (
                    <div key={item.id} className="card flex flex-col justify-between">
                        <div>
                            <div style={{
                                height: '200px',
                                overflow: 'hidden',
                                borderRadius: 'var(--radius)',
                                marginBottom: '15px'
                            }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl">{item.name}</h3>
                                <span className="text-primary text-xl">₹{item.price.toFixed(2)}</span>
                            </div>
                            <p className="text-gray" style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
                                {item.description}
                            </p>
                        </div>
                        <button
                            className="btn btn-primary w-full"
                            onClick={() => addToCart(item)}
                        >
                            <Plus size={18} /> Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Menu;
