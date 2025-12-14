import { useState } from "react";
import Carta from "../Componentes/Carta";
import VistaDetallada from "./VistaDetallada";
import VistaCrearCarta from "./VistaCrearCarta";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Plus} from "lucide-react";


export default function VistaMazo() {
  const [cartas, setCartas] = useState<CartaTipo[]>([
     {
    numero: 1,
    nombre: "Capitán América",
    descripcion: "Super soldado con escudo indestructible",
    imagen: "https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg",
    ataque: 80,
    defensa: 80,
    vida: 90,
  },
  {
    numero: 2,
    nombre: "Iron Man",
    descripcion: "Genio millonario con armadura tecnológica",
    imagen:"https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg ",
    ataque: 85,
    defensa: 90,
    vida: 85,
  },
  {
    numero: 3,
    nombre: "Black Widow",
    descripcion: "Espia maestra",
    imagen:"https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg",
    ataque: 85,
    defensa: 90,
    vida: 85,
  },
{
    numero: 4,
    nombre: "Bruja Escarlata",
    descripcion: "Mutante con habilidades para manipular la energia",
    imagen:"https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg" ,
    ataque: 80,
    defensa: 80,
    vida: 90,
  },
  {
    numero: 5,
    nombre: "Spider-Man",
    descripcion: "Adolecente mordido por una araña",
    imagen: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2025%2F02%2F24%2Ftom-holland-spider-man-4-receives-delayed-release-july-2026-date-001.jpg?q=75&w=800&cbr=1&fit=max.jpg",
    ataque: 80,
    defensa: 80,
    vida: 90,
  },
  
  ]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState<CartaTipo | null>(null);
  const [crear, setCrear] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl">Cartas</h1>

        <button
          onClick={() => setCrear(true)}
          className="bg-green-600 text-white w-10 h-10 rounded-full text-xl"
        >
          <Plus size={24} className="m-auto" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {cartas.map(carta => (
          <Carta
            key={carta.numero}
            carta={carta}
            onSeleccionar={setCartaSeleccionada}
          />
        ))}
      </div>

      {cartaSeleccionada && (
        <VistaDetallada
          carta={cartaSeleccionada}
          onCerrar={() => setCartaSeleccionada(null)}
        />
      )}

      {crear && (
        <VistaCrearCarta
          onCerrar={() => setCrear(false)}
          onCrear={(nuevaCarta) => {
            setCartas([...cartas, nuevaCarta]);
            setCrear(false);
          }}
        />
      )}
    </div>
  );
}
    
