import React, { useState } from 'react';

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {IngredientCreator} from './IngredientCreator';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


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
            <TableContainer component={Paper}>        
              <Table className="class.table" size="small"  aria-label="customized table">
                <TableHead>
                  <TableRow>
                  <TableCell align="left">Cantidad</TableCell>
                  <TableCell align="left">Nombre del Ingrediente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{recipeTableRows()}</TableBody>
              </Table>
            </TableContainer>
        </div>
      </div>
    );
  }
  
  export default TableroDeIngredientes;