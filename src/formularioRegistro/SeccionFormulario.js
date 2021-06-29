import './SeccionFormulario.css';
import FormularioRecetas from './formularioRecetas'
import {db} from './firebase'
import { propTypes } from 'react-bootstrap/esm/Image';
function SeccionFormulario(props) {
  
  return (
    <div className="container p-4">
      <div className="row">
      <FormularioRecetas rol={props.rol}  />
      </div>
    </div>
  );
}

export default SeccionFormulario;