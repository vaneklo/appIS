import React, { useState } from 'react';
import firebase from 'firebase';
import Input from '@material-ui/core/Input';
import { db } from './firebase';
import TableroDeIngredientes from './TableroDeIngredientes';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {IngredientCreator} from './IngredientCreator';

const FormularioRecetas=()=>{
    //valores iniciales de los campos nombre desripcion y complejidad
    const initialStateValues = {
        camponombre: '',
        campodescripcion: '' , 
        campocomplejidad: '',
        campoCalorias:'',
        campoGrasas:'',
        campoCarbohidratos:'',
        campoProteinas:'',
        urlImagen:''
      };
    //valores iniciales de los campos de texto
    const [values, setValues] = useState(initialStateValues);
   //los valores iniciales de la tabla de ingredientes,la tabla estara vacia
   const[recipeItems, setRecipeItems] = useState([]);
    //valores iniciales de la imagen es null                     
    const [image, setImage] = useState(null);

    //metodos para las imagenes
   // const cambioImagen = e => {if (e.target.files[0]) {setImage(e.target.files[0]);}};
   const cambioImagen = e => {if (validarImagen(e)) {setImage(e.target.files[0]);}
  else{alert('formato de imagen no valido');}
  
  
  };
    function validarImagen(e) {
    //console.log(imagen.name);
    var imagen = e.target.files[0];
    return true;
    }

   //metodo para subir imagenes a la base de datos falta como recuperar la url
    const subirImagen = () => {
    const storageRef=firebase.storage().ref(`images/${image.name}`).put(image);
    //setValues({...values,[name]:value}
    //values.urlImagen=storageRef.snapshot.downloadURL;
    console.log(storageRef.snapshot.getDownloadURL);
    alert("imagen subida con exito");                   
     };

     
    const agregarReceta=()=>{
    //comunicacion con la base de datos con la coleccion receta.doc,para id unico
    //primero agrego la tabla de  ingredientes y debajo los cdatos de complejidad,etc
      recipeItems.map((recipeItem)=>{
      db.collection('ingrediente-receta').doc().set({nombreReceta:values.camponombre,cantidad:recipeItem.cantidad,unidades:recipeItem.unidades ,name:recipeItem.name}); 
    })
    db.collection('receta').doc().set(values);
  }
    

    //validacion de los campos de texto
    const validarNombreReceta = (str) => {
        var pattern = new RegExp("^.*[a-zA-Z]+.*$");
        return !!pattern.test(str);
      };
      const validarDescripcionReceta = (str) => {
        var pattern = new RegExp("^.*[a-zA-Z]+.*$");
        return !!pattern.test(str);
      };

      const validarComplejidadReceta = (str) => {
        var pattern = new RegExp("^[1-9][0-9]*$");
        return !!pattern.test(str);
      };
 
     //crear las filas de la tabla de ingredientes
    //hago un recorrido de las filas de los datos y las muestro en pantalla
    //se actualiza frecuentemente
         const recipeTableRows=()=>
         recipeItems.map(recipe=>(
         <tr key={recipe.name}>
         <td>{recipe.cantidad}</td>
         <td>{recipe.unidades}</td>
         <td>{recipe.name}</td>
         <td><button onClick={(e)=>deleteIngredient(e,recipe)} >eliminar</button> </td>
         </tr>
         ))
          
        //crear nuevo ingrediente en la tabla
        const createNewIngredient = (cantidad,unidades,ingredientName) => {
       //si la el ingrediente esta dentro de la lista ya no se agregara
        if (!recipeItems.find(i=>i.name === ingredientName)) {
           setRecipeItems([...recipeItems, {cantidad:cantidad,unidades:unidades,name: ingredientName}]);
          console.log(recipeItems);
          }
         else{alert('coincidencia encontrada el la lista de items')}};
   
       const deleteIngredient=(e,recipeItem)=>{
         e.preventDefault();
          console.log('antes'+recipeItems);
          var contador=0;
          var lista=recipeItems;
          console.log(lista);
           lista.map((ingrediente)=>{
             if(recipeItem.name==ingrediente.name)
             {recipeItems.splice(contador,1);
             }
           contador++;
           });
        //setRecipeItems(lista);
       // recipeTableRows();
      console.log('despues'+recipeItems)
       }
    //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
      const handleSubmit = e =>{
      if(!validarNombreReceta(values.camponombre)){alert("nombre no valido");}  
      else{if(!validarDescripcionReceta(values.campodescripcion)){alert("descripcion no valida");}  
           else{if(!validarComplejidadReceta(values.campocomplejidad)){alert("la complejidad solo se mide con numeros");}
                  else{
                      if(image===null){alert("debe agregar una imagen");}
                      else{ e.preventDefault();
                             console.log(values);
                             agregarReceta(values);  

                              /// agregarIngredientesReceta(recipeItems)  ;           
                             subirImagen();
                             
                            } 
                    }
               }
           }
     };
    //veo cada vez que un campo de ingreso de texto cambie
    //name es el input
    //value es el valor del input
    const handleInputChange= (e) =>{
     const{name,value}=e.target;
      setValues({...values,[name]:value})
      
     };

return(
<form   className='card card-body'>
    <h1>Registro de recetas</h1>
    <div className="form-group input-group">
        Nombre de la Receta:
        <Input placeholder="Placeholder"
        inputProps={{ 'aria-label': 'description' }} 
        className='form-control' 
        placeholder='Introduzca nombre la receta'
        name='camponombre'
        onChange={handleInputChange}
        />
    </div>
    <div>Foto de la Receta:</div>
    <div className="form-group input-group">
         <br/>
         <input type="file" onChange={cambioImagen} />
      
         <br/>
     </div>
     <div>Ingredientes:</div>
    <div>
    <div>   
        <IngredientCreator agregarIngrediente={createNewIngredient}/>
            <TableContainer component={Paper}>        
              <Table className="class.table" size="small"  aria-label="customized table">
                <TableHead>
                  <TableRow>
                  <TableCell >cantidad</TableCell>
                  <TableCell >unidades</TableCell>
                  <TableCell >Nombre del Ingrediente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{recipeTableRows()}</TableBody>
              </Table>
            </TableContainer>
        </div>
    </div>

    <br></br>
    Pasos de elaboracion:
    <div className="form-group">
         <textarea name="campodescripcion"  
         cols="30" 
         rows="10" 
         className="form-control"
         placeholder="Introduzca los pasos"
         onChange={handleInputChange}
         >
         </textarea>
    </div>
    <div className="form-group input-group">
    <Input placeholder="Placeholder" 
    inputProps={{ 'aria-label': 'description' }} 
    className='form-control' 
         placeholder='Complejidad'
         name='campocomplejidad'
         onChange={handleInputChange}
    />
         
    </div>
    <div>
    <Input
    inputProps={{ 'aria-label': 'description' }} 
    className='form-control' 
         placeholder='Calorias'
         name='campoCalorias'
         onChange={handleInputChange}
    />
    <div>
    <Input 
    inputProps={{ 'aria-label': 'description' }} 
    className='form-control' 
         placeholder='Grasas Saturadas'
         name='campoGrasas'
         onChange={handleInputChange}
    />
    </div>
    <div>
    <Input 
    inputProps={{ 'aria-label': 'description' }} 
    className='form-control' 
         placeholder='Carbohidratos'
         name='campoCarbohidratos'
         onChange={handleInputChange}
    />
    </div>
    
    
    
    
    </div>

    <div>
        <button className="btn btn-primary btn-block" onClick={handleSubmit} 
        >Registrar Receta</button>
    </div>
</form>
)

};
export default FormularioRecetas;