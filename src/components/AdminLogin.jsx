import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { loginAdmin } from '../utils/api';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginAdmin(password);
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid password');
        }
    };

    return (
        <div className="container flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center mb-4" style={{ marginBottom: '30px' }}>
                    <div style={{
                        background: 'var(--light)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 15px'
                    }}>
                        <Lock className="text-primary" size={30} />
                    </div>
                    <h2 className="text-2xl">Host Login</h2>
                    <p className="text-gray">Please enter your password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-danger" style={{ marginTop: '5px', fontSize: '0.9rem' }}>{error}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
