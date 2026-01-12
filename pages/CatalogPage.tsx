
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HairStyle, Category } from '../types';
import { LOGO_URL } from '../constants';

interface CatalogPageProps {
  styles: HairStyle[];
}

const CatalogPage: React.FC<CatalogPageProps> = ({ styles }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);
  const navigate = useNavigate();

  const filteredStyles = selectedCategory === Category.ALL
    ? styles
    : styles.filter(s => s.category === selectedCategory);

  const categories = Object.values(Category);

  const handleStyleClick = (styleId: string) => {
    navigate('/visualizador');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white font-display">
      <div className="px-6 md:px-12 lg:px-40 py-8 md:py-12 max-w-[1400px] mx-auto w-full flex-1">
        <header className="flex flex-col items-center text-center gap-6 mb-12 animate-fade-in-down">
          <div className="w-40 h-40 md:w-64 md:h-64 mb-4">
            <img 
              alt="Shaver Barbearia Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(184,135,61,0.3)]" 
              src={LOGO_URL}
            />
          </div>
          
          <div className="h-[2px] w-24 bg-primary/50 mb-2"></div>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-[0.1em] uppercase text-white drop-shadow-2xl font-display leading-tight">
            Catálogo de Estilos Premium
          </h2>
        </header>

        <nav className="flex justify-center mb-16">
          <div className="flex gap-2 md:gap-4 flex-wrap justify-center p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`group flex h-9 items-center justify-center gap-x-2 rounded-full px-5 transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat 
                  ? 'bg-primary text-white shadow-[0_4px_15px_rgba(184,135,61,0.4)]' 
                  : 'text-neutral-400 hover:text-white'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-widest">{cat}</span>
              </button>
            ))}
          </div>
        </nav>

        <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24">
          {filteredStyles.map((style) => (
            <div 
              key={style.id} 
              className="group relative flex flex-col gap-3 cursor-pointer"
              onClick={() => handleStyleClick(style.id)}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/5 transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(184,135,61,0.15)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110" 
                  style={{ backgroundImage: `url("${style.imageUrl}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white text-xl font-bold leading-tight drop-shadow-lg">{style.name}</p>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-[1px] w-4 bg-primary"></div>
                    <p className="text-primary text-[10px] uppercase tracking-widest font-black">{style.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>

      <footer className="mt-auto border-t border-white/5 bg-black/60 backdrop-blur-xl py-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-primary font-gothic text-xl tracking-wider">Shaver</p>
            <p className="text-white/20 text-[9px] uppercase tracking-[0.4em]">
              Premium Experience &bull; Est. 2023
            </p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Acesso Interno</p>
                <p className="text-white/20 text-[8px] uppercase tracking-widest">Apenas Administradores</p>
             </div>
             {/* Redirecionamento para a página de Login */}
             <Link 
              to="/login" 
              aria-label="Login Administrativo"
              title="Área Administrativa"
              className="text-primary hover:text-white transition-all p-3 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center border border-white/10 hover:border-primary/50 shadow-inner group"
            >
              <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90 duration-500">settings</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CatalogPage;
