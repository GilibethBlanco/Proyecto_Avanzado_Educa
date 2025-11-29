import Carta from "../Componentes/Carta"
 import { useState } from "react";

import VistaDetallada from "./VistaDetallada";

export default function VistaMazo() {
  const [cartaSeleccionada, setCartaSeleccionada] = useState<any>(null);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">

    <Carta
    numero={1}
    nombre="Capitán América"
    imagen="https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg"
    ataque={80}
    defensa={90}
    vida={100}
    onSeleccionar={setCartaSeleccionada}
   />

   <Carta
   numero={2}
   nombre="Iron Man"
   imagen="https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg"
   ataque={80}
   defensa={90}
   vida={100}
   onSeleccionar={setCartaSeleccionada}
  />



  <Carta
   numero={3}
   nombre="Black Widow"
   imagen="https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg"
   ataque={80}
   defensa={90}
   vida={100}
   onSeleccionar={setCartaSeleccionada}
  />

 <Carta
   numero={4}
   nombre="Bruja Escarlata"
   imagen="https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg"
   ataque={80}
   defensa={90}
   vida={100}
   onSeleccionar={setCartaSeleccionada}
  />
      
  <Carta
   numero={5}
   nombre="Spider-Man"
   imagen="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2025%2F02%2F24%2Ftom-holland-spider-man-4-receives-delayed-release-july-2026-date-001.jpg?q=75&w=800&cbr=1&fit=max.jpg"
   ataque={80}
   defensa={90}
   vida={100}
   onSeleccionar={setCartaSeleccionada}
  />
      


    </div>

      {cartaSeleccionada && (
        <VistaDetallada
          carta={cartaSeleccionada}
          onCerrar={() => setCartaSeleccionada(null)}
        />
      )}
    </div>
  );
}
