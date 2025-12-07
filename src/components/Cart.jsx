import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            <div
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
                onClick={() => setIsCartOpen(false)}
            />

            <div style={{
                width: '100%',
                maxWidth: '400px',
                background: 'var(--white)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-lg)',
                animation: 'slideIn 0.3s ease-out'
            }}>
                <div className="flex justify-between items-center p-4" style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
                    <h2 className="text-xl">Your Cart</h2>
                    <button onClick={() => setIsCartOpen(false)} className="text-gray hover:text-dark">
                        <X size={24} />
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    {cart.length === 0 ? (
                        <div className="text-center text-gray" style={{ marginTop: '50px' }}>
                            <p>Your cart is empty.</p>
                            <button
                                className="btn btn-primary mt-4"
                                onClick={() => setIsCartOpen(false)}
                                style={{ marginTop: '20px' }}
                            >
                                Start Ordering
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex gap-4 items-center" style={{ paddingBottom: '15px', borderBottom: '1px solid #f5f5f5' }}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                                        <p className="text-primary">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '5px' }}
                                            onClick={() => updateQuantity(item.id, -1)}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '5px' }}
                                            onClick={() => updateQuantity(item.id, 1)}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                    <button
                                        className="text-danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div style={{ padding: '20px', borderTop: '1px solid #eee', background: 'var(--light)' }}>
                        <div className="flex justify-between items-center mb-4" style={{ marginBottom: '20px' }}>
                            <span className="text-xl">Total</span>
                            <span className="text-2xl text-primary">₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="btn btn-primary w-full"
                            style={{ padding: '15px' }}
                            onClick={() => {
                                setIsCartOpen(false);
                                navigate('/payment');
                            }}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
