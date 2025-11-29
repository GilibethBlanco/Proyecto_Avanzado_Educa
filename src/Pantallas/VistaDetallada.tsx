
type Props = {
  carta: any;
  onCerrar: () => void;
};

export default function VistaDetallada({ carta, onCerrar }: Props) {
  if (!carta) return null; // Condicional para evitar errores

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-6">
      <div className="bg-slate-800 w-full max-w-5xl rounded-xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* -------------------- IZQUIERDA -------------------- */}
        <div className="flex flex-col items-center">

          <div className="relative w-72 h-96 rounded-lg overflow-hidden border-2 border-slate-600 shadow-xl">
            <img
              src={carta.imagen}
              alt={carta.nombre}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-2 left-2 bg-red-700 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full">
              {carta.numero}
            </div>

            <div className="absolute bottom-0 w-full bg-black/70 text-center py-2">
              <h2 className="text-white font-bold uppercase text-lg">
                {carta.nombre}
              </h2>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex w-full mt-4 space-x-3">
            <button className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow">
              Eliminar
            </button>

            <button className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow">
              Editar
            </button>
          </div>

          <button
            onClick={onCerrar}
            className="mt-4 text-slate-300 hover:text-white"
          >
            Cerrar
          </button>
        </div>

        {/* -------------------- DERECHA (INFORMACIÓN) -------------------- */}
        <div className="bg-slate-700 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-white mb-4">Información de la Carta</h2>

          <div className="space-y-4 text-white">

            <div>
              <h3 className="text-sm text-slate-300">Nombre</h3>
              <p className="text-lg font-semibold">{carta.nombre}</p>
            </div>

            <div>
              <h3 className="text-sm text-slate-300">Ataque</h3>
              <p className="text-lg font-semibold">{carta.ataque ?? "—"}</p>
            </div>

            <div>
              <h3 className="text-sm text-slate-300">Defensa</h3>
              <p className="text-lg font-semibold">{carta.defensa ?? "—"}</p>
            </div>

            <div>
              <h3 className="text-sm text-slate-300">Vida</h3>
              <p className="text-lg font-semibold">{carta.vida ?? "—"}</p>
            </div>

            <div>
              <h3 className="text-sm text-slate-300">Imagen</h3>
              <p className="text-sm break-all text-slate-300">{carta.imagen}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}