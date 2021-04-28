import './App.css';
import Header from './componentes/Header'
import Image from 'material-ui-image'
import { Typography } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Autocompletado from './componentes/Autocompletado';
import SeccionFormulario from './formularioRegistro/SeccionFormulario';
import Footer from './componentes/Footer';
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
