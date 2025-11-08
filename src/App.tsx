import './App.css';
import Carta from './Componentes/Carta';

function App() {
  return (
   <div>
    <Carta numero={1}/>
    <Carta numero={2}/>
    <Carta numero={3}/>
    <Carta numero={"k"}/>
    <Carta numero={"j"}/>
    <Carta numero={"q"}/>
   </div>
  );
}

export default App;
