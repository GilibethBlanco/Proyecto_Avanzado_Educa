import { useState } from 'react';
import { X, Save, Shield, Sword, Heart, Image as ImageIcon } from 'lucide-react';
import './App.css'; 


import VistaMazo from './Pantallas/VistaMazo';
import Carta, { type CardData } from './Componentes/Carta'; 


const INITIAL_CARDS: CardData[] = [
  {
    id: 1,
    numero: 1,
    nombre: "Capitán América",
    imagen: "https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg",
    ataque: 80, defensa: 90, vida: 100
  },
  {
    id: 2,
    numero: 2,
    nombre: "Iron Man",
    imagen: "https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg",
    ataque: 95, defensa: 85, vida: 90
  },
  {
    id: 3,
    numero: 3,
    nombre: "Black Widow",
    imagen: "https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg",
    ataque: 85, defensa: 60, vida: 80
  },
  {
    id: 4,
    numero: 4,
    nombre: "Bruja Escarlata",
    imagen: "https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg",
    ataque: 100, defensa: 70, vida: 95
  },
  {
    id: 5,
    numero: 5,
    nombre: "Spider-man",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XnPOrguRalHjABq0zmTSm34Zj4D9O5f1c_DxrNiYXQ0AHepjg9tt9APt6efypbjOC00&usqp=CAU.jpg",
    ataque: 88, defensa: 75, vida: 85
  }
];


interface EditModalProps {
  card: CardData;
  onClose: () => void;
  onSave: (updatedCard: CardData) => void;
}

function EditModal({ card, onClose, onSave }: EditModalProps) {

  const [formData, setFormData] = useState<CardData>({ ...card });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'nombre' || name === 'imagen' ? value : Number(value)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row border border-slate-700 max-h-[90vh]">

        <div className="w-full md:w-1/2 p-8 bg-slate-900/50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-700 relative">
            <h2 className="text-slate-400 uppercase tracking-widest text-sm font-bold mb-6 absolute top-4 left-4">Vista Previa</h2>
            <div className="transform scale-110">
 
                <Carta 
                    data={formData} 
                    onEdit={() => {}} 
                    onDelete={() => {}} 
                    isPreview={true} 
                />
            </div>
        </div>

        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Editar Carta</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5 flex-1">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nombre</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wide"><Sword size={12} className="text-red-400"/> Ataque</label>
                <input type="number" name="ataque" value={formData.ataque} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-red-500 outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wide"><Shield size={12} className="text-blue-400"/> Defensa</label>
                <input type="number" name="defensa" value={formData.defensa} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wide"><Heart size={12} className="text-green-400"/> Vida</label>
                <input type="number" name="vida" value={formData.vida} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-2 focus:ring-2 focus:ring-green-500 outline-none"/>
              </div>
            </div>

            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-wide"><ImageIcon size={12}/> URL Imagen</label>
              <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} className="w-full bg-slate-700 border border-slate-600 text-slate-300 text-sm rounded-lg p-3 focus:ring-2 focus:ring-purple-500 outline-none"/>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
             <button onClick={onClose} className="flex-1 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold">Cancelar</button>
             <button onClick={() => onSave(formData)} className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex justify-center items-center gap-2"><Save size={18}/> Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {

  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);

  const handleEdit = (card: CardData) => setEditingCard(card);
  
  const handleDelete = (id: number) => {
    console.log("Eliminando carta con ID:", id);
    setCards(cards.filter(c => c.id !== id));
  };

  const handleSave = (updatedCard: CardData) => {
   
    setCards(cards.map(c => c.id === updatedCard.id ? updatedCard : c));
    setEditingCard(null); 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans relative">
      <header className="mb-10 border-b border-slate-700 pb-4 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500 uppercase tracking-widest">
            Mi Mazo
        </h1>
        <p className="text-slate-400 mt-1">Héroes de Marvel.</p>
      </header>
      
      <VistaMazo 
        cards={cards} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />

      {editingCard && (
        <EditModal 
          card={editingCard}
          onClose={() => setEditingCard(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}


export default App;


