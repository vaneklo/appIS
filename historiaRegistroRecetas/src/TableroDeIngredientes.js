import React, { useState, useEffect } from "react";
import {IngredientCreator} from'./IngredientCreator'

const TableroDeIngredientes =(props)=> {

  const [recipeItems, setRecipeItems] = useState([
    {nombreReceta:'', cant:''  ,name:''}
     ]);

    //hago un recorrido de las tareas y las muestro en pantalla
     const recipeTableRows=(e)=>
      recipeItems.map(recipe=>(
      <tr key={recipe.name}>
      <td>{recipe.name}</td>
      <td>{recipe.cant}</td>
      <td><button >eliminar</button> </td>
      </tr>
      ))
    
     const createNewIngredient = (cantidad,ingredientName) => {
       //si la el ingrediente esta dentro de la lista ya no se agregara
      if (!recipeItems.find(i => i.name === ingredientName)) {
        setRecipeItems([...recipeItems, { cant:cantidad,name: ingredientName}]);
      }
      else{alert('coincidencia encontrada el la lista de items')}
        
    };

    const deleteIngredient=()=>{
    console.log('item eliminado'); 
    }

    return (
      <div>
        <div className="container-fluid">   
            <IngredientCreator agregarIngrediente={createNewIngredient}/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>cantidad</th>
                <th>nombre del ingrediente</th>
              </tr>
            </thead>
            <tbody>{recipeTableRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
  
  export default TableroDeIngredientes;


