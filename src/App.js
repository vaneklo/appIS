import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Switch,
} from 'react-router-dom';

import BasicTextFields from './componentes/BasicTextFields';
import IconLabelButtons from './componentes/IconLabelButtons';

//import TagButton from './componentes/TagButton';

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
          <BasicTextFields/>
          
          <IconLabelButtons/>
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
