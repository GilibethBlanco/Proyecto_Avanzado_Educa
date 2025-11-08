import './App.css';
import Carta from './Componentes/Carta';

function App() {
  return (
   <div>
    <Carta numero={1}/>
    <Carta numero={2}/>
    <Carta numero={3}/>
    <Carta numero={"K"}/>
    <Carta numero={"J"}/>
    <Carta numero={"Q"}/>
   </div>
  );
}

export default App;
