import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wand2, ArrowLeft, Shield, Sword, Heart, Zap } from 'lucide-react';

type Props = {
  onCartaGenerada: (carta: any) => void;
};

export default function GeneradorCartasIA({ onCartaGenerada }: Props) {
  const navigate = useNavigate();
  const [cardPrompt, setCardPrompt] = useState('');
  const [cargando, setCargando] = useState(false);
  const [cartaGenerada, setCartaGenerada] = useState<any>(null);
  const [error, setError] = useState('');

  const generarCarta = async () => {
    if (!cardPrompt) return;
    setCargando(true);
    setError('');
    
    try {
      const response = await fetch('https://educapi-v2.onrender.com/ai/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'usersecretpasskey': 'Gili394131CO'
        },
        body: JSON.stringify({
          globalContext: "Temática heroes de Marvel, ataque entre 1 y 80, defensa entre 1 y 80, vida entre 250 y 500. Debe tener una descripción sobre el personaje ",
          cardPrompt: cardPrompt
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setCartaGenerada(data);
        onCartaGenerada(data);
      } else {
        setError(data.message || "La IA está descansando, intenta de nuevo.");
      }
    } catch (err) {
      setError("Error de conexión con el Nexo de IA.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        <div className="space-y-6 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="text-purple-400" size={24} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Generar Carta 
              </h2>
            </div>
            <p className="text-slate-400 text-sm italic">
              Escribe una descripción y deja que la IA genere un nuevo Heroe...
            </p>
          </div>

          <div className="relative group">
            <textarea
              className="w-full bg-slate-950/80 border-2 border-slate-800 p-4 rounded-2xl text-base min-h-[150px] focus:border-purple-500 outline-none transition-all group-hover:border-slate-700 shadow-inner"
              placeholder="Ej: Un guerrero estelar con armadura de vibranium y poderes de fuego azul..."
              value={cardPrompt}
              onChange={(e) => setCardPrompt(e.target.value)}
            />
          </div>

          <button 
            onClick={generarCarta}
            disabled={cargando || !cardPrompt}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-500 
              ${cargando 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] active:scale-95'
              }`}
          >
            {cargando ? (
              <> <Zap className="animate-spin" size={20} /> Forjando Carta... </>
            ) : (
              <> <Wand2 size={20} /> Invocar Héroe </>
            )}
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-xs text-center animate-bounce">
              {error}
            </div>
          )}

          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 mx-auto text-slate-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Volver al Mazo Principal
          </button>
        </div>

        <div className="flex justify-center items-center">
          {cartaGenerada ? (
            <div className="w-[320px] bg-slate-900 rounded-[2.5rem] p-3 border-4 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.4)] animate-in fade-in zoom-in duration-700">
              <div className="relative h-[420px] w-full rounded-[2rem] overflow-hidden border-2 border-slate-800">
                <img 
                  src={cartaGenerada.pictureUrl} 
                  alt={cartaGenerada.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-6 text-center">
                  <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1">
                    {cartaGenerada.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 leading-tight line-clamp-2 italic">
                    "{cartaGenerada.description}"
                  </p>
                  
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="flex flex-col items-center p-1 bg-red-500/20 rounded-lg border border-red-500/30">
                      <Sword size={14} className="text-red-400" />
                      <span className="text-[10px] font-bold text-red-100">{cartaGenerada.attack}</span>
                    </div>
                    <div className="flex flex-col items-center p-1 bg-blue-500/20 rounded-lg border border-blue-500/30">
                      <Shield size={14} className="text-blue-400" />
                      <span className="text-[10px] font-bold text-blue-100">{cartaGenerada.defense}</span>
                    </div>
                    <div className="flex flex-col items-center p-1 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
                      <Heart size={14} className="text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-100">{cartaGenerada.lifePoints}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
           
            <div className="w-[320px] h-[480px] border-4 border-dashed border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-700 p-8 text-center space-y-4">
              <div className={`p-6 rounded-full bg-slate-900 ${cargando ? 'animate-pulse ring-4 ring-purple-500/20' : ''}`}>
                <Zap size={48} className={cargando ? 'text-purple-500' : 'text-slate-800'} />
              </div>
              <p className="text-sm font-bold uppercase tracking-widest">
                Esperando descripción...
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}