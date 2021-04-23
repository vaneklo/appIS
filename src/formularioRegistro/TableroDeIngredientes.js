import React, { useState, useEffect } from "react";
import {RecipeRow} from './RecipeRow'
import {IngredientCreator} from'./IngredientCreator'

function TableroDeIngredientes() {
    const [userName, setUserName] = useState("Fazt");

    const [recipeItems, setRecipeItems] = useState([
        {cant:"1"  ,name: "recipe One"}
      ]);
    
    
    //hago un recorrido de las tareas y las muestro en pantalla
     const recipeTableRows= ()=>
     recipeItems.map(recipe=>(
     <RecipeRow  recipe={recipe} key={recipe.name} />))
    
     const createNewIngredient = (cantidad,ingredientName) => {
       //si la el ingrediente esta dentro de la lista ya no se agregara
      if (!recipeItems.find(i => i.name === ingredientName)) {
        setRecipeItems([...recipeItems, { cant:cantidad,name: ingredientName}]);
      }
      else{alert('coincidencia encontrada el la lista de items')}
    };

    const deleteIngredient = (ingredientName) => {
      //si la el ingrediente esta dentro de la lista ya no se agregara
     if (recipeItems.find(i => i.name === ingredientName)) {
       console.log('se elimino un item')
       
     }
   };


    return (
      <div>
        <div className="container-fluid">   
            <IngredientCreator agregarIngrediente={createNewIngredient}/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>cantidad</th>
                <th>Nombre del ingrediente</th>
              </tr>
            </thead>
            <tbody>{recipeTableRows()}</tbody>
          </table>



        </div>
      </div>
    );
  }
  
  export default TableroDeIngredientes;


