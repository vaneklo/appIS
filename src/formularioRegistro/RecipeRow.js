import React from "react";
//devuelve las filas con los ingredientes
export const RecipeRow = props => (
    <tr key={props.recipe.name}>
      <td>{props.recipe.cant}</td>
      <td>{props.recipe.name}</td>
      <button>eliminar</button>

    </tr>
);