import type { CartaTipo } from "../Componentes/CartaTipo";
import { Trash2, Pencil, X } from "lucide-react";

type Props = {
  carta: CartaTipo;
  onCerrar: () => void;
};

export default function VistaDetallada({ carta, onCerrar }: Props) {
  if (!carta) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6">
      <div className="bg-slate-800 w-full max-w-4xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col items-center">
          <div className="relative w-72 h-96 rounded-lg overflow-hidden border-2 border-slate-600">
            <img src={carta.imagen} className="w-full h-full object-cover" />

            <div className="absolute top-2 left-2 bg-red-700 text-white w-8 h-8 flex items-center justify-center rounded-full">
              {carta.numero}
            </div>
          </div>

      <div className="flex gap-2 w-full justify-center mt-4">
            <button className="flex items-center justify-center gap-1 px-4 py-2 bg-red-600 text-white  hover:bg-red-800 rounded-lg">
              <Trash2 size={16} />
              Eliminar
            </button>

            <button className="flex items-center justify-center gap-1 px-4 py-2 bg-blue-600 text-white  hover:bg-blue-800 rounded-lg">
              <Pencil size={16} />
              Editar
            </button>
          </div>

          <button
            onClick={onCerrar}
            className="flex items-center justify-center gap-1 px-4 py-4 text-slate-300 hover:text-white"
          >
            <X size={20} />
            Cerrar
          </button>
        </div>

        <div className="bg-slate-700 p-6 rounded-xl">
          <h2 className="text-2xl text-white font-bold mb-4">
            {carta.nombre}
          </h2>

          <ul className="text-white space-y-2">
            <li>Descrpción:  {carta.descripcion}</li>
            <li>Ataque: {carta.ataque}</li>
            <li>Defensa: {carta.defensa}</li>
            <li>Vida: {carta.vida}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}