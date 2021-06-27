import React, { useState } from 'react';

import {
  Button,
  TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export const IngredientCreator = props => {
  const [newCantidad, setNewCantidad] = useState("");
  const [newUnidad, setNewUnidad] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  //capturar los valores de cantidad e ingrediente
  const updateNewCantidadValue = e => setNewCantidad(e.target.value);
  const updateNewUnidad = e => setNewUnidad(e.target.value);
  const updateNewingredientValue = e => setNewIngredient(e.target.value);

  //validacion de los campos de texto
  const validarUnidad = (str) => {
    var pattern = new RegExp("^([a-zA-Zñáéíóú]+)+$");
    return !!pattern.test(str);
  };
  //validacion de los campos de texto
  const validarNombre = (str) => {
    var pattern = new RegExp("^([a-zA-Zñáéíóú]+)+$");
   // var pattern = new RegExp("^([a-zñáéíóú]+[\s]*)+$");
    return !!pattern.test(str);
  };

  const createNewIngredient = (e) => {
    e.preventDefault();
    if (validarUnidad(newUnidad)) {
      if (validarNombre(newIngredient)) {
           if(newCantidad>0){
        props.agregarIngrediente(newCantidad, newUnidad, newIngredient);
        setNewCantidad('');
        setNewUnidad('');
        setNewIngredient('');
           }
          else{
              alert('las unidades deben ser numeros positivos')
          }
      }
      else { alert('el nombre debe tener solo caracteres de la a la z y no debe estar vacia y no debe tener espacios'); }
    }
    else { alert('la unidad debe tener solo caracteres de la a la z y no debe estar vacia y no debe tener espacios'); }
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
      <TextField
        type="number"
        InputProps={{ inputProps: { min: 1 } }}
       
          value={newCantidad}
          placeholder='cantidad'
          min='1'
          minLength="1"
          maxLength="5"
          onChange={updateNewCantidadValue}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        InputProps={{ inputProps: { maxLength: 10 } }}
          type="text"
          maxLength="10"
          placeholder='unidad'
          value={newUnidad}
          onChange={updateNewUnidad}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        InputProps={{ inputProps: { maxLength: 15 } }}
          type="text"
          placeholder='ingrediente'
          maxLength="15"
          value={newIngredient}
          onChange={updateNewingredientValue}
        />
      </Grid>
      <Grid item xs={3}>
        <Button style={{ backgroundColor: "#20603d",color:"#ffffff"}} 
        onClick={createNewIngredient}>agregar</Button></Grid>

    </Grid>
  );
};