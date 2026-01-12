
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { HairStyle, User } from './types';
import { INITIAL_STYLES } from './constants';

const App: React.FC = () => {
  const [styles, setStyles] = useState<HairStyle[]>(() => {
    const saved = localStorage.getItem('shaver_styles');
    return saved ? JSON.parse(saved) : INITIAL_STYLES;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shaver_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('shaver_styles', JSON.stringify(styles));
  }, [styles]);

  const login = (username: string) => {
    const newUser = { username, isAuthenticated: true };
    setUser(newUser);
    localStorage.setItem('shaver_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('shaver_user');
  };

  const addStyle = (style: HairStyle) => {
    setStyles(prev => [style, ...prev]);
  };

  const updateStyle = (updatedStyle: HairStyle) => {
    setStyles(prev => prev.map(s => (s.id === updatedStyle.id ? updatedStyle : s)));
  };

  const deleteStyle = (id: string) => {
    setStyles(prev => prev.filter(s => s.id !== id));
  };

  return (
    <Router>
      <Routes>
        {/* Agora o catálogo é a página inicial */}
        <Route path="/" element={<CatalogPage styles={styles} />} />
        {/* O visualizador horizontal é a segunda aba/página */}
        <Route path="/visualizador" element={<HomePage styles={styles} />} />
        
        <Route path="/login" element={user ? <Navigate to="/admin" /> : <LoginPage onLogin={login} />} />
        <Route 
          path="/admin" 
          element={
            user ? (
              <AdminPage 
                styles={styles} 
                onAdd={addStyle} 
                onUpdate={updateStyle} 
                onDelete={deleteStyle} 
                onLogout={logout} 
              />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
