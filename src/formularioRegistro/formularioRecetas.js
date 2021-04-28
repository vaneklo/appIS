import React, { useState } from 'react';

import firebase from 'firebase';

import Input from '@material-ui/core/Input';
import { Button, Container, Typography, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

import { db } from './firebase';
import TableroDeIngredientes from './TableroDeIngredientes';
// import classes from '*.module.css';


const useStyles = makeStyles((theme) => ({
  formulario: {
    border: '1px solid gray',
    padding: '10px',
    borderRadius: '10px'
  }

}));


const FormularioRecetas = () => {
  const classes = useStyles();

  //valores iniciales de los campos nombre desripcion y complejidad
  const initialStateValues = {
    camponombre: '',
    campodescripcion: '',
    campocomplejidad: '',
    campoCalorias: '',
    campoGrasas: '',
    campoCarbohidratos: '',
    campoProteinas: '',
  };
  //valores iniciales de la imagen es null                     
  const [image, setImage] = useState(null);
  //valores iniciales de los campos de texto
  const [values, setValues] = useState(initialStateValues);


  //metodos para las imagenes
  const cambioImagen = e => { if (e.target.files[0]) { setImage(e.target.files[0]); } };
  //metodo para actualizar imagenes
  const actualizacionImagen = () => {
    const storageRef = firebase.storage().ref(`images/${image.name}`).put(image);
    alert("imagen subida con exito");
  };

  const agregarReceta = async () => {
    //comunicacion con la base de datos
    //con la coleccion receta.doc para id unico
    //link object los valores
    await db.collection('receta').doc().set(values);
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
  const handleSubmit = e => {
    if (!validarNombreReceta(values.camponombre)) { alert("nombre no valido"); }
    else {
      if (!validarDescripcionReceta(values.campodescripcion)) { alert("descripcion no valida"); }
      else {
        if (!validarComplejidadReceta(values.campocomplejidad)) { alert("la complejidad solo se mide con numeros"); }
        else {
          if (image === null) { alert("debe agregar una imagen"); }
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
  //veo cada vez que un campo de ingreso de texto cambie
  //name es el input
  //value es el valor del input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })

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
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca nombre la receta'
              name='camponombre'
              onChange={handleInputChange}
              />

          </Grid>

          <Grid item sm={12} xs={12} >
            <div>Foto de la Receta:</div>
            <br />
            <input type="file" onChange={cambioImagen} />
          </Grid>

          <Grid item sm={12} xs={12}>
            <div>Ingredientes:</div>
            <TableroDeIngredientes />
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              name="campodescripcion"
              label="Pasos de elaboración"
              placeholder="Introduzca los pasos"
              multiline
              rows={7}
              defaultValue=""
              variant="outlined"
              onChange={handleInputChange}
              fullWidth='true'
            />
          </Grid>

          <Grid item sm={12} xs={12}>
            <TextField
              label="Complejidad"
              defaultValue=""
              fullWidth='true'
              placeholder='Grado de complejidad'
              name='campocomplejidad'
              onChange={handleInputChange}

            />
            <TextField
              label="Calorías"
              defaultValue=""
              fullWidth='true'
              placeholder='Número de calorías'
              name='campoCalorias'
              onChange={handleInputChange}

            />
            <TextField
              label="Grasas saturadas"
              defaultValue=""
              fullWidth='true'
              placeholder='Número de grasas saturadas'
              name='campoGrasas'
              onChange={handleInputChange}

            />
            <TextField
              label="Carbohidratos"
              defaultValue=""
              fullWidth='true'
              placeholder='Número de carbohidratos'
              name='campoCarbohidratos'
              onChange={handleInputChange}

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