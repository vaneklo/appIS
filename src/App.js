import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from 'react-router-dom';
import Autocompletado from './componentes/Autocompletado';
import SeccionFormulario from './formularioRegistro/SeccionFormulario';
function App() {
  return (
    <Router>
      <ul className="nav-container s-border s-main-center s-pl-0">
        <li className="nav-container--item s-mr-2">
            <Link to="/">Inicio</Link>
        </li>
        <li className="nav-container--item s-mr-2">
            <Link to="/registrar">Recetas</Link>
        </li>
      </ul>
      <Route exact path="/" component={Autocompletado}/>
      <Route exact path="/registrar" component={SeccionFormulario}/>
    </Router>
    
  );
}

export default App;
