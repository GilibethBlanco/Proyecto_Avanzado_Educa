import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import VistaMazo from './Pantallas/VistaMazo';
import VistaCrearCarta from './Pantallas/VistaCrearCarta';
import VistaDetallada from './Pantallas/VistaDetallada';
import VistaEditar from './VistaEditar';
import type { CartaTipo } from './Componentes/CartaTipo';

const API_URL = 'https://educapi-v2.onrender.com/card';
const API_HEADERS = {
  usersecretpasskey: 'Gili394131CO',
  'Content-Type': 'application/json',
};

function App() {
  const [cartas, setCartas] = useState<CartaTipo[]>([
     {
      idCard: 1,
      name: 'Capitán América',
      description: 'Super soldado con escudo indestructible',
      pictureUrl:
        'https://cuadrosyretablos.com/wp-content/uploads/2022/08/cuadro-decorativo-universo-marvel-capitan-america.jpg',
      attack: 80,
      defense: 80,
      lifePoints: 90,
    },
     
  ]);

  const normalizarCartaAPI = (item: any): CartaTipo => ({
    idCard: item.idCard,
    name: item.name,
    description: item.description || item.description || '',
    pictureUrl: item.pictureUrl,
    attack: item.attack,
    defense: item.defense,
    lifePoints: item.lifePoints,
  });

  const getCartas = async () => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'GET',
        headers: API_HEADERS,
      });
      if (!respuesta.ok) {
        throw new Error(`GET /card failed ${respuesta.status}`);
      }
      const objeto = await respuesta.json();
      const apiCartas = Array.isArray(objeto.data) ? objeto.data : [];
      const cartasMapeadas = apiCartas.map(normalizarCartaAPI);
      const cartasOrdenadas = cartasMapeadas.sort((a: CartaTipo, b: CartaTipo) => a.idCard - b.idCard);
      setCartas(cartasOrdenadas);

    return;
    } catch (error) {
      console.error('Error cargando cartas:', error);
    }
   };
 
  useEffect(() => {
    getCartas();
  }, []);


  const handleCrear = async (nuevaCarta: Omit<CartaTipo, 'idCard'>) => {
    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          name: nuevaCarta.name,
          description: nuevaCarta.description,
          attack: nuevaCarta.attack,
          defense: nuevaCarta.defense,
          lifePoints: nuevaCarta.lifePoints,
          pictureUrl: nuevaCarta.pictureUrl,
          attributes: {},
        }),
      });

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        throw new Error(`POST /card failed: ${respuesta.status} ${errorText}`);
      }

      const creado = await respuesta.json();
      const cartaAPI = normalizarCartaAPI(creado);
      setCartas((prevCartas) => [...prevCartas, cartaAPI]);
    } catch (error) {
      console.error('Error creando carta:', error);
      window.alert('No se pudo crear la carta en el servidor (ver consola).');
    }
  };

  const handleEliminar = async (idCard: number) => {
    try {
      const respuesta = await fetch(`${API_URL}/${idCard}`, {
        method: 'DELETE',
        headers: {
  usersecretpasskey: 'Gili394131CO',
}
      });

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        throw new Error(`DELETE /card/${idCard} failed: ${respuesta.status} ${errorText}`);
      }

      setCartas((prevCartas) => prevCartas.filter((c) => c.idCard !== idCard));
    } catch (error) {
      console.error('Error eliminando carta:', error);
      window.alert('No se pudo eliminar la carta en el servidor (ver consola).');
    }
  };

  const handleEditar = async (idCard: number, cartaEditada: Omit<CartaTipo, 'idCard'>) => {
    try {
      const respuesta = await fetch(`${API_URL}/${idCard}`, {
        method: 'PATCH',
        headers: API_HEADERS,
        body: JSON.stringify({
          name: cartaEditada.name,
          description: cartaEditada.description,
          attack: cartaEditada.attack,
          defense: cartaEditada.defense,
          lifePoints: cartaEditada.lifePoints,
          pictureUrl: cartaEditada.pictureUrl,
        }),
      });

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        throw new Error(`PATCH /card/${idCard} failed: ${respuesta.status} ${errorText}`);
      }

      await respuesta.json();
      // si es necesario, usar datos del servidor, aquí está la llamada, pero artefactos de UI actuales ya actualizan localmente.

      setCartas((prevCartas) =>
        prevCartas.map((carta) =>
          carta.idCard === idCard ? { ...carta, ...cartaEditada } : carta
        )
      );
    } catch (error) {
      console.error('Error editando carta:', error);
      window.alert('No se pudo editar la carta en el servidor (ver consola).');
    }
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
          <Route
            path="/editar/:id"
            element={<VistaEditar cartas={cartas} onEditar={handleEditar} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;


