import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
}from 'react-router-dom';
import IconLabelButtons from './componentes/IconLabelButtons';
import BasicTextFields from './componentes/BasicTextFields';
import Autocompletado from './componentes/Autocompletado';
function App() {
  return (
    <Router>
      <div className="App">
        <h1>ComeCon</h1>
        <div>
          <Link to="/login">
            login
          </Link>
          <Link to="/registrar">
            registrar
          </Link>
        </div>
        <Switch>
        <Router path="/">
          <Autocompletado /> 
          {/* <BasicTextFields/>
          <IconLabelButtons/> */}
          </Router>
          <Router path="/login">
            login
          </Router>
          <Router path="/registrarse">
            Registrar
          </Router>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
