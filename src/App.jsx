import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import ProductPricing from './ProductPricing';
import CreateProductForm from './CreateProductForm'; // Import CreateProductForm
import 'antd/dist/reset.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  // Check if there's a token in localStorage when the app starts
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []); // Run once on component mount

  const handleLogin = (token) => {
    localStorage.setItem('authToken', token); // Save token to localStorage
    setIsLoggedIn(true);
    setToken(token); // Lưu token khi đăng nhập thành công
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/pricing" />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/pricing"
          element={<ProductPricing isLoggedIn={isLoggedIn} token={token} />}
        />
        <Route
          path="/addproduct"
          element={<CreateProductForm token={token} />} // Không cần điều kiện đăng nhập lại vì đã có token
        />
        <Route
          path="/"
          element={<Navigate to="/pricing" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
