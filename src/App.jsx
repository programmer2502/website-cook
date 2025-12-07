import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Payment from './components/Payment';
import Bill from './components/Bill';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Header />
          <Cart />
          <main style={{ paddingBottom: '50px' }}>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/bill" element={<Bill />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
