import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Receipt, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Payment = () => {
    const { cart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="container text-center" style={{ paddingTop: '50px' }}>
                <p>No items to pay for.</p>
                <button onClick={() => navigate('/')} className="btn btn-primary mt-4">Back to Menu</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 20px', maxWidth: '600px' }}>
            <button onClick={() => navigate('/')} className="btn btn-secondary mb-4" style={{ marginBottom: '20px' }}>
                <ArrowLeft size={18} /> Back to Menu
            </button>

            <div className="card text-center">
                <h1 className="text-2xl mb-4" style={{ marginBottom: '20px' }}>Payment</h1>

                <div style={{ marginBottom: '30px' }}>
                    <p className="text-gray mb-2">Total Amount</p>
                    <p className="text-primary" style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                        ₹{cartTotal.toFixed(2)}
                    </p>
                </div>

                <div style={{
                    background: '#f8f9fa',
                    padding: '30px',
                    borderRadius: 'var(--radius)',
                    display: 'inline-block',
                    marginBottom: '30px'
                }}>
                    {/* Placeholder for Static QR Code */}
                    <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=example@upi&pn=FoodApp&am=100"
                        alt="Payment QR Code"
                        style={{ width: '200px', height: '200px' }}
                    />
                    <p className="text-gray mt-4" style={{ marginTop: '15px' }}>Scan to Pay</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/bill')}
                        className="btn btn-primary w-full"
                        style={{ padding: '15px' }}
                    >
                        <Receipt size={20} /> Generate Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
