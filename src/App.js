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

function App() {
  return (
    
    <Router>

      <Header />
  
<Switch>
        <Route exact path="/">
          <Autocompletado />
        </Route>
        <Route path="/registrar">
          <SeccionFormulario />
        </Route>
        <Route path="/usuario">
          <FormRegUsr />
        </Route>
        <Route path="/admin">
          <FormRegistro />
        </Route>
      </Switch>

      <Footer />

    </Router>

  );
}

export default App;