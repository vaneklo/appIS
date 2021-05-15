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
      </Switch>

      <Footer />

    </Router>

  );
}

export default App;