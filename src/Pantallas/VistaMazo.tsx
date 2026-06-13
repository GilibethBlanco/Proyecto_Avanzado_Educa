import { Link, useNavigate } from "react-router-dom";
import Carta from "../Componentes/Carta";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Plus } from "lucide-react";

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
          className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full text-xl"
        >
          <Plus size={24} />
        </Link>
      </div>

      {seleccionadas.length === 2 && (
  <div className="flex justify-center mb-8 animate-bounce">
    <button
      onClick={() => {
        // Extraemos los IDs de los dos héroes elegidos
        const id1 = seleccionadas[0].idCard;
        const id2 = seleccionadas[1].idCard;
        
        // Viajamos a la arena pasándole los IDs por la URL
        navigate(`/CampoBatalla?p1=${id1}&p2=${id2}`);
      }}
      className="relative px-8 py-4 rounded-xl bg-linear-to-r from-amber-500 via-orange-600 to-red-600 
        text-white font-black text-xl uppercase tracking-widest
        border-2 border-yellow-400/60
        shadow-[0_0_30px_rgba(234,179,8,0.4)]
        hover:shadow-[0_0_50px_rgba(234,179,8,0.7)]
        hover:scale-105 active:scale-95 transition-all duration-300
      "
    >
      💥 ¡INICIAR BATALLA! 💥
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
