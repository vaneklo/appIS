import React, {
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase';

import {
  Button,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { PhotoCamera } from '@material-ui/icons';

import { db } from './firebase';
import { IngredientCreator } from './IngredientCreator';

var archivo;

const useStyles = makeStyles((theme) => ({
  formulario: {
    border: '1px solid gray',
    padding: '10px',
    borderRadius: '10px'
  }

}));
const FormularioRecetas = () => {
  const classes = useStyles();

  const [listaNombresRegistrados, setListaNombresRegistrados] = useState([]);
  useEffect(() => { getNombre() }, [])

  const getNombre = async () => {
    let obj;
    let lista = []
    const querySnapshot = await db.collection("receta").get();
    querySnapshot.forEach((doc) => {
      obj = doc.data()
      obj.id = doc.id
      lista.push(obj)
    });
    setListaNombresRegistrados(lista)
    console.log(lista[0].camponombre);
  }
  const validarNombre = (nombre) => {
    var bandera = true;
    var contador = 0;
    listaNombresRegistrados.map((receta) => {
      if (receta.camponombre == nombre) {
        console.log(receta.camponombre);
        bandera = false;
      }
      contador++;
    });
    return bandera;
  }
  // bugs de los valores nulos arreglado
  const getValoresVentanaIngredientes = () => {
    const arreglo = JSON.parse(window.localStorage.getItem('tablaIngredientes'));
    if (arreglo != null) { return arreglo; }
    else { return []; }
  }

  const getValoresDescripcion = () => {
    var descip = window.localStorage.getItem('campodescripcion');
    if (descip != null) {
      return descip;
    }
    else { return ''; }
  }

  //valores iniciales de los campos nombre desripcion y complejidad
  const initialStateValues = {
    camponombre: window.localStorage.getItem('camponombre'),
    campodescripcion: getValoresDescripcion(),
    campocomplejidad: window.localStorage.getItem('campocomplejidad'),
    campoCalorias: window.localStorage.getItem('campoCalorias'),
    campoGrasas: window.localStorage.getItem('campoGrasas'),
    campoCarbohidratos: window.localStorage.getItem('campoCarbohidratos'),
    // urlImagenReceta:''
  };
  //valores iniciales de los campos de texto
  const [values, setValues] = useState(initialStateValues);
  //los valores iniciales de la tabla de ingredientes,la tabla estara vacia
  //const[recipeItems, setRecipeItems] = useState([]);
  const [recipeItems, setRecipeItems] = useState(getValoresVentanaIngredientes());
  //valores iniciales de la imagen es null                     
  const [image, setImage] = useState(null);
  const [urlImagen, setUrlImagen] = useState('');


  const cambioImagen = (e) => {
    var o = document.getElementById('archivo');
    archivo = e.target.files[0];

    var foto = o.files[0];
    console.log(e.target.files[0]);
    var img = new Image();
    img.src = URL.createObjectURL(foto);
    console.log(img.src);
    img.onload = function dimension() {
      var tam720 = this.width.toFixed(0) <= 720 && this.height.toFixed(0) <= 720;
      var tam480 = this.width.toFixed(0) >= 480 && this.height.toFixed(0) >= 480;
      if (tam720 && tam480) {
        setImage(e.target.files[0]);
        //return true;
        console.log("listo");
      }
      else {
        window.location.reload(true);
        alert('Las medidas deben ser: menor a 720x720 o mayor a 480x480');             
      }
    };     
  }

  //metodo para subir imagenes a la base de datos falta como recuperar la url
  const subirImagen = () => {
    const storageApply = firebase.storage().ref(`images/${values.camponombre}`).put(image)
    console.log(image)
  };

  const agregarReceta = () => {
    //comunicacion con la base de datos con la coleccion receta.doc,para id unico
    //primero agrego la tabla de  ingredientes y debajo los cdatos de complejidad,etc 
    db.collection('receta').doc().set(values)
    // db.collection('receta-imagen').doc().set({nombreReceta:values.nombreReceta,url:urlImagen})
    recipeItems.map((recipeItem) => {
      db.collection('ingrediente-receta').doc().set({ nombreReceta: values.camponombre, cantidad: recipeItem.cantidad, unidades: recipeItem.unidades, name: recipeItem.name });
    })
  }
  //validacion de los campos de texto
  const validarNombreReceta = (str) => {
    var pattern = new RegExp("^[a-zA-Z]+\\.?");
    return !!pattern.test(str);
  };
  const validarDescripcionReceta = (str) => {
    var pattern = new RegExp("^[a-z||A-Z||0-9][a-zA-Z\t\h]+");
    return !!pattern.test(str);
  };

  const validarComplejidadReceta = (str) => {
    var pattern = new RegExp("^[1-9][0-9]*$");
    return !!pattern.test(str);
  };

  const validarNumeroIngredientes = () => {
    if (recipeItems.length>0 && recipeItems.length<21 ) { 
      console.log(recipeItems)
      return true; }
    else { return false; }
  };
  
  //crear las filas de la tabla de ingredientes
  //hago un recorrido de las filas de los datos y las muestro en pantalla
  //se actualiza frecuentemente
  const recipeTableRows = () =>
    recipeItems.map(recipe => (
      <TableRow key={recipe.name}>
        <TableCell>{recipe.cantidad}</TableCell>
        <TableCell>{recipe.unidades}</TableCell>
        <TableCell>{recipe.name}</TableCell>
        <TableCell><Button 
        style={{backgroundColor: "#20603d", color:"#ffffff"}} 
        onClick={(e) => deleteIngredient(e.target, recipe)} type="submit"
       >eliminar</Button> </TableCell>
       </TableRow>
    ))

  //crear nuevo ingrediente en la tabla
  const createNewIngredient = (cantidad, unidades, ingredientName) => {
    if (cantidad != '' && unidades != '' && ingredientName != '') {
      if (!recipeItems.find(i => i.name == ingredientName)) {
        var tablaAlmacen = [...recipeItems, { cantidad: cantidad, unidades: unidades, name: ingredientName }];
        window.localStorage.setItem('tablaIngredientes', JSON.stringify(tablaAlmacen));
        setRecipeItems([...recipeItems, { cantidad: cantidad, unidades: unidades, name: ingredientName }]);
        //nota no debe usarse (1) problema de tiempos por eso esta la variable tablaAlmacen 
        //(1)window.localStorage.setItem('tablaIngredientes',recipeItems);    
      }
      else { alert('coincidencia encontrada el la lista de items') }
    }
    else { alert('no puede haber campos vacios') }
  }

  const deleteIngredient = (e, recipeItem) => {
    // e.preventDefault();
    //console.log('antes'+recipeItems);
    var contador = 0;
    var lista = recipeItems;
    //console.log(lista);
    lista.map((ingrediente) => {
      if (recipeItem.name == ingrediente.name) {
        console.log(ingrediente);
        lista.splice(contador, 1);
        console.log(lista);
      }
      contador++;
    });
    setRecipeItems(lista);
    console.log(recipeItems)
    var tablaAlmacen = recipeItems;
    window.localStorage.setItem('tablaIngredientes', JSON.stringify(tablaAlmacen));
    window.location.reload(true);
  }



  //veo cada vez que un campo de ingreso de texto cambie
  //name es el input
  //value es el valor del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalStorageRecetas({ ...values, [name]: value })
  };

  //almacenamiento dentro de la ventana,persiste a la actualziacion
  const setLocalStorageRecetas = value => {
    try {
      setValues(value);
      window.localStorage.setItem('camponombre', value.camponombre);
      window.localStorage.setItem('campodescripcion', value.campodescripcion);
      window.localStorage.setItem('campocomplejidad', value.campocomplejidad);
      window.localStorage.setItem('campoCalorias', value.campoCalorias);
      window.localStorage.setItem('campoGrasas', value.campoGrasas);
      window.localStorage.setItem('campoCarbohidratos', value.campoCarbohidratos);

    }
    catch (error) {
      console.error(error);
    }
  }



  //controlo los cambios evitando que la pagina se recarge e informo de los valores de los campos de texto
  const handleSubmit = e => {
    if (!validarNombreReceta(values.camponombre)) { alert("el nombre debe estar compuesto de caracteres de la 'a' a la 'z' y no puede estar vacio"); }
    else {
      if (!validarNombre(values.camponombre)) {
        console.log(values.camponombre);
        alert("nombre de receta ya registrada"); }
      else {
        if (!validarDescripcionReceta(values.campodescripcion)) { alert("descripcion no valida"); }
        else {
          if (!validarComplejidadReceta(values.campocomplejidad)) { alert("la complejidad solo se mide con numeros"); }
          else {
            if (!validarNumeroIngredientes()) { alert('debe agregar por lo menos un ingrediente y no mas de veinte'); }
            else {
              if (image == null) { alert("debe agregar una imagen"); }
              else {
                // e.preventDefault();       
                subirImagen();
                agregarReceta(values);
                alert('receta registrada correctamente');
              }
            }
          }
        }
      }
    }
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
            <Typography variant="subtitle1">Foto de la Receta:</Typography>
            <input type="file" name="archivo" id="archivo" accept=".jpge,.png,.jpg" onChange={cambioImagen} hidden/>
            <Tooltip title="Subir archivo">
        <label htmlFor="archivo">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera fontSize="large" />
          </IconButton>
        </label>
      </Tooltip>
      <label>{archivo ? archivo.name : "Cargar archivo"}</label>. . .
      
          </Grid>

          <Grid item sm={12} xs={12}>

          <Typography variant="subtitle1">Ingredientes:</Typography>

            <div>
              <IngredientCreator agregarIngrediente={createNewIngredient} />
              <TableContainer component={Paper}>
                <Table >
                  
                  <TableBody >{recipeTableRows()}</TableBody>
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
              InputProps={{ inputProps: { minLength: 100, maxLength: 5000 } }}
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
          <Button 
            style={{
              backgroundColor: "#20603d",
             
          }}
            variant="contained" 
            color="primary" 
            onClick={handleSubmit}>
              Registrar Receta
              </Button></Grid>

        </Grid>
      </form>


    </Container>)

};
export default FormularioRecetas;