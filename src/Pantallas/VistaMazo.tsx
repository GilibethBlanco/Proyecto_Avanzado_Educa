import { Link, useNavigate } from "react-router-dom";
import Carta from "../Componentes/Carta";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Plus, Swords } from "lucide-react";

type Props = {
  cartas: CartaTipo[];
  onEliminar: (idCard: number) => Promise<void>;
  onSeleccionar: (carta: CartaTipo) => void;
  seleccionadas: CartaTipo[];
  algunHeroeSeleccionado: boolean;
};

export default function VistaMazo({ cartas, onEliminar, onSeleccionar, algunHeroeSeleccionado, seleccionadas }: Props) {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-light uppercase tracking-[0.3em] border-b-2 border-white/30 pb-2 inline-block justify-center mx-auto">
          MI MAZO DE CARTAS
        </h1>
        <Link
          to="/crear"
          className="flex items-center justify-center bg-blue-600 text-white w-10 h-10 rounded-full text-xl"
        >
          <Plus size={24} />
        </Link>
      </div>

      <div className="flex items-center gap-4">
       <button 
      onClick={() => navigate('/generar-carta')}
      className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 border border-purple-500 text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
     >
      <span>✨</span> Generar Carta con IA
      </button>
      </div>
      <br />

 {seleccionadas.length === 2 && (
  <div className="flex justify-center my-8 w-full">
    <button
      onClick={() => {
        const id1 = seleccionadas[0].idCard;
        const id2 = seleccionadas[1].idCard;
        navigate(`/CampoBatalla?p1=${id1}&p2=${id2}`);
      }}
     
      className="flex items-center justify-center gap-4 px-10 py-5 rounded-xl 
        bg-slate-950 border-2 border-emerald-500
        hover:scale-105 active:scale-95 transition-all duration-300
        select-none group"
    >
      <Swords size={28} className="text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
      
      <span className="font-black text-2xl uppercase tracking-widest text-amber-100">
        INICIAR BATALLA
      </span>

      <Swords size={28} className="text-emerald-500 scale-x-[-1] group-hover:-rotate-12 transition-transform duration-300" />
    </button>
  </div>
)}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
       {cartas.map((carta, index) => (
   <Carta 
    key={carta.idCard}
    carta={carta}
    displayId={index + 1}
    onVerDetalle={() => navigate(`/carta/${carta.idCard}`)}
    onEliminar={() => onEliminar(carta.idCard)}
    onSeleccionar={onSeleccionar} // <--- Ahora sí funcionará
    algunHeroeSeleccionado={algunHeroeSeleccionado}
    seleccionadas={seleccionadas.some(c => c.idCard === carta.idCard)} 
  />
))}

      </div>
    </div>
  );
}
