import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { BrowserRouter, Route, Routes } from 'react-router';
import VistaMazo from './Pantallas/VistaMazo.tsx';

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VistaMazo />} />
      </Routes>
    </BrowserRouter>
 
)
