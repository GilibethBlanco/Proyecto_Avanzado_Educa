import type { CartaTipo } from "../Componentes/CartaTipo";
import { Trash2, Eye } from "lucide-react";

type Props = {
  carta: CartaTipo;
  onSeleccionar: (carta: CartaTipo) => void;
};

export default function Carta({ carta, onSeleccionar }: Props) {
  return (
    <div
      className="flex flex-col items-center w-50 transition-transform duration-300 hover:scale-105 cursor-pointer gap-1"
      
    >
      <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg border-2 border-gray-700 hover:border-red-500"
      onClick={() => onSeleccionar(carta)}>

        <img
          src={carta.imagen}
          alt={carta.nombre}
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute top-2 left-2 bg-red-700 text-white border-2 border-red-400 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full">
          {carta.numero}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-2 text-center bg-linear-to-t from-gray-900 via-gray-900/80 to-transparent">
          <h3 className="text-white text-md font-bold uppercase truncate">
            {carta.nombre}
          </h3>
        </div>
      </div>

      <div className="flex gap-2 w-full justify-center mt-4">
        <button className="flex items-center justify-center gap-1 px-2 py-2 bg-red-600 text-white hover:bg-red-800 text-xs font-semibold rounded-lg w-1/2">
        <Trash2 size={16} />
          Eliminar
        </button>

        <button className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 text-white  hover:bg-blue-800 text-xs font-semibold rounded-lg w-1/2">
        <Eye size={16} />
          Detalles
        </button>
      </div>
    </div>
  );
}






