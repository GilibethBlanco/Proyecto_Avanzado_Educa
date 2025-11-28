import Carta from "../Componentes/Carta"

function VistaMazo() {
  return (
   <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">

    <Carta 
    numero={1}
    nombre="Capitan America" 
    imagen="https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg"  
    />

    <Carta 
    numero={2}
    nombre="Iron Man" 
    imagen="https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg" 
    />

    <Carta 
    numero={3}
    nombre="Black Widow"  
    imagen="https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg" 
    />

    <Carta 
    numero={4}
    nombre="Bruja Escarlata" 
    imagen="https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg" 
    />

     <Carta 
    numero={4}
    nombre="Spider-man" 
    imagen="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XnPOrguRalHjABq0zmTSm34Zj4D9O5f1c_DxrNiYXQ0AHepjg9tt9APt6efypbjOC00&usqp=CAU.jpg" 
    />
   </div>

  );
}

export default VistaMazo