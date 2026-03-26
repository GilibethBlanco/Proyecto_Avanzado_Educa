import { Link, useNavigate } from "react-router-dom";
import Carta from "../Componentes/Carta";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Plus } from "lucide-react";

type Props = {
  cartas: CartaTipo[];
  onEliminar: (idCard: number) => Promise<void>;
};

export default function VistaMazo({ cartas, onEliminar }: Props) {
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cartas.map((carta, index) => (
          <Carta
            key={carta.idCard}
            carta={carta}
            displayId={index + 1}
            onVerDetalle={() => navigate(`/carta/${carta.idCard}`)}
            onEliminar={() => onEliminar(carta.idCard)}
          />
        ))}
      </div>
    </div>
  );
}
