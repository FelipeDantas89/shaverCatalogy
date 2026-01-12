
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin(username);
      navigate('/admin');
    } else {
      setError('Acesso negado. Credenciais incorretas.');
    }
  };

  return (
    <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos Decorativos */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"></div>

      <div className="absolute top-10 left-10 z-10">
        <Link to="/" className="text-primary/60 flex items-center gap-2 hover:text-primary transition-all group">
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Voltar ao Catálogo</span>
        </Link>
      </div>

      <div className="w-full max-w-md animate-fade-in-down z-10">
        <div className="flex flex-col items-center mb-10">
          <div className="w-32 h-32 mb-6">
            <img 
              src={LOGO_URL} 
              alt="Shaver Barbearia" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-3xl font-gothic text-white uppercase tracking-[0.2em] mb-2">Login Administrativo</h2>
          <div className="h-[2px] w-12 bg-primary"></div>
        </div>

        <div className="bg-surface-dark/40 backdrop-blur-2xl border border-white/5 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] uppercase tracking-widest font-bold p-4 rounded-lg text-center animate-pulse">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-black ml-1">Usuário</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all px-5 py-4 text-sm"
                placeholder="Identificação"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-black ml-1">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all px-5 py-4 text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(184,135,61,0.25)] uppercase tracking-[0.2em] text-xs mt-4 active:scale-[0.98]"
            >
              Autenticar
            </button>
          </form>
        </div>

        <p className="text-center text-neutral-600 text-[10px] mt-10 uppercase tracking-[0.5em] font-medium">
          Sistema Seguro Shaver
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
