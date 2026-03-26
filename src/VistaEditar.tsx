import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CartaTipo } from "./Componentes/CartaTipo";

type Props = {
  cartas: CartaTipo[];
  onEditar: (idCard: number, cartaEditada: Omit<CartaTipo, 'idCard'>) => Promise<void>;
};

export default function VistaEditar({ cartas, onEditar }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const carta = cartas.find((c) => c.idCard == Number(id));

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [ataque, setAtaque] = useState(0);
  const [defensa, setDefensa] = useState(0);
  const [vida, setVida] = useState(0);
  const [errores, setErrores] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    ataque: "",
    defensa: "",
    vida: "",
  });

  useEffect(() => {
    if (carta) {
      setNombre(carta.name);
      setDescripcion(carta.description);
      setImagen(carta.pictureUrl);
      setAtaque(carta.attack);
      setDefensa(carta.defense);
      setVida(carta.lifePoints);
    }
  }, [carta]);

  if (!carta) {
    return (
      <div className="p-4 text-center text-white">
        Carta no encontrada. <button className="underline" onClick={() => navigate('/')}>Volver al mazo</button>
      </div>
    );
  }

  const handleEditar = async () => {
    let valid = true;
    const newErrores = {
      nombre: "",
      descripcion: "",
      imagen: "",
      ataque: "",
      defensa: "",
      vida: "",
    };

    if (!nombre) {
      newErrores.nombre = "El nombre es obligatorio.";
      valid = false;
    }
    if (!descripcion) {
      newErrores.descripcion = "La descripción es obligatoria.";
      valid = false;
    }
    if (!imagen) {
      newErrores.imagen = "La imagen es obligatoria.";
      valid = false;
    }
    if (ataque <= 0) {
      newErrores.ataque = "El ataque debe ser mayor a 0.";
      valid = false;
    }
    if (defensa <= 0) {
      newErrores.defensa = "La defensa debe ser mayor a 0.";
      valid = false;
    }
    if (vida <= 0) {
      newErrores.vida = "La vida debe ser mayor a 0.";
      valid = false;
    }

    if (!valid) {
      setErrores(newErrores);
      return;
    }

    setErrores({
      nombre: "",
      descripcion: "",
      imagen: "",
      ataque: "",
      defensa: "",
      vida: "",
    });

    try {
      await onEditar(carta.idCard, {
        name: nombre,
        description: descripcion,
        pictureUrl: imagen,
        attack: ataque,
        defense: defensa,
        lifePoints: vida,
      });
      navigate('/');
    } catch (error) {
      console.error('Error en onEditar:', error);
      window.alert('No se pudo editar la carta. Intenta nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-xl shadow-xl">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">Editar Carta</h2>

        <div className="flex flex-col gap-4">
          <div>
            <input
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errores.nombre && (
              <div className="text-red-500 text-sm mt-1">{errores.nombre}</div>
            )}
          </div>

          <div>
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errores.descripcion && (
              <div className="text-red-500 text-sm mt-1">{errores.descripcion}</div>
            )}
          </div>

          <div>
            <input
              placeholder="Imagen URL"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errores.imagen && (
              <div className="text-red-500 text-sm mt-1">{errores.imagen}</div>
            )}
          </div>

          <div className="flex space-x-4">
            <div className="w-1/3">
              <input
                type="number"
                placeholder="Ataque"
                value={ataque}
                onChange={(e) => setAtaque(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
              />
              {errores.ataque && (
                <div className="text-red-500 text-sm mt-1">{errores.ataque}</div>
              )}
            </div>

            <div className="w-1/3">
              <input
                type="number"
                placeholder="Defensa"
                value={defensa}
                onChange={(e) => setDefensa(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
              />
              {errores.defensa && (
                <div className="text-red-500 text-sm mt-1">{errores.defensa}</div>
              )}
            </div>

            <div className="w-1/3">
              <input
                type="number"
                placeholder="Vida"
                value={vida}
                onChange={(e) => setVida(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
              />
              {errores.vida && (
                <div className="text-red-500 text-sm mt-1">{errores.vida}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleEditar}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-800 transition"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}
