import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Autocompletado from './componentes/Autocompletado';
import Footer from './componentes/Footer';
import Header from './componentes/Header';
import SeccionFormulario from './formularioRegistro/SeccionFormulario';
import FormRegistro from './registroUsuarios/FormRegistro';
import FormRegUsr from './registroUsuarios/FormRegUsr';
import { useUsuario, UsuarioProvider } from './UserContext';
import FormularioLoginUsuario from './registroUsuarios/loginUsuarios';
import { useContext } from 'react';
function App() {
      const UserContext=useContext(useUsuario);  
return (
  <UsuarioProvider> 
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
            <Autocompletado />
        </Route>
          <Route path="/registrar" >
             <SeccionFormulario />
        </Route>
        <Route path="/usuario">
          <FormRegUsr />
        </Route>
           <Route path="/admin">
             <FormularioLoginUsuario/>
        </Route>
      </Switch>
      <Footer />
  </Router>
  </UsuarioProvider> 
  );
}

export default App;