import './SeccionFormulario.css';
import FormularioRecetas from './formularioRecetas'
import {db} from './firebase'
function SeccionFormulario() {
  
    const agregarReceta= async (linkObject)=>{
      //comunicacion con la base de datos
      //con la coleccion receta.doc para id unico
      //link object los valores
     await  db.collection('receta').doc().set(linkObject);
     console.log("nuevo agregado");
    }

  return (
    <div className="container p-4">
      <div className="row">
      <FormularioRecetas  agregarReceta={agregarReceta}/>
      </div>
    </div>
  );
}

export default SeccionFormulario;