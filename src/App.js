import './App.css';
import Header from './componentes/Header'
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
      <Typography variant="h2" component="h3" gutterBottom style={{ textAlign: 'center' }}>
        ComeCon
      </Typography>

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
