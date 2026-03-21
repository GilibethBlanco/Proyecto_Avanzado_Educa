import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import VistaMazo from './Pantallas/VistaMazo';
import VistaCrearCarta from './Pantallas/VistaCrearCarta';
import VistaDetallada from './Pantallas/VistaDetallada';
import type { CartaTipo } from './Componentes/CartaTipo';

function App() {
  const [cartas, setCartas] = useState<CartaTipo[]>([
    {
      idCard: 1,
      name: 'Capitán América',
      descritption: 'Super soldado con escudo indestructible',
      pictureUrl:
        'https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg',
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
    {
      idCard: 2,
      name: 'Iron Man',
      descritption: 'Genio millonario con armadura tecnológica',
      pictureUrl:
        'https://i.pinimg.com/736x/1f/19/0b/1f190b0e9b4f44cf99777ea25c48a159.jpg',
      attack: 85,
      defense: 90,
      lifePoints: 85,
    },
    {
      idCard: 3,
      name: 'Black Widow',
      descritption: 'Espía maestra',
      pictureUrl:
        'https://4kwallpapers.com/images/wallpapers/black-widow-scarlett-johansson-black-background-2020-movies-2560x2560-2705.jpg',
      attack: 85,
      defense: 90,
      lifePoints: 85,
    },
    {
      idCard: 4,
      name: 'Bruja Escarlata',
      descritption: 'Mutante con habilidades para manipular la energía',
      pictureUrl:
        'https://www.smashmexico.com.mx/wp-content/uploads/2020/11/Avengers-Bruja-Escarlata-Scarlet-Witch-Historia-de-Marvel-poster.jpg',
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
    {
      idCard: 5,
      name: 'Spider-Man',
      descritption: 'Adolescente mordido por una araña',
      pictureUrl:
        'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2025%2F02%2F24%2Ftom-holland-spider-man-4-receives-delayed-release-july-2026-date-001.jpg?q=75&w=800&cbr=1&fit=max.jpg',
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
  ]);

  const handleCrear = (nuevaCarta: Omit<CartaTipo, 'idCard'>) => {
    setCartas((prevCartas) => {
      const maxId = prevCartas.reduce((max, carta) => Math.max(max, carta.idCard), 0);
      const nextId = maxId + 1;

      return [...prevCartas, { idCard: nextId, ...nuevaCarta }];
    });
  };

  const handleEliminar = (idCard: number) => {
    setCartas((prevCartas) => prevCartas.filter((c) => c.idCard !== idCard));
  };

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

        <Routes>
          <Route path="/" element={<VistaMazo cartas={cartas} onEliminar={handleEliminar} />} />
          <Route path="/crear" element={<VistaCrearCarta onCrear={handleCrear} />} />
          <Route
            path="/carta/:id"
            element={<VistaDetallada cartas={cartas} onEliminar={handleEliminar} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;


