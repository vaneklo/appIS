import React, { useState } from "react";

export const IngredientCreator = props => {
const [newCantidad,setNewCantidad] = useState("");
const [newUnidad,setNewUnidad] = useState("");
const [newIngredient,setNewIngredient] = useState("");


//capturar los valores de cantidad e ingrediente
const updateNewCantidadValue=e=>setNewCantidad(e.target.value);
const updateNewUnidad=e=>setNewUnidad(e.target.value);
const updateNewingredientValue=e=>setNewIngredient(e.target.value);

  const createNewIngredient = (e) => {
    e.preventDefault();
    props.agregarIngrediente(newCantidad,newUnidad,newIngredient);
    setNewCantidad('');
    setNewUnidad('');
    setNewIngredient('');
  }

  return (
    <div>
      <input
        type="number"
        value={newCantidad}
        maxLength = "5"
        onChange={updateNewCantidadValue}
      />
      <input
        type="text"
        maxLength = "10"
        value={newUnidad}
        onChange={updateNewUnidad}
      />
      <input
        type="text"
        maxLength = "15"
        value={newIngredient}
        onChange={updateNewingredientValue}
      />

      <button onClick={createNewIngredient}>Add</button>
    </div>
  );
};