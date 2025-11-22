import Carta from "../Componentes/Carta"

function VistaMazo() {
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

    <Carta 
    numero={2}
    ataque={100}
    nombre="Ursula" 
    defensa={50} 
    descripcion="villana de Disney"
    imagen="https://i.pinimg.com/236x/33/46/05/3346051aa0fafdfe43e21e868860178f.jpg" 
    tipo= "magico"
    />

    <Carta 
    numero={3}
    ataque={100}
    nombre="Scar" 
    defensa={40} 
    descripcion="villano de Disney"
    imagen="https://static.wikia.nocookie.net/disney/images/c/c7/Scar.png" 
    tipo= "cazador"
    />
   </div>
  );
}

export default VistaMazo