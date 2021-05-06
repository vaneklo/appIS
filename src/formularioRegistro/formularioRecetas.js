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
   //valores iniciales de los campos de texto
   const [values, setValues] = useState(initialStateValues);
   //los valores iniciales de la tabla de ingredientes,la tabla estara vacia
   const[recipeItems, setRecipeItems] = useState([]);
  // const[recipeItems, setRecipeItems] = useState(JSON.parse(window.localStorage.getItem('tablaIngredientes')));
    //valores iniciales de la imagen es null                     
   const [image, setImage] = useState(null);

       //metodos para las imagenes
   // const cambioImagen = e => {if (e.target.files[0]) {setImage(e.target.files[0]);}};
   const cambioImagen = e => {                                 
     try{
        if (validarImagen()) {
          setImage(e.target.files[0]);
        }else{}
      }
      catch(error){
        alert('465165'); 
       }     
  };
    function validarImagen() {    
        var o = document.getElementById('archivo');
        var foto = o.files[0];        

        var img = new Image();
        img.onload = function dimension() {
          var tam720=this.width.toFixed(0)<=720 && this.height.toFixed(0)<= 720;
          var tam480=this.width.toFixed(0)>= 480 && this.height.toFixed(0)>= 480;
          if (tam720 && tam480) {
            alert('La imagen se subio correctamente :)');            
            return true;      
          } else {
            alert('Las medidas deben ser: menor a 720x720 o mayor a 480x480');            
            return false;               
          }
        };
        img.src = URL.createObjectURL(foto);              
        return false;      
    }

  //metodo para subir imagenes a la base de datos falta como recuperar la url
  const subirImagen = () => {
    const storageRef=firebase.storage().ref(`images/${image.name}`).put(image);
    //setValues({...values,[name]:value}
    //values.urlImagen=storageRef.snapshot.downloadURL;
    console.log(storageRef.snapshot.getDownloadURL);
    alert("Registro exitoso");                   
     };

     
     const agregarReceta=()=>{
      //comunicacion con la base de datos con la coleccion receta.doc,para id unico
      //primero agrego la tabla de  ingredientes y debajo los cdatos de complejidad,etc
        if(recipeItems!=null){
         recipeItems.map((recipeItem)=>{
        db.collection('ingrediente-receta').doc().set({nombreReceta:values.camponombre,cantidad:recipeItem.cantidad,unidades:recipeItem.unidades ,name:recipeItem.name}); 
         })
        }
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
    const recipeTableRows=()=>{
      console.log(recipeItems)
      if(recipeItems!=null){
        recipeItems.map(recipe=>(
          <tr key={recipe.name}>
          <td>{recipe.cantidad}</td>
          <td>{recipe.unidades}</td>
          <td>{recipe.name}</td>
          <td><button onClick={(e)=>deleteIngredient(e,recipe)} >eliminar</button> </td>
          </tr>
          ))
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
                  else{alert('no puede haber campos vacios')}
             }
                else{
                  setRecipeItems([{cantidad:cantidad,unidades:unidades,name: ingredientName}]);
               }
               
              }
   

                const deleteIngredient=(recipeItem)=>{
                  //e.preventDefault();
                   //console.log('antes'+recipeItems);
                   var contador=0;
                   var lista=recipeItems;
                  // console.log(lista);
                    lista.map((ingrediente)=>{
                      if(recipeItem.name==ingrediente.name)
                      {console.log(ingrediente);
                       lista.splice(contador,1);
                       console.log(lista);
                      }
                    contador++;
                    });
                    setRecipeItems(lista);
                   console.log(recipeItems)
                  var tablaAlmacen=recipeItems;
         
                    window.localStorage.setItem('tablaIngredientes',JSON.stringify(tablaAlmacen));
                
            
                }



    //veo cada vez que un campo de ingreso de texto cambie
    //name es el input
    //value es el valor del input
    const handleInputChange= (e) =>{
      const{name,value}=e.target;
      setLocalStorageRecetas({...values,[name]:value})
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
      catch(error){console.error(error);
                  }
     }
  

     
   //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
   const handleSubmit = e =>{
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
            <input type="file" name="archivo" id="archivo" accept=".jpge, .png, .jpg"onChange={cambioImagen} />
          </Grid>

          <Grid item sm={12} xs={12}>
            <div>Ingredientes:</div>
             
     <div>   
        <IngredientCreator agregarIngrediente={createNewIngredient}/>
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


    </Container>)

};
export default FormularioRecetas;