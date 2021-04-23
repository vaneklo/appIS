import React, { useState } from 'react';

import firebase from 'firebase';

import Input from '@material-ui/core/Input';

import { db } from './firebase';
import TableroDeIngredientes from './TableroDeIngredientes';

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
      };
    //valores iniciales de la imagen es null                     
   const [image, setImage] = useState(null);
    //valores iniciales de los campos de texto
    const [values, setValues] = useState(initialStateValues);
  
  
    //metodos para las imagenes
    const cambioImagen = e => {if (e.target.files[0]) {setImage(e.target.files[0]);}};
   //metodo para actualizar imagenes
     const actualizacionImagen = () => {
    const storageRef=firebase.storage().ref(`images/${image.name}`).put(image);
      alert("imagen subida con exito");                   
     };

    const agregarReceta= async ()=>{
      //comunicacion con la base de datos
      //con la coleccion receta.doc para id unico
      //link object los valores
     await  db.collection('receta').doc().set(values);
    }

    // -------//const agregarIngredientesReceta= async (linkObject)=>{
    ///----------- //await  db.collection('ingrediente-receta').doc().set(linkObject);}
    
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


    //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
      const handleSubmit = e =>{
      if(!validarNombreReceta(values.camponombre)){alert("nombre no valido");}  
      else{if(!validarDescripcionReceta(values.campodescripcion)){alert("descripcion no valida");}  
           else{if(!validarComplejidadReceta(values.campocomplejidad)){alert("la complejidad solo se mide con numeros");}
                  else{
                      if(image===null){alert("debe agregar una imagen");}
                      else{ e.preventDefault();
                             console.log(values)
                             agregarReceta(values);  
                             //agregarIngredientesReceta()  ;           
                             actualizacionImagen();
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
      <TableroDeIngredientes />
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