import { useEffect, useRef, useState } from "react";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Trash2, Eye, CheckCircle2, Atom, Crosshair } from "lucide-react";

type Props = {
  carta: CartaTipo;
  displayId?: number;
  onVerDetalle: () => void;
  onEliminar: () => void;
  onSeleccionar: (carta: CartaTipo) => void;
  seleccionadas: boolean;
  algunHeroeSeleccionado: boolean;
};

export default function Carta({
  carta,
  displayId,
  onSeleccionar,
  algunHeroeSeleccionado,
  seleccionadas,
  onVerDetalle,
  onEliminar,
}: Props) {
  const labelId = displayId ?? carta.idCard;

  const timerRef = useRef<any>(null);
  const [estaListo, setEstaListo] = useState(false);

  useEffect(() => {
    const seguro = setTimeout(() => setEstaListo(true), 500);
    return () => {
      clearTimeout(seguro);
      clearTimeout(timerRef.current);
    };
  }, []);

  const iniciarCarga = () => {
    if (!estaListo) return;

    timerRef.current = setTimeout(() => {
      onSeleccionar(carta);
    }, 5000);
  };

  const cancelarCarga = () => {
    clearTimeout(timerRef.current);
  };

  let estiloImagen = "absolute inset-[5px] w-[calc(100%-10px)] h-[calc(100%-10px)] object-cover rounded-xl transition-all duration-500 z-30 ";
  if (seleccionadas) {
    estiloImagen += "scale-102 grayscale-0";
  } else if (algunHeroeSeleccionado) {
    estiloImagen += "grayscale opacity-25 scale-95";
  } else {
    estiloImagen += "grayscale-[40%] hover:grayscale-0 scale-100 hover:scale-102";
  }

  const esFuerte = carta.attack >= 70;
  
  const neonEfecto = esFuerte
    ? "shadow-[0_0_25px_rgba(225,29,72,0.6)] hover:shadow-[0_0_35px_rgba(225,29,72,0.9)]"
    : "shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:shadow-[0_0_35px_rgba(37,99,235,0.9)]";

  const urlMetalDorado = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwsy6GdvgXdK4SYg9qA4NEHhhb0q66E7Kyrw&s.jpg";

  return (
    <div className="flex flex-col items-center w-52 mb-6 transition-all duration-300 select-none">
      
      <div
        className={`relative w-full h-85 overflow-hidden rounded-2xl bg-slate-950 group transition-all duration-300 ${neonEfecto}`}
        onClick={onVerDetalle}
        onMouseEnter={iniciarCarga}
        onMouseLeave={cancelarCarga}
      >
      
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none z-10"
          style={{ backgroundImage: `url(${urlMetalDorado})` }}
        />

        <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-white/20 to-black/30 mix-blend-overlay pointer-events-none z-11" />
        
        <div className="absolute inset-1 border border-black/30 rounded-xl pointer-events-none z-12" />
   
        {!seleccionadas && (
          <div className="absolute top-0 left-0 h-1 bg-linear-to-r from-amber-400 to-yellow-500 transition-all duration-5000 w-0 group-hover:w-full z-50" />
        )}

        {seleccionadas && (
          <div className="absolute top-3.5 right-3.5 z-50 flex items-center justify-center bg-slate-950 border-2 border-emerald-400 text-emerald-400 rounded-xl p-1.5 shadow-[0_0_15px_rgba(16,185,129,0.6)] animate-pulse">
            <CheckCircle2 size={16} strokeWidth={3.5} />
          </div>
        )}

        <div className="absolute top-3 left-3 z-50 bg-slate-950 text-amber-400 border-2 border-amber-500 font-mono text-sm font-black w-8 h-8 flex items-center justify-center rounded-full shadow-md shadow-black/90">
          {labelId}
        </div>

        <img
          src={carta.pictureUrl || 'https://tse4.mm.bing.net/th/id/OIP.TQEryCUQD1doWDqdxDxghAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3'}
          alt={carta.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://tse4.mm.bing.net/th/id/OIP.TQEryCUQD1doWDqdxDxghAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3';
          }}
          className={estiloImagen}
        />

        <div className="absolute inset-x-[5px] bottom-[5px] h-20 bg-linear-to-t from-black/95 via-black/60 to-transparent z-40 pointer-events-none rounded-b-xl" />

        <div className="absolute bottom-5 left-0 right-0 text-center z-40 pointer-events-none px-2.5">
          {esFuerte ? (
            <span className="text-[10px] font-black uppercase italic tracking-[0.16em] flex items-center justify-center gap-1 mb-1 bg-linear-to-r from-rose-400 via-pink-500 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_2px_3px_rgba(0,0,0,1)]">
              <Atom size={15} className="text-rose-400 animate-spin-[slow] drop-shadow-[0_0_4px_rgba(244,63,94,1)]" /> 
              Mutantes Nivel Omega
            </span>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-[0.12em] flex items-center justify-center gap-1 mb-1 text-cyan-400 drop-shadow-[0_2px_3px_rgba(0,0,0,1)]">
              <Crosshair size={15} className="text-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,1)]" /> 
              Expertos Tácticos
            </span>
          )}

          <h3 className="text-xs font-black uppercase tracking-wider truncate text-white drop-shadow-[0_2px_3px_rgba(0,0,0,1)]">
            {carta.name}
          </h3>
        </div>

      </div>

      <div className="flex gap-2 w-full justify-center mt-3 px-1">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEliminar();
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-red-600 text-slate-950 hover:text-white text-xs font-black rounded-xl w-1/2 transition-all duration-200 shadow-md border border-white/20 active:scale-95"
        >
          <Trash2 size={14} strokeWidth={2.5} />
          Eliminar
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onVerDetalle();
          }}
          className="flex items-center justify-center gap-1.5 py-2.5 bg-linear-to-b from-amber-400 via-yellow-500 to-amber-600 hover:from-yellow-300 hover:to-amber-500 text-slate-950 text-xs font-black rounded-xl w-1/2 transition-all duration-200 shadow-md shadow-amber-500/10 active:scale-95"
        >
          <Eye size={14} strokeWidth={2.5} />
          Detalles
        </button>
      </div>

    </div>
  );
}