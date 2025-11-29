import './App.css';
import VistaMazo from './Pantallas/VistaMazo';
function App() {

  return (

   <div className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
   <header className="mb-10 border-b border-slate-700 pb-4">
     <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-t from-yellow-400 to-orange-500 uppercase tracking-widest">
     Mi Mazo
     </h1>
     <p className="text-slate-400 mt-1">
     Héroes de Marvel.
     </p>
     </header>
     <VistaMazo/>
     </div>

  );

} 

export default App;


