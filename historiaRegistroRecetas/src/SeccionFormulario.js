import './SeccionFormulario.css';
import FormularioRecetas from './formularioRecetas'
import {db} from './firebase'
function SeccionFormulario() {
  


  return (
    <div className="container p-4">
      <div className="row">
      <FormularioRecetas  />
      </div>
    </div>
  );
}

export default SeccionFormulario;