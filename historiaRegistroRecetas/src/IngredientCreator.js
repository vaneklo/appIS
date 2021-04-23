
import React, { useState } from "react";

export const IngredientCreator = props => {
const [newCantidad,setNewCantidad] = useState("");
const [newIngredient,setNewIngredient] = useState("");

//capturar los valores de cantidad e ingrediente
const updateNewCantidadValue=e=>setNewCantidad(e.target.value);
const updateNewingredientValue=e=>setNewIngredient(e.target.value);

  const createNewIngredient = (e) => {
    e.preventDefault();
    props.agregarIngrediente(newCantidad,newIngredient);
    setNewIngredient('');
    setNewCantidad('');
  }

  return (
    <div>
      <input
        type="text"
        value={newIngredient}
        onChange={updateNewingredientValue}
      />
      <input
        type="text"
        value={newCantidad}
        onChange={updateNewCantidadValue}
      />

      <button onClick={createNewIngredient}>Add</button>
    </div>
  );
};