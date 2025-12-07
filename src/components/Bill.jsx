import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Printer, Home } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Bill = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const orderId = Math.floor(Math.random() * 100000);

    useEffect(() => {
        if (cart.length === 0) {
            navigate('/');
        }
    }, [cart, navigate]);

    const handlePrint = () => {
        window.print();
    };

    const handleDone = () => {
        if (window.confirm('Finish order and clear cart?')) {
            clearCart();
            navigate('/');
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '500px' }}>
            <div className="no-print flex justify-between mb-4" style={{ marginBottom: '20px' }}>
                <button onClick={handleDone} className="btn btn-secondary">
                    <Home size={18} /> Done
                </button>
                <button onClick={handlePrint} className="btn btn-primary">
                    <Printer size={18} /> Print Bill
                </button>
            </div>

            <div className="card bill-container" style={{ padding: '40px' }}>
                <div className="text-center border-b pb-4 mb-4" style={{ borderBottom: '2px dashed #eee', marginBottom: '20px', paddingBottom: '20px' }}>
                    <h1 className="text-2xl">GourmetGo</h1>
                    <p className="text-gray">123 Food Street, Tasty City</p>
                    <p className="text-gray">Tel: +1 234 567 890</p>
                </div>

                <div className="flex justify-between text-sm mb-4" style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#666' }}>
                    <div>
                        <p>Order #: {orderId}</p>
                        <p>Date: {date}</p>
                    </div>
                    <div className="text-right">
                        <p>Time: {time}</p>
                        <p>Table: Walk-in</p>
                    </div>
                </div>

                <div className="border-b pb-4 mb-4" style={{ borderBottom: '2px dashed #eee', marginBottom: '20px', paddingBottom: '20px' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <th style={{ padding: '5px 0' }}>Item</th>
                                <th style={{ padding: '5px 0', textAlign: 'center' }}>Qty</th>
                                <th style={{ padding: '5px 0', textAlign: 'right' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td style={{ padding: '8px 0' }}>{item.name}</td>
                                    <td style={{ padding: '8px 0', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '8px 0', textAlign: 'right' }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center text-xl font-bold" style={{ fontWeight: 'bold' }}>
                    <span>Total</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                </div>

                <div className="text-center mt-8 text-gray text-sm" style={{ marginTop: '40px', fontSize: '0.8rem' }}>
                    <p>Thank you for dining with us!</p>
                    <p>Please visit again.</p>
                </div>
            </div>

            <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .container { max-width: 100%; padding: 0; }
          .card { box-shadow: none; border: none; }
        }
      `}</style>
        </div>
    );
};

export default Bill;
