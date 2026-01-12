
import React, { useState } from 'react';
import { HairStyle, Category } from '../types';
import { LOGO_URL } from '../constants';

interface AdminPageProps {
  styles: HairStyle[];
  onAdd: (style: HairStyle) => void;
  onUpdate: (style: HairStyle) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ styles, onAdd, onUpdate, onDelete, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStyle, setEditingStyle] = useState<HairStyle | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: Category.CLASSIC,
    imageUrl: '',
    description: ''
  });

  const openAddModal = () => {
    setEditingStyle(null);
    setFormData({
      name: '',
      category: Category.CLASSIC,
      imageUrl: '',
      description: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (style: HairStyle) => {
    setEditingStyle(style);
    setFormData({
      name: style.name,
      category: style.category,
      imageUrl: style.imageUrl,
      description: style.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStyle) {
      onUpdate({
        ...editingStyle,
        ...formData
      });
    } else {
      onAdd({
        id: Date.now().toString(),
        ...formData
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col font-display">
      <header className="bg-surface-dark border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Shaver" className="w-10 h-10 object-contain" />
          <h1 className="text-xl font-gothic tracking-widest uppercase">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-6">
          <a href="#/" className="text-xs text-neutral-400 hover:text-primary transition-colors uppercase tracking-widest">Ver Site</a>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            SAIR
          </button>
        </div>
      </header>

      <main className="p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold">Gestão de Catálogo</h2>
            <p className="text-neutral-500 mt-1">Gerencie os estilos de cabelo e serviços visíveis para os clientes.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            NOVO ESTILO
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map(style => (
            <div key={style.id} className="bg-surface-dark border border-white/5 rounded-xl overflow-hidden group">
              <div className="h-48 overflow-hidden relative">
                <img src={style.imageUrl} alt={style.name} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => openEditModal(style)}
                    className="bg-white/10 hover:bg-primary backdrop-blur-md p-2 rounded-lg text-white transition-all shadow-xl"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button 
                    onClick={() => { if(confirm('Excluir este estilo?')) onDelete(style.id); }}
                    className="bg-white/10 hover:bg-red-600 backdrop-blur-md p-2 rounded-lg text-white transition-all shadow-xl"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary/80 text-white text-[10px] px-2 py-1 rounded uppercase font-bold tracking-widest">{style.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{style.name}</h3>
                <p className="text-neutral-500 text-sm line-clamp-2">{style.description || 'Sem descrição definida.'}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-dark w-full max-w-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-fade-in-down">
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="text-xl font-bold">{editingStyle ? 'Editar Estilo' : 'Cadastrar Novo Estilo'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Nome do Estilo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border-white/5 rounded-lg text-white focus:ring-primary focus:border-primary p-3"
                  placeholder="Ex: High Fade"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Categoria</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value as Category})}
                  className="w-full bg-black/40 border-white/5 rounded-lg text-white focus:ring-primary focus:border-primary p-3"
                >
                  {Object.values(Category).filter(c => c !== Category.ALL).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">URL da Imagem</label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full bg-black/40 border-white/5 rounded-lg text-white focus:ring-primary focus:border-primary p-3"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold">Descrição (Opcional)</label>
                <textarea 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-black/40 border-white/5 rounded-lg text-white focus:ring-primary focus:border-primary p-3 h-24 resize-none"
                  placeholder="Detalhes sobre o corte..."
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg transition-all"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all"
                >
                  {editingStyle ? 'ATUALIZAR' : 'CADASTRAR'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
