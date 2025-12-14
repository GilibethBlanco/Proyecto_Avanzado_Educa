import { useState } from "react";
import type { CartaTipo } from "../Componentes/CartaTipo";

type Props = {
  onCerrar: () => void;
  onCrear: (carta: CartaTipo) => void;
};

export default function VistaCrearCarta({ onCerrar, onCrear }: Props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-xl shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Crear Carta
        </h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
            placeholder="Descripción"
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 resize-none
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <input
            placeholder="Imagen URL"
            onChange={(e) => setImagen(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              type="number"
              placeholder="Ataque"
              onChange={(e) => setAtaque(+e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="number"
              placeholder="Defensa"
              onChange={(e) => setDefensa(+e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="number"
              placeholder="Vida"
              onChange={(e) => setVida(+e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCerrar}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onCrear({
                numero: Date.now(),
                nombre,
                descripcion,
                imagen,
                ataque,
                defensa,
                vida,
              })
            }
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-800 transition"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}