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
import Contexto from './contexto/contexto';
import RecetasFavoritas from './componentes/recetasFavoritas';

function App() {

    const{estadoBotonRegistrarRecetas,
         estadoBotonVerRecetasFavoritas}=useContext(Contexto)
return (
  <UsuarioProvider> 
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
            <Autocompletado />
            

        </Route>
        
          <Route  path="/registrar" >
             <SeccionFormulario />

        </Route>

        <Route  path="/recetasFavoritas" >
             
        </Route>

        <ProtectedRoute path="/authnav" >
             <Profile />
        </ProtectedRoute>
      </Switch>
      <Footer />
  </Router>
   

  
  </UsuarioProvider> 
  );
}

export default App;