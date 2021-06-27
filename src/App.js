import './App.css';

import { useContext } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import ProtectedRoute from './auth/protected-route';
import Autocompletado from './componentes/Autocompletado';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import SeccionFormulario from './formularioRegistro/SeccionFormulario';
import {
  useUsuario,
  UsuarioProvider,
} from './UserContext';
import Profile from './views/profile';
import RecetasFavoritas from './componentes/recetasFavoritas';

function App() {

return (
  <UsuarioProvider> 
    <Router>
      <Header/>

      <Footer />
  </Router>
   
  </UsuarioProvider> 
  );
}

export default App;