import { useState } from "react";
import Carta from "../Componentes/Carta";
import VistaDetallada from "./VistaDetallada";
import VistaCrearCarta from "./VistaCrearCarta";
import type { CartaTipo } from "../Componentes/CartaTipo";
import { Plus } from "lucide-react";

export default function VistaMazo() {
  const [cartas, setCartas] = useState<CartaTipo[]>([
    {
      idCard: 1,
      name: "Capitán América",
      descritption: "Super soldado con escudo indestructible",
      pictureUrl: "https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg",
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
    {
      idCard: 2,
      name: "Iron Man",
      descritption: "Genio millonario con armadura tecnológica",
      pictureUrl: "https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg",
      attack: 85,
      defense: 90,
      lifePoints: 85,
    },
    {
      idCard: 3,
      name: "Black Widow",
      descritption: "Espía maestra",
      pictureUrl: "https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg",
      attack: 85,
      defense: 90,
      lifePoints: 85,
    },
    {
      idCard: 4,
      name: "Bruja Escarlata",
      descritption: "Mutante con habilidades para manipular la energía",
      pictureUrl: "https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg",
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
    {
      idCard: 5,
      name: "Spider-Man",
      descritption: "Adolescente mordido por una araña",
      pictureUrl: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2025%2F02%2F24%2Ftom-holland-spider-man-4-receives-delayed-release-july-2026-date-001.jpg?q=75&w=800&cbr=1&fit=max.jpg",
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
  ]);
  const [cartaSeleccionada, setCartaSeleccionada] = useState<CartaTipo | null>(null);
  const [crear, setCrear] = useState(false);

  const handleCrear = (nuevaCarta: CartaTipo) => {
    setCartas((prevCartas) => [...prevCartas, nuevaCarta]);
  };

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
        {cartas.map((carta) => (
          <Carta key={carta.idCard} carta={carta} onSeleccionar={setCartaSeleccionada} />
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
          onCrear={handleCrear}
          cartas={cartas} 
        />
      )}
    </div>
  );
}
    
