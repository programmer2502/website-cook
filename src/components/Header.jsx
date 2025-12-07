import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Utensils } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <header style={{
            background: 'var(--white)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container flex justify-between items-center" style={{ height: '70px' }}>
                <Link to="/" className="flex items-center gap-2 text-xl text-primary">
                    <Utensils size={24} />
                    <span>GourmetGo</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setIsCartOpen(true)}
                        style={{ position: 'relative' }}
                    >
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-5px',
                                right: '-5px',
                                background: 'var(--primary)',
                                color: 'white',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <Link to="/admin" className="btn btn-secondary">
                        <User size={20} />
                        <span>Host</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
