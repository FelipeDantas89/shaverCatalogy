
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HairStyle } from '../types';
import { LOGO_URL } from '../constants';

interface HomePageProps {
  styles: HairStyle[];
}

const HomePage: React.FC<HomePageProps> = ({ styles }) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden bg-background-dark">
      <header className="fixed top-0 left-0 w-full z-20 px-6 md:px-10 py-8 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-20 h-20 md:w-24 md:h-24 transition-transform duration-500 group-hover:scale-110">
            <img src={LOGO_URL} alt="Shaver Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden md:flex flex-col items-start leading-none gap-1">
            <h1 className="text-2xl font-gothic text-white tracking-widest drop-shadow-lg uppercase">Shaver</h1>
            <span className="text-[0.5rem] font-bold tracking-[0.4em] text-primary uppercase w-full">Premium Experience</span>
          </div>
        </div>
        <div className="pointer-events-auto">
          <Link to="/" className="text-xs font-bold tracking-[0.2em] text-white uppercase border-b-2 border-primary pb-1 hover:text-primary transition-colors">
            &larr; Voltar ao Catálogo
          </Link>
        </div>
      </header>

      <main 
        className="flex h-full w-full items-center overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth px-[5vw] md:px-[20vw]"
        onWheel={(e) => {
            const container = e.currentTarget;
            container.scrollLeft += e.deltaY;
        }}
      >
        <div className="flex items-center gap-12 md:gap-24 h-[65vh] flex-nowrap py-10">
          {styles.map((style) => (
            <article key={style.id} className="relative flex flex-col gap-6 h-full min-w-[280px] md:min-w-[400px] snap-center group select-none items-center justify-center">
              <div className="relative w-full h-full overflow-hidden rounded-sm border border-white/10">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" 
                  style={{ backgroundImage: `url("${style.imageUrl}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>
              <div className="flex flex-col items-center gap-2 transition-transform duration-500 group-hover:-translate-y-1 text-center">
                <h2 className="text-lg md:text-xl font-medium tracking-[0.15em] text-white uppercase border-b border-transparent group-hover:border-primary pb-1 transition-all">
                  {style.name}
                </h2>
                <span className="text-[10px] text-primary/60 tracking-[0.2em] uppercase">{style.category}</span>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-10 z-20 flex flex-col items-center gap-6 pointer-events-none">
        <div className="w-full max-w-2xl h-[2px] bg-[#222222] relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-primary shadow-[0_0_15px_rgba(185,136,62,0.6)]"></div>
        </div>
        <div className="w-full max-w-2xl flex justify-between items-end text-[#666] text-[10px] tracking-widest uppercase font-mono">
          <span>Explore</span>
          <span>Role para o lado</span>
        </div>
      </footer>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10"></div>
    </div>
  );
};

export default HomePage;
