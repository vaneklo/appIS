import React, {
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase';

import {
  Button,
  Container,
  TextField,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { db } from './firebase';
import { IngredientCreator } from './IngredientCreator';

const useStyles = makeStyles((theme) => ({
  formulario: {
    border: '1px solid gray',
    padding: '10px',
    borderRadius: '10px'
  }
}));

<<<<<<< HEAD
=======


  
  

>>>>>>> 599334078b586641f7190042aac74fb9e3d7d7a2
const FormularioRecetas = () => {
  const classes = useStyles();

  const[listaNombresRegistrados,setListaNombresRegistrados]=useState([]);
  useEffect(()=>{getNombre()}, [])
  
  
  const getNombre=async()=>{
    
    let obj;
    let lista=[]
    const querySnapshot=await db.collection("receta").get();
    querySnapshot.forEach((doc)=>{obj=doc.data()
    obj.id=doc.id
    lista.push(obj)
    });
    setListaNombresRegistrados(lista)
    console.log(lista[0].camponombre);
    
    }
  const validarNombre=(nombre)=>{
    var bandera = true;
    var contador = 0;
    
    listaNombresRegistrados.map((receta)=>{ if(receta.camponombre==nombre) {console.log(receta.camponombre); 
    bandera=false; console.log("Error encontrado."); } contador++; });
      return bandera;
      console.log(bandera);
  }
  //valores iniciales de los campos nombre desripcion y complejidad
  const initialStateValues = {
    camponombre:window.localStorage.getItem('camponombre'),
    campodescripcion: window.localStorage.getItem('campodescripcion') , 
    campocomplejidad: window.localStorage.getItem('campocomplejidad'),
    campoCalorias:window.localStorage.getItem('campoCalorias'),
    campoGrasas:window.localStorage.getItem('campoGrasas'),
    campoCarbohidratos:window.localStorage.getItem('campoCarbohidratos'),
    campoProteinas:window.localStorage.getItem('campoProteinas')
  };
  //valores iniciales de la imagen es null                     
  const [image, setImage] = useState(null);
  //valores iniciales de los campos de texto
  const [values, setValues] = useState(initialStateValues);

  //metodos para las imagenes
  const cambioImagen = e => { 
    if(1>2){
      if (e.target.files[0].size<200000) {
        setImage(e.target.files[0]);         
      } else{alert("el archivo es muy grande");}
    
    }    
  };
  //metodo para actualizar imagenes
  const actualizacionImagen = () => {
    const storageRef = firebase.storage().ref(`images/${image.name}`).put(image);
    alert("imagen subida con exito");
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
<<<<<<< HEAD
    alert("imagen subida con exito");                   
  };
=======
    alert("Registro exitoso");                   
     };
>>>>>>> 599334078b586641f7190042aac74fb9e3d7d7a2

     
     const agregarReceta=()=>{
      //comunicacion con la base de datos con la coleccion receta.doc,para id unico
      //primero agrego la tabla de  ingredientes y debajo los cdatos de complejidad,etc
        if(recipeItems!=null){
         recipeItems.map((recipeItem)=>{
        db.collection('ingrediente-receta').doc().set({nombreReceta:values.camponombre,cantidad:recipeItem.cantidad,unidades:recipeItem.unidades ,name:recipeItem.name}); 
         })
        }
         db.collection('receta').doc().set(values);
<<<<<<< HEAD
      };
=======
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
    
>>>>>>> 599334078b586641f7190042aac74fb9e3d7d7a2

  //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
  const handleSubmit = e => {
    if (!validarNombreReceta(values.camponombre)) { alert("Ingrese un nombre válido para la receta"); }
    else {
      if (!validarDescripcionReceta(values.campodescripcion)) { alert("Descripción no válida."); }
      else {
        if (!validarComplejidadReceta(values.campocomplejidad)) { alert("la complejidad solo se mide con numeros"); }
        else {
          if (image === null) { alert("Suba una imagen por favor."); }
          else {            
            e.preventDefault();
            console.log(values)
            agregarReceta(values);
            //agregarIngredientesReceta()  ;           
            actualizacionImagen();
          }
        }
      }
    }
  };
     
              //crear nuevo ingrediente en la tabla
              const createNewIngredient = (cantidad,unidades,ingredientName) => {
                if(recipeItems!=null){
                  if(cantidad!='' && unidades!='' && ingredientName!=''){
                    if (!recipeItems.find(i=>i.name == ingredientName)) {
                    setRecipeItems([...recipeItems, {cantidad:cantidad,unidades:unidades,name: ingredientName}]);
                        }
                     else{alert('coincidencia encontrada el la lista de items')}
                  }  
                  else{alert('no puede haber campos vacios');}
             }
                else{
                  setRecipeItems([{cantidad:cantidad,unidades:unidades,name: ingredientName}]);
               }               
              };
   
                const deleteIngredient=(recipeItem)=>{
                  //e.preventDefault();
                   //console.log('antes'+recipeItems);
                   var contador=0;
                   var lista=recipeItems;
                  // console.log(lista);
                    lista.map((ingrediente)=>{
                      if(recipeItem.name==ingrediente.name){
                      console.log(ingrediente);
                       lista.splice(contador,1);
                       console.log(lista);
                      }
                    contador++;
                    });
                    setRecipeItems(lista);
                   console.log(recipeItems)
                  var tablaAlmacen=recipeItems;         
                    window.localStorage.setItem('tablaIngredientes',JSON.stringify(tablaAlmacen));                           
                };



    //veo cada vez que un campo de ingreso de texto cambie
    //name es el input
    //value es el valor del input
    const handleInputChange= (e) =>{
      const{name,value}=e.target;
      setLocalStorageRecetas({...values,[name]:value});
      };
 
      //almacenamiento dentro de la ventana,persiste a la actualziacion
     const setLocalStorageRecetas=value=>{
      try{
        setValues(value);
        window.localStorage.setItem('camponombre',value.camponombre);
        window.localStorage.setItem('campodescripcion',value.campodescripcion);
        window.localStorage.setItem('campocomplejidad',value.campocomplejidad);
        window.localStorage.setItem('campoCalorias',value.campoCalorias);
        window.localStorage.setItem('campoGrasas',value.campoGrasas);
        window.localStorage.setItem('campoCarbohidratos',value.campoCarbohidratos);
        window.localStorage.setItem('campoProteinas',value.campoProteinas);
        }
      catch(error){console.error(error);}
     };
     
   //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
   /*const handleSubmit = (e) =>{
    if(!validarNombreReceta(values.camponombre)){alert("nombre no valido");}  
    else{
      if(!validarNombre(values.camponombre)){alert("Receta ya registrada");}
      else{
        if(!validarDescripcionReceta(values.campodescripcion)){alert("descripcion no valida");}  
         else{if(!validarComplejidadReceta(values.campocomplejidad)){alert("la complejidad solo se mide con numeros");}
                else{
                    if(image===null){alert("debe agregar una imagen");}
                    else{ e.preventDefault();
                           console.log(values);
                           agregarReceta(values);         
                           subirImagen();
                          } 
                  }
             }
     } }
   };

*/
  return (
    <Container maxWidth='sm'>
      <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '2em' }}>
        Registro de recetas
      </Typography>

      <form className={classes.formulario}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              label="Nombre de la receta"
              InputProps={{ inputProps: { maxLength: 35 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca nombre la receta'
              name='camponombre'
              onChange={handleInputChange}
              value={values.camponombre}
              />
          </Grid>

          <Grid item sm={12} xs={12} >
            <div>Foto de la Receta:</div>
            <br />
            <input type="file" accept=".jpg,.png" name="imagenes"onChange={cambioImagen} />
          </Grid>

          <Grid item sm={12} xs={12}>
            <div>Ingredientes:</div>
             
     <div>   
        <Ingredie
        ntCreator agregarIngrediente={createNewIngredient}/>
            <TableContainer component={Paper}>        
              <Table >
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
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              name="campodescripcion"
              label="Pasos de elaboración"
              placeholder="Introduzca los pasos"
              multiline
              InputProps={{ inputProps: { minLength: 100,maxLength: 5000 } }}
              rows={7}
              defaultValue=""
              variant="outlined"
              onChange={handleInputChange}
              fullWidth='true'
              value={values.campodescripcion}
            />
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              label="Complejidad"
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              minValue="1"
              maxValue="5"              
              defaultValue=""
              fullWidth='true'
              placeholder='Grado de complejidad'
              name='campocomplejidad'
              onChange={handleInputChange}
              value={values.campocomplejidad}
            />
            <TextField
              label="Calorías"
              defaultValue=""
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth='true'
              placeholder='Número de calorías'
              name='campoCalorias'
              onChange={handleInputChange}
              value={values.campoCalorias}
            />
            <TextField
              label="Grasas saturadas"
              defaultValue=""
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth='true'
              placeholder='Número de grasas saturadas'
              name='campoGrasas'
              onChange={handleInputChange}
              value={values.campoGrasas}
            />
            <TextField
              label="Carbohidratos"
              defaultValue=""
              type="number"
              InputProps={{ inputProps: { min: 0 } }}
              fullWidth='true'
              placeholder='Número de carbohidratos'
              name='campoCarbohidratos'
              onChange={handleInputChange}
              value={values.campoCarbohidratos}
            />
          </Grid>

          <Grid item sm={12} xs={12} align="center">
            <Button variant="contained" color="primary" onClick={handleSubmit}>Registrar Receta</Button>
          </Grid>

        </Grid>
      </form>
    </Container>
};)
export default FormularioRecetas;