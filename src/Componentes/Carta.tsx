import { Trash2, Edit2, Shield, Sword, Heart } from 'lucide-react';

export interface CardData {
  id: number;
  numero: number;
  nombre: string;
  imagen: string;
  ataque: number;
  defensa: number;
  vida: number;
}

interface CartaProps {

  data: CardData;
  onEdit: (card: CardData) => void;
  onDelete: (id: number) => void;
  isPreview?: boolean; 
}

function Carta({ data, onEdit, onDelete, isPreview = false }: CartaProps) {
  return (

    <div className={`flex flex-col items-center transition-transform duration-300 ${!isPreview ? 'hover:scale-105 w-full max-w-[220px]' : 'scale-100 w-full'}`}>
      <div 
        className={`relative w-full overflow-hidden rounded-lg shadow-xl border-2 border-gray-700 ${!isPreview && 'hover:border-red-500'} bg-gray-800 text-white`} 
        style={{ aspectRatio: '2/3' }} 
      >

        <img 
          src={data.imagen} 
          alt={data.nombre} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {

            (e.currentTarget as HTMLImageElement).src = "https://placehold.co/300x450/4f46e5/ffffff?text=Sin+Imagen";
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-2 bg-lainer-to-t from-black/80 via-transparent to-black/30 pointer-events-none">

          <div className="absolute top-2 left-2 bg-red-700 text-white text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full border-2 border-red-500 shadow-md z-10">
            <h3>{data.numero}</h3>
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            <span className="text-xs font-bold text-white bg-red-600/70 px-1.5 py-0.5 rounded-full flex items-center gap-1"><Sword size={10}/> {data.ataque}</span>
            <span className="text-xs font-bold text-white bg-blue-600/70 px-1.5 py-0.5 rounded-full flex items-center gap-1"><Shield size={10}/> {data.defensa}</span>
            <span className="text-xs font-bold text-white bg-green-600/70 px-1.5 py-0.5 rounded-full flex items-center gap-1"><Heart size={10}/> {data.vida}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 text-center bg-lainer-to-t from-gray-900 via-gray-900/90 to-transparent">
            <h3 className="text-white text-lg font-bold uppercase truncate shadow-black drop-shadow-md">
              {data.nombre}
            </h3>
          </div>
        </div>
      </div>

      {!isPreview && (
        <div className="flex space-x-2 w-full justify-center mt-3">
          <button 
            onClick={() => onDelete(data.id)}
            className="flex items-center justify-center px-3 py-1.5 bg-red-600/90 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md w-1/2 gap-1"
          >
            <Trash2 size={14} /> Eliminar
          </button>

          <button 
            onClick={() => onEdit(data)}
            className="flex items-center justify-center px-3 py-1.5 bg-blue-600/90 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md w-1/2 gap-1"
          >
            <Edit2 size={14} /> Editar
          </button>
        </div>
      )}
    </div>
  );
}

export default Carta;









