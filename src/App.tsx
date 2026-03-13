import './App.css';
import VistaMazo from './Pantallas/VistaMazo';

function App() {
  return (
    <div
      className="min-h-screen text-slate-100 p-6 font-sans relative bg-[url('https://i.pinimg.com/1200x/5a/06/8f/5a068fa5047342db8018d23dea9b71a5.jpg')] bg-cover bg-center bg-fixed"
    >

      <div className="absolute inset-0 bg-slate-900/40 z-0"></div> 

      <div className="relative z-10"> 
        <header className="mb-10 border-b border-white pb-4">

          <img 
            src="https://logos-world.net/wp-content/uploads/2020/11/Marvel-Logo-2000-2012.png" 
            alt="Logo Marvel" 
            className="h-30 mb-2 object-contain justify-center mx-auto" 
          />
          
        </header>
        <VistaMazo/>
      </div>
    </div>
  );
}

export default App;


