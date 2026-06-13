import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CartaTipo } from "../Componentes/CartaTipo";

type Props = {
  onCrear: (carta: Omit<CartaTipo, 'idCard'>) => Promise<void>;
};

export default function VistaCrearCarta({ onCrear }: Props) {
  const navigate = useNavigate();
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

  const handleCrear = async () => {
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

    // --- NUEVAS VALIDACIONES CON MÁXIMOS Y MÍNIMOS ---

    // Validación de Ataque (Mínimo 1, Máximo 80)
    if (ataque <= 0) {
      newErrores.ataque = "El ataque debe ser mayor a 0.";
      valid = false;
    } else if (ataque > 80) {
      newErrores.ataque = "El ataque máximo permitido es 80.";
      valid = false;
    }

    // Validación de Defensa (Mínimo 1, Máximo 80)
    if (defensa <= 0) {
      newErrores.defensa = "La defensa debe ser mayor a 0.";
      valid = false;
    } else if (defensa > 80) {
      newErrores.defensa = "La defensa máxima permitida es 80.";
      valid = false;
    }

    // Validación de Vida (Mínimo 1, Máximo 250)
    if (vida <= 0) {
      newErrores.vida = "La vida debe ser mayor a 0.";
      valid = false;
    } else if (vida > 250) {
      newErrores.vida = "La vida máxima permitida es 250.";
      valid = false;
    }

    // -------------------------------------------------

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
      await onCrear({
        name: nombre,
        description: descripcion,
        pictureUrl: imagen,
        attack: ataque,
        defense: defensa,
        lifePoints: vida,
        id: 0
      });
      navigate('/');
    } catch (error) {
      console.error('Error en onCrear:', error);
      window.alert('No se pudo crear la carta. Intenta nuevamente.');
    }
  };
  
  return (
    <div className=" p-8 flex items-center justify-center">
    
    {/* CONTENEDOR PRINCIPAL CON BRILLO Y MARCO */}
    <div className="relative w-full max-w-4xl p-8 rounded-2xl 
      bg-slate-900/90 backdrop-blur-md
      border-2 border-cyan-500/50
      shadow-[0_0_40px_rgba(34,211,238,0.25)] 
      hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] 
      transition-all duration-700 ease-in-out
      animate-pulse-[0.9]
    ">
      
      {/* Esquinas decorativas estilo Marco de Imagen de Videojuego */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-cyan-400 rounded-br-lg"></div>

      {/* TITULO DEL FORMULARIO */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 tracking-wider uppercase">
          🛡️ Crear Nueva Carta de Héroe ⚔️
        </h2>
        <p className="text-slate-400 text-sm mt-1">Inserta los datos para forjar a tu luchador</p>
      </div>

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
             <label className="block text-gray-300 text-sm font-bold mb-2">
               ⚔️ Ataque (Máx 80)
               </label>
              <input
                type="number"
                placeholder="Ej: 50"
                value={ataque}
                onChange={(e) => setAtaque(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
                max="80"
              />
              {errores.ataque && (
                <div className="text-red-500 text-sm mt-1">{errores.ataque}</div>
              )}
            </div>

            <div className="w-1/3">
            <label className="block text-gray-300 text-sm font-bold mb-2">
             🛡️ Defensa (Máx 80)
              </label>
              <input
                type="number"
                placeholder="Ej: 40"
                value={defensa}
                onChange={(e) => setDefensa(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
                max="80"
              />
              {errores.defensa && (
                <div className="text-red-500 text-sm mt-1">{errores.defensa}</div>
              )}
            </div>

            <div className="w-1/3">
            <label className="block text-gray-300 text-sm font-bold mb-2">
              ❤️ Vida (Máx 250)
              </label>
              <input
                type="number"
                placeholder="Ej: 150"
                value={vida}
                onChange={(e) => setVida(+e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-slate-700 text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-red-500"
                min="1"
                max="250"
              />
              {errores.vida && (
                <div className="text-red-500 text-sm mt-1">{errores.vida}</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
        <button
      type="button"
      onClick={() => navigate('/')} // Si usas react-router, esto te saca de aquí al mazo
      className="px-4 py-2 rounded-lg bg-slate-700 text-gray-200 hover:bg-slate-600 hover:text-white transition font-medium"
    >
      Cancelar
    </button>

    {/* Tu botón original de Crear (Con su onClick intacto para que funcione) */}
    <button
      type="button"
      onClick={handleCrear}
      className="w-full sm:w-auto px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
    >
      Crear
    </button>
          
        </div>
      </div>
    </div>
  );
}