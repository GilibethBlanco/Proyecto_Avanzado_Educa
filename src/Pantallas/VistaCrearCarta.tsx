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
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-xl">
        <h2 className="text-white text-2xl mb-4">Crear Carta</h2>

        <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
        <textarea placeholder="Descripción" onChange={e => setDescripcion(e.target.value)} />
        <input placeholder="Imagen URL" onChange={e => setImagen(e.target.value)} />
        <input type="number" placeholder="Ataque" onChange={e => setAtaque(+e.target.value)} />
        <input type="number" placeholder="Defensa" onChange={e => setDefensa(+e.target.value)} />
        <input type="number" placeholder="Vida" onChange={e => setVida(+e.target.value)} />

        <div className="flex gap-4 mt-4">
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
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Crear
          </button>

          <button onClick={onCerrar} className="bg-gray-600 text-white px-4 py-2 rounded-lg">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}