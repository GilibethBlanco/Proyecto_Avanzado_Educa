import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {
  cartas: any[]; 
};

export default function CampoBatalla({ cartas }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  
  const [luchador1, setLuchador1] = useState<any>(null);
  const [luchador2, setLuchador2] = useState<any>(null);

  useEffect(() => {
  
    const param1 = searchParams.get('p1');
    const param2 = searchParams.get('p2');

    if (!param1 || !param2) return;

    const heroe1 = cartas.find((c) => String(c.idCard) === String(param1) || String(c.id) === String(param1));
    const heroe2 = cartas.find((c) => String(c.idCard) === String(param2) || String(c.id) === String(param2));

    if (heroe1 && heroe2) {
      setLuchador1(heroe1);
      setLuchador2(heroe2);
    }
  }, [searchParams, cartas]);

  if (!luchador1 || !luchador2) {
    const id1 = searchParams.get('p1');
    const id2 = searchParams.get('p2');

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
        <div className="bg-slate-900 border border-red-500/30 p-6 rounded-xl max-w-md text-center shadow-lg shadow-red-950/20">
          <span className="text-4xl block mb-2">⚡</span>
          <h3 className="text-xl font-bold text-red-400 uppercase tracking-wider">Preparando Arena</h3>
          <p className="text-slate-400 text-sm mt-2">
            Buscando combatientes en el mazo principal...
          </p>
          
          {/* Panel técnico para ver qué está llegando exactamente */}
          <div className="mt-4 bg-slate-950 p-3 rounded text-xs font-mono text-left text-slate-500 space-y-1">
            <div>Buscando ID 1: <span className="text-yellow-500">{id1 || 'No enviado'}</span></div>
            <div>Buscando ID 2: <span className="text-yellow-500">{id2 || 'No enviado'}</span></div>
            <div>Total cartas en mazo: <span className="text-emerald-500">{cartas.length}</span></div>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="mt-5 px-4 py-2 bg-slate-800 text-sm rounded hover:bg-slate-700 text-slate-200 transition font-medium w-full"
          >
            Volver al Mazo
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-between text-white">

      <div className="text-center mt-4">
        <h1 className="text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-red-500 to-purple-500 tracking-widest uppercase">
          Arena de Combate
        </h1>
        <p className="text-slate-400 text-sm mt-1">Duelo de estadísticas en tiempo real</p>
      </div>

    
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-5xl my-auto">

        <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] w-72 transition-all duration-300">
          <img 
            src={luchador1.pictureUrl} 
            alt={luchador1.name} 
            className="w-full h-80 object-cover rounded-xl border border-slate-700 shadow-md" 
          />
          <h2 className="text-xl font-bold mt-4 text-blue-400 uppercase tracking-wide text-center">
            {luchador1.name}
          </h2>
          
          <div className="w-full mt-4 space-y-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">⚔️ Ataque:</span>
              <span className="font-black text-white">{luchador1.attack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">🛡️ Defensa:</span>
              <span className="font-black text-white">{luchador1.defense}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">❤️ Vida:</span>
              <span className="font-black text-white">{luchador1.lifePoints}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-b from-red-500 to-yellow-500 italic animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            VS
          </span>
          <div className="mt-4 bg-slate-900 px-4 py-2 rounded-full border border-slate-800 text-xs font-mono text-slate-500">
            MATCH ID: #{luchador1.idCard || luchador1.id}x#{luchador2.idCard || luchador2.id}
          </div>
        </div>

        <div className="flex flex-col items-center bg-slate-900 p-6 rounded-2xl border-2 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.2)] w-72 transition-all duration-300">
          <img 
            src={luchador2.pictureUrl} 
            alt={luchador2.name} 
            className="w-full h-80 object-cover rounded-xl border border-slate-700 shadow-md" 
          />
          <h2 className="text-xl font-bold mt-4 text-red-400 uppercase tracking-wide text-center">
            {luchador2.name}
          </h2>
          
          <div className="w-full mt-4 space-y-2 text-sm bg-slate-950 p-3 rounded-lg border border-slate-800">
            <div className="flex justify-between">
              <span className="text-slate-400">⚔️ Ataque:</span>
              <span className="font-black text-white">{luchador2.attack}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">🛡️ Defensa:</span>
              <span className="font-black text-white">{luchador2.defense}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">❤️ Vida:</span>
              <span className="font-black text-white">{luchador2.lifePoints}</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mb-6">
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-slate-800 text-slate-400 hover:text-white hover:bg-red-950/40 hover:border-red-700 border border-transparent transition-all rounded-lg text-sm font-medium tracking-wide"
        >
          🏳️ Retirarse del Combate
        </button>
      </div>

    </div>
  );
}