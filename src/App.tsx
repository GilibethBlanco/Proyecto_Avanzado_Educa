import './App.css';
import Carta from './Componentes/Carta';

function App() {
  return (
   <div>
    <Carta 
    numero={1}
    ataque={222}
    nombre="malefica" 
    defensa={100} 
    descripcion="villana de Disney"
    imagen="https://m.media-amazon.com/images/M/MV5BMjAwOTk2MGItZTlmYS00Yzk5LTgyNTYtMjkxY2FkZWI1NzcxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" 
    tipo= "magico"
    />
   </div>
  );
}

export default App;

