
import { Category, HairStyle } from './types';

// URL externa para o logotipo.
// Isso garante que a imagem carregue em qualquer dispositivo sem depender de arquivos locais.
// O serviço ui-avatars gera um logo "SB" (Shaver Barbearia) nas cores da marca (Fundo Preto, Texto Dourado).
export const LOGO_URL = "https://ui-avatars.com/api/?name=Shaver+B&background=000000&color=b8873d&size=512&font-size=0.35&length=2&rounded=true&bold=true";

export const INITIAL_STYLES: HairStyle[] = [
  {
    id: '1',
    name: 'Fade Clássico',
    category: Category.CLASSIC,
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1000&auto=format&fit=crop',
    description: 'Um degradê limpo e atemporal para o homem moderno.'
  },
  {
    id: '2',
    name: 'Pompadour Moderno',
    category: Category.MODERN,
    imageUrl: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1000&auto=format&fit=crop',
    description: 'Volume e estilo com acabamento impecável.'
  },
  {
    id: '3',
    name: 'Barba Lenhador',
    category: Category.BEARD,
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1000&auto=format&fit=crop',
    description: 'Tratamento premium para uma barba cheia e alinhada.'
  },
  {
    id: '4',
    name: 'Buzz Cut',
    category: Category.CLASSIC,
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1000&auto=format&fit=crop',
    description: 'Praticidade, estilo e atitude em um corte rente.'
  },
  {
    id: '5',
    name: 'Undercut Texturizado',
    category: Category.MODERN,
    imageUrl: 'https://images.unsplash.com/photo-1593487568965-9a81faeb5663?q=80&w=1000&auto=format&fit=crop',
    description: 'Laterais raspadas com topo trabalhado em camadas.'
  }
];
