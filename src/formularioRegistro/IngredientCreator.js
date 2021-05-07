import React, { useState } from "react";

export const IngredientCreator = props => {
const [newCantidad,setNewCantidad] = useState("");
const [newUnidad,setNewUnidad] = useState("");
const [newIngredient,setNewIngredient] = useState("");

//capturar los valores de cantidad e ingrediente
const updateNewCantidadValue=e=>setNewCantidad(e.target.value);
const updateNewUnidad=e=>setNewUnidad(e.target.value);
const updateNewingredientValue=e=>setNewIngredient(e.target.value);

    //validacion de los campos de texto
    const validarUnidad = (str) => {
      var pattern = new RegExp("[a-zA-Z]+");
      return !!pattern.test(str);
    };
        //validacion de los campos de texto
        const validarNombre = (str) => {
          var pattern = new RegExp("[a-zA-Z]+");
          return !!pattern.test(str);
        };


  const createNewIngredient = (e) => {
    e.preventDefault();
    if(validarUnidad(newUnidad)){
      if(validarNombre(newIngredient)){
        props.agregarIngrediente(newCantidad,newUnidad,newIngredient);
        setNewCantidad('');
        setNewUnidad('');
        setNewIngredient(''); }
        else{alert('el nombre debe tener solo caracteres de la a la z'); }

       }
    else{alert('la unidad debe tener solo caracteres de la a la z'); }
  }
  return (
    <div>
      <input
        type="number"
        value={newCantidad}
        placeholder='cantidad'
        min='1'
        minLength="1"
        maxLength = "5"
        onChange={updateNewCantidadValue}
      />
      <input
        type="text"
        maxLength = "10"
        placeholder='unidad'
        value={newUnidad}
        onChange={updateNewUnidad}
      />
      <input
        type="text"
        placeholder='ingrediente'
        maxLength = "15"
        value={newIngredient}
        onChange={updateNewingredientValue}
      />

      <button onClick={createNewIngredient}>agregar</button>
    </div>
  );
};