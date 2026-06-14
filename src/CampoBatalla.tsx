import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

type Props = {
  cartas: any[];
};

export default function CampoBatalla({ cartas }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [cartaBase1, setCartaBase1] = useState<any>(null);
  const [cartaBase2, setCartaBase2] = useState<any>(null);

  const [vidaP1, setVidaP1] = useState<number>(0);
  const [ataqueP1, setAtaqueP1] = useState<number>(0);
  const [defensaP1, setDefensaP1] = useState<number>(0);

  const [vidaP2, setVidaP2] = useState<number>(0);
  const [ataqueP2, setAtaqueP2] = useState<number>(0);
  const [defensaP2, setDefensaP2] = useState<number>(0);

  const [tiempo, setTiempo] = useState<number>(480); 
  const [ronda, setRonda] = useState<number>(1); 
  const [esTurnoIA, setEsTurnoIA] = useState<boolean>(false); 
  const [defensaDuplicadaP1, setDefensaDuplicadaP1] = useState<boolean>(false);
  const [defensaDuplicadaP2, setDefensaDuplicadaP2] = useState<boolean>(false);

  const [mutacionP1Hecha, setMutacionP1Hecha] = useState<boolean>(false);
  const [mutacionP2Hecha, setMutacionP2Hecha] = useState<boolean>(false);
  const [mostrarSelectorMutacion, setMostrarSelectorMutacion] = useState<boolean>(false);

  const [bitacora, setBitacora] = useState<string[]>(['⚔️ ¡La arena está lista! Comienza la batalla de héroes.']);
  const [ganadorPartida, setGanadorPartida] = useState<string | null>(null);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    const p1 = searchParams.get('p1');
    const p2 = searchParams.get('p2');
    if (!p1 || !p2) return;

    const h1 = cartas.find((c) => String(c.idCard) === String(p1) || String(c.id) === String(p1));
    const h2 = cartas.find((c) => String(c.idCard) === String(p2) || String(c.id) === String(p2));

    if (h1 && h2) {
      setCartaBase1(h1);
      setCartaBase2(h2);
      
      setVidaP1(Number(h1.lifePoints) || 500);
      setAtaqueP1(Number(h1.attack) || 80);
      setDefensaP1(Number(h1.defense) || 80);

      setVidaP2(Number(h2.lifePoints) || 500);
      setAtaqueP2(Number(h2.attack) || 80);
      setDefensaP2(Number(h2.defense) || 80);
    }
  }, [searchParams, cartas]);

  useEffect(() => {
    if (ganadorPartida) return;

    timerRef.current = setInterval(() => {
      setTiempo((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          evaluarFinDeTiempo();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [vidaP1, vidaP2, ganadorPartida]);

  useEffect(() => {
    if (ronda === 4 && !mutacionP1Hecha && !ganadorPartida) {
      setMostrarSelectorMutacion(true);
    }
  }, [ronda, mutacionP1Hecha, ganadorPartida]);

  useEffect(() => {
    if (esTurnoIA && !ganadorPartida) {
      const iaPensando = setTimeout(() => {
        ejecutarTurnoIA();
      }, 1500);

      return () => clearTimeout(iaPensando);
    }
  }, [esTurnoIA, ganadorPartida]);

  const evaluarFinDeTiempo = () => {
    if (vidaP1 > vidaP2) setGanadorPartida(cartaBase1.name);
    else if (vidaP2 > vidaP1) setGanadorPartida(cartaBase2.name);
    else setGanadorPartida("Empate");
  };

  const formatearTiempo = () => {
    const min = Math.floor(tiempo / 60);
    const seg = tiempo % 60;
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  const elegirMutacionJugador = (opcion: 'vida' | 'ataque' | 'defensa') => {
    if (opcion === 'vida') setVidaP1(prev => prev + 30);
    if (opcion === 'ataque') setAtaqueP1(prev => prev + 10);
    if (opcion === 'defensa') setDefensaP1(prev => prev + 15);

    const nombreP1 = cartaBase1?.name || 'Tu personaje';
    const textoOpcion = opcion === 'vida' ? 'Vida (+30 HP)' : opcion === 'ataque' ? 'Ataque (+10 ATK)' : 'Defensa (+15 DEF)';
    const logJugador = `🧬 ¡Evolución! ${nombreP1} mutó con éxito y mejoró su ${textoOpcion}.`;

    let logIA = "";
    if (!mutacionP2Hecha && cartaBase2) {
      const opciones: ('vida' | 'ataque' | 'defensa')[] = ['vida', 'ataque', 'defensa'];
      const decisionMutacion = opciones[Math.floor(Math.random() * opciones.length)];
      
      if (decisionMutacion === 'vida') {
        setVidaP2(prev => prev + 30);
        logIA = `✨ En respuesta, ${cartaBase2.name} despertó un nuevo poder y aumentó su Vida (+30 HP).`;
      } else if (decisionMutacion === 'ataque') {
        setAtaqueP2(prev => prev + 10);
        logIA = `✨ En respuesta, ${cartaBase2.name} despertó un nuevo poder y aumentó su Ataque (+10 ATK).`;
      } else if (decisionMutacion === 'defensa') {
        setDefensaP2(prev => prev + 15);
        logIA = `✨ En respuesta, ${cartaBase2.name} despertó un nuevo poder y aumentó su Defensa (+15 DEF).`;
      }
      setMutacionP2Hecha(true);
    }

    setMutacionP1Hecha(true);
    setMostrarSelectorMutacion(false);
    
    setBitacora(prev => [logIA, logJugador, ...prev]);
  };

  const jugadorAtaca = () => {
    let defRival = esEscudoActivo(2) ? defensaP2 * 2 : defensaP2;
    const dañoBase = ataqueP1 * (100 / (100 + defRival));
    const dado = Math.floor(Math.random() * 10) + 1;
    const danoFinal = Math.round(dañoBase + dado);

    const nuevaVidaP2 = Math.max(0, vidaP2 - danoFinal);
    setVidaP2(nuevaVidaP2);
    setDefensaDuplicadaP2(false);

    setBitacora(prev => [`⚔️ ¡${cartaBase1.name} ataca a ${cartaBase2.name} e inflige ${danoFinal} de daño!`, ...prev]);

    if (nuevaVidaP2 <= 0) {
      setGanadorPartida(cartaBase1.name);
    } else {
      setEsTurnoIA(true);
    }
  };

  const jugadorDefiende = () => {
    setDefensaDuplicadaP1(true);

    setBitacora(prev => [`🛡️ ${cartaBase1.name} se cubre. ¡Su armadura se duplica para el próximo turno!`, ...prev]);
    setEsTurnoIA(true);
  };

  const ejecutarTurnoIA = () => {
    const vidaMaximaIA = Number(cartaBase2.lifePoints) || 500;
    const quiereDefenderse = vidaP2 < (vidaMaximaIA * 0.35) && !defensaDuplicadaP2 && Math.random() > 0.4;

    if (quiereDefenderse) {
      setDefensaDuplicadaP2(true);
      setBitacora(prev => [`🛡️ ${cartaBase2.name} se pone en posición defensiva y dobla su escudo.`, ...prev]);
    } else {
      let defRival = esEscudoActivo(1) ? defensaP1 * 2 : defensaP1;
      const danoBase = ataqueP2 * (100 / (100 + defRival));
      const dado = Math.floor(Math.random() * 10) + 1;
      const danoFinal = Math.round(danoBase + dado);

      const nuevaVidaP1 = Math.max(0, vidaP1 - danoFinal);
      setVidaP1(nuevaVidaP1);
      setDefensaDuplicadaP1(false);

      setBitacora(prev => [`💥 ${cartaBase2.name} contraataca: Causa ${danoFinal} de daño a ${cartaBase1.name}.`, ...prev]);

      if (nuevaVidaP1 <= 0) {
        setGanadorPartida(cartaBase2.name);
        return;
      }
    }

    setRonda(prev => prev + 1);
    setEsTurnoIA(false);
    setBitacora(prev => [`--- Comienza la Ronda ${ronda + 1} ---`, ...prev]);
  };

  const esEscudoActivo = (jugador: number) => {
    return jugador === 1 ? defensaDuplicadaP1 : defensaDuplicadaP2;
  };

  if (!cartaBase1 || !cartaBase2) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-bold uppercase tracking-widest">
        ⚡ Preparando Arena de Combate... ⚡
      </div>
    );
  }

  const clasesCarta1 = `flex flex-col items-center bg-slate-900 p-5 rounded-2xl border-2 transition-all duration-500 w-72
    ${ganadorPartida === cartaBase1.name ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.45)] scale-102 z-10' : ''}
    ${ganadorPartida && ganadorPartida !== cartaBase1.name && ganadorPartida !== "Empate" ? 'opacity-40 grayscale blur-[1px] scale-98 border-slate-950' : ''}
    ${!ganadorPartida && !esTurnoIA ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : ''}
    ${!ganadorPartida && esTurnoIA ? 'border-slate-800 opacity-60' : ''}
  `;

  const clasesCarta2 = `flex flex-col items-center bg-slate-900 p-5 rounded-2xl border-2 transition-all duration-500 w-72
    ${ganadorPartida === cartaBase2.name ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.45)] scale-102 z-10' : ''}
    ${ganadorPartida && ganadorPartida !== cartaBase2.name && ganadorPartida !== "Empate" ? 'opacity-40 grayscale blur-[1px] scale-98 border-slate-950' : ''}
    ${!ganadorPartida && esTurnoIA ? 'border-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : ''}
    ${!ganadorPartida && !esTurnoIA ? 'border-slate-800 opacity-60' : ''}
  `;

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col justify-between text-white select-none">

      <div className="flex flex-col items-center bg-slate-900 border border-slate-800 p-4 rounded-xl max-w-xl mx-auto w-full shadow-md">
        <h1 className="text-3xl font-black bg-clip-text text-transparent bg-linear-to-r from-yellow-400 via-red-500 to-purple-500 uppercase tracking-widest">
          Modo Batalla IA
        </h1>
        <div className="flex gap-8 mt-1 font-mono text-xs">
          <div>RELOJ: <span className="text-red-400 font-bold">{formatearTiempo()}</span></div>
          <div>RONDA ACTUAL: <span className="text-cyan-400 font-bold">#{ronda}</span></div>
          <div>MODO DE JUEGO: <span className="text-emerald-400 font-bold">MANUAL VS IA</span></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl mx-auto my-auto">

        <div className={clasesCarta1}>
          <div className="relative w-full h-72 rounded-xl overflow-hidden border border-slate-700">
            <img src={cartaBase1.pictureUrl} className="w-full h-full object-cover" alt={cartaBase1.name} />
            {defensaDuplicadaP1 && (
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-xs flex items-center justify-center border-4 border-blue-400 animate-pulse">
                <span className="bg-blue-600 px-3 py-1 text-[10px] font-black rounded-full">🛡️ GUARDIA ACTIVA</span>
              </div>
            )}
            {ganadorPartida === cartaBase1.name && (
              <div className="absolute inset-0 bg-linear-to-t from-yellow-500/50 via-transparent to-transparent flex items-end justify-center pb-4">
                <span className="bg-yellow-400 text-slate-950 font-black px-4 py-1 rounded-full text-[11px] shadow-md tracking-widest uppercase">👑 GANADOR</span>
              </div>
            )}
          </div>
          <h2 className="text-lg font-bold mt-3 text-emerald-400 uppercase tracking-wide truncate w-full text-center">{cartaBase1.name}</h2>
          
          <div className="w-full mt-3 space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">HP:</span>
              <span className="font-bold text-white">{vidaP1} / {cartaBase1.lifePoints || 500}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 transition-all duration-300" 
                style={{ width: `${(vidaP1 / (Number(cartaBase1.lifePoints) || 500)) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between"><span>⚔️ ATK:</span><span className="text-amber-400 font-bold">{ataqueP1}</span></div>
            <div className="flex justify-between"><span>🛡️ DEF:</span><span className="text-cyan-400 font-bold">{defensaDuplicadaP1 ? defensaP1 * 2 : defensaP1}</span></div>
          </div>

          {!ganadorPartida && !esTurnoIA && (
            <div className="w-full mt-4 space-y-2">
              {mostrarSelectorMutacion ? (
                <div className="bg-purple-950/40 p-2 rounded-lg border border-purple-500/30 text-center space-y-1.5">
                  <span className="text-[9px] font-bold text-purple-400 block mb-1 tracking-widest">🧬 EVOLUCIÓN DISPONIBLE</span>
                  <button onClick={() => elegirMutacionJugador('vida')} className="w-full py-1.5 bg-purple-700 hover:bg-purple-600 active:translate-y-0.5 border-b-4 border-purple-900 text-[10px] font-black rounded-lg transition-all text-white uppercase tracking-wider">Vida (+30)</button>
                  <button onClick={() => elegirMutacionJugador('ataque')} className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 active:translate-y-0.5 border-b-4 border-amber-800 text-[10px] font-black rounded-lg transition-all text-white uppercase tracking-wider">Ataque (+10)</button>
                  <button onClick={() => elegirMutacionJugador('defensa')} className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 active:translate-y-0.5 border-b-4 border-cyan-800 text-[10px] font-black rounded-lg transition-all text-white uppercase tracking-wider">Defensa (+15)</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={jugadorAtaca} 
                    className="py-3 bg-linear-to-b from-rose-500 to-red-700 hover:from-rose-400 hover:to-red-600 active:translate-y-0.5 border-b-4 border-red-900 text-xs font-black rounded-xl transition-all uppercase tracking-widest text-white shadow-[0_4px_10px_rgba(220,38,38,0.2)]"
                  >
                    ⚔️ Atacar
                  </button>
                  <button 
                    onClick={jugadorDefiende} 
                    className="py-3 bg-linear-to-b from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 active:translate-y-0.5 border-b-4 border-slate-950 text-xs font-black rounded-xl transition-all uppercase tracking-widest text-white border"
                  >
                    🛡️ Escudo
                  </button>
                </div>
              )}
            </div>
          )}
          {!ganadorPartida && esTurnoIA && (
            <div className="text-xs text-slate-500 font-mono mt-4 text-center animate-pulse tracking-wide">IA calculando estrategia...</div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center bg-slate-900/90 border border-slate-800 p-4 rounded-xl w-full max-w-xs text-center shadow-lg">
          {ganadorPartida ? (
            <div className="bg-slate-950 p-4 rounded-lg border border-yellow-500/30 w-full">
              <span className="text-4xl block">🏆</span>
              <h3 className="text-yellow-400 font-black text-xs uppercase tracking-widest mt-1">Fin del Juego</h3>
              <p className="text-base font-black text-white uppercase mt-2 whitespace-pre-line tracking-wide">
                {ganadorPartida === "Empate" ? "¡EMPATE POR TIEMPO!" : `¡GANADOR!\n${ganadorPartida}`}
              </p>
              <button 
                onClick={() => navigate('/')} 
                className="mt-5 px-4 py-2.5 bg-linear-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 active:translate-y-0.5 border-b-4 border-amber-900 text-slate-950 font-black text-xs rounded-xl w-full uppercase tracking-wider transition-all"
              >
                Volver al Mazo
              </button>
            </div>
          ) : (
            <div className="w-full">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-b from-red-500 to-yellow-500 italic drop-shadow-[0_0_10px_rgba(239,68,68,0.3)] block animate-pulse">VS</span>
              <div className="mt-2 text-[10px] uppercase font-mono tracking-widest p-1 rounded bg-slate-950 text-slate-400">
                {esTurnoIA ? "🤖 Turno de la Computadora" : "👤 Tu momento de jugar"}
              </div>
            </div>
          )}

          <div className="mt-4 w-full bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono text-left h-36 overflow-y-auto space-y-2">
            {bitacora.map((log, idx) => {
              let claseFila = "text-slate-400";

              if (log.startsWith("---")) {
                claseFila = "text-cyan-400 text-center tracking-wider block font-bold py-0.5";
              } else if (log.startsWith("⚔️")) {
                claseFila = "text-emerald-400 font-semibold";
              } else if (log.startsWith("🛡️") && log.includes("se cubre")) {
                claseFila = "text-teal-400 italic";
              } else if (log.startsWith("💥")) {
                claseFila = "text-rose-400 font-semibold";
              } else if (log.startsWith("🛡️") && log.includes("posición defensiva")) {
                claseFila = "text-orange-400 italic";
              } else if (log.startsWith("🧬")) {
                claseFila = "text-purple-400 font-bold bg-purple-950/20 p-1 rounded border border-purple-900/30 block";
              } else if (log.startsWith("✨")) {
                claseFila = "text-yellow-400 font-bold bg-yellow-950/20 p-1 rounded border border-yellow-900/30 block";
              }

              return (
                <div key={idx} className={`${claseFila} leading-relaxed`}>
                  {log}
                </div>
              );
            })}
          </div>
        </div>

        <div className={clasesCarta2}>
          <div className="relative w-full h-72 rounded-xl overflow-hidden border border-slate-700">
            <img src={cartaBase2.pictureUrl} className="w-full h-full object-cover" alt={cartaBase2.name} />
            {defensaDuplicadaP2 && (
              <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-xs flex items-center justify-center border-4 border-blue-400 animate-pulse">
                <span className="bg-blue-600 px-3 py-1 text-[10px] font-black rounded-full">🛡️ GUARDIA ACTIVA</span>
              </div>
            )}
            {ganadorPartida === cartaBase2.name && (
              <div className="absolute inset-0 bg-linear-to-t from-yellow-500/50 via-transparent to-transparent flex items-end justify-center pb-4">
                <span className="bg-yellow-400 text-slate-950 font-black px-4 py-1 rounded-full text-[11px] shadow-md tracking-widest uppercase">👑 GANADOR</span>
              </div>
            )}
          </div>
          <h2 className="text-lg font-bold mt-3 text-red-400 uppercase tracking-wide truncate w-full text-center">{cartaBase2.name}</h2>
          
          <div className="w-full mt-3 space-y-2 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">HP:</span>
              <span className="font-bold text-white">{vidaP2} / {cartaBase2.lifePoints || 500}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-600 transition-all duration-300" 
                style={{ width: `${(vidaP2 / (Number(cartaBase2.lifePoints) || 500)) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between"><span>⚔️ ATK:</span><span className="text-amber-400 font-bold">{ataqueP2}</span></div>
            <div className="flex justify-between"><span>🛡️ DEF:</span><span className="text-cyan-400 font-bold">{defensaDuplicadaP2 ? defensaP2 * 2 : defensaP2}</span></div>
          </div>

          <div className="w-full mt-4 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center text-[10px] uppercase font-mono text-slate-500 tracking-wider">
            {esTurnoIA ? "⚡ Ejecutando Algoritmo..." : "🤖 Sistema en Espera"}
          </div>
        </div>

      </div>

      {!ganadorPartida && (
        <div className="text-center mt-2">
          <button 
            onClick={() => navigate('/')} 
            className="px-4 py-2 bg-slate-900 hover:bg-red-950/30 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 text-slate-500 text-xs font-bold rounded-xl transition-all uppercase tracking-wider"
          >
            🏳️ Retirarse del Combate
          </button>
        </div>
      )}

    </div>
  );
}