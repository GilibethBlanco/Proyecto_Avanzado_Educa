import { useNavigate, useParams } from "react-router-dom";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Trash2, Pencil, X } from "lucide-react";

type Props = {
  cartas: CartaTipo[];
  onEliminar: (idCard: number) => Promise<void>;
};

export default function VistaDetallada({ cartas, onEliminar }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const carta = cartas.find((c) => c.idCard == Number(id));
  const cartaIndex = cartas.findIndex((c) => c.idCard == Number(id));
  const displayId = cartaIndex >= 0 ? cartaIndex + 1 : carta?.idCard;

  if (!carta) {
    return (
      <div className="p-4 text-center text-white">
        Carta no encontrada. <button className="underline" onClick={() => navigate('/')}>Volver al mazo</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-6 backdrop-blur-sm">
  
  <div className="relative bg-slate-900 w-full max-w-4xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6
    border-2 border-green-500/50
    shadow-[0_0_40px_rgba(34,197,94,0.25)]
    hover:shadow-[0_0_60px_rgba(34,197,94,0.4)]
    transition-all duration-700 ease-in-out
  ">
  
    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-500 rounded-tl-lg"></div>
    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-green-500 rounded-tr-lg"></div>
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-green-500 rounded-bl-lg"></div>
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-500 rounded-br-lg"></div>

    <div className="flex flex-col items-center justify-between">

      <div className="relative w-72 h-96 rounded-lg overflow-hidden border-2 border-green-500/30 shadow-lg shadow-black/50">
        <img src={carta.pictureUrl} className="w-full h-full object-cover" alt={carta.name} />

        <div className="absolute top-3 left-3 z-50 bg-slate-950 text-amber-400 border-2 border-amber-500 font-mono text-sm font-black w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-black/90">
          {displayId}
        </div>
      </div>

      <div className="flex gap-3 w-full justify-center mt-6">
        <button
          onClick={async () => {
            await onEliminar(carta.idCard);
            navigate('/');
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-red-600 text-slate-950 hover:text-white text-xs font-black rounded-xl w-1/2 transition-all duration-200 shadow-md border border-white/20 active:scale-95"
        >
          <Trash2 size={16} />
          Eliminar
        </button>

        <button
          onClick={() => {
            navigate(`/editar/${carta.idCard}`);
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-linear-to-b from-amber-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-slate-950 text-xs font-black rounded-xl w-1/2 transition-all duration-200 shadow-md shadow-amber-500/10 active:scale-95"
        >
          <Pencil size={16} />
          Editar
        </button>
      </div>

      <button
        onClick={() => navigate('/')}
        className="flex items-center justify-center gap-1 mt-2 px-4 py-2 text-slate-400 hover:text-white hover:scale-105 transition font-medium"
      >
        <X size={20} />
        Cerrar Ventana
      </button>
    </div>

    <div className="bg-slate-800/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-between">
      <div>

        <h2 className="text-3xl text-transparent bg-clip-text bg-linear-to-r from-green-400 to-emerald-500 font-extrabold tracking-wide uppercase mb-4 pb-2 border-b border-slate-700">
          {carta.name}
        </h2>

        <ul className="text-slate-200 space-y-4 mt-4">
          <li className="bg-slate-900/40 p-3 rounded-lg border-l-4 border-slate-500">
            <span className="font-bold text-slate-400 block text-xs uppercase tracking-wider mb-1">Descripción</span>
            <p className="text-sm italic text-slate-300">"{carta.description || 'Sin descripción disponible.'}"</p>
          </li>
          
          <li className="flex justify-between items-center bg-slate-900/40 p-3 rounded-lg border-l-4 border-amber-500">
            <span className="font-bold text-amber-400 flex items-center gap-1">⚔️ Ataque</span>
            <span className="text-xl font-black text-white bg-slate-950 px-3 py-1 rounded border border-slate-800">{carta.attack}</span>
          </li>
          
          <li className="flex justify-between items-center bg-slate-900/40 p-3 rounded-lg border-l-4 border-cyan-500">
            <span className="font-bold text-cyan-400 flex items-center gap-1">🛡️ Defensa</span>
            <span className="text-xl font-black text-white bg-slate-950 px-3 py-1 rounded border border-slate-800">{carta.defense}</span>
          </li>
          
          <li className="flex justify-between items-center bg-slate-900/40 p-3 rounded-lg border-l-4 border-red-500">
            <span className="font-bold text-red-400 flex items-center gap-1">❤️ Vida</span>
            <span className="text-xl font-black text-white bg-slate-950 px-3 py-1 rounded border border-slate-800">{carta.lifePoints}</span>
          </li>
        </ul>
      </div>

      <div className="text-right text-xs text-slate-500 font-mono mt-4">
        ID_CARD: #{carta.idCard}
      </div>
    </div>

  </div>
</div>
  );
}