import { Timer10 } from '@material-ui/icons';
import {respuesta,listaIngredientes} from './datosBaseIngredientes'
export const ingredientes = [
{ingrediente: 'Platano', categoria: 'Fruta'},
 {ingrediente: 'Manzana', categoria: 'Fruta'},
 {ingrediente: 'Frutilla', categoria: 'Fruta'},
  {ingrediente: 'Cebolla', categoria: 'Verdura'},
  {ingrediente: 'Zanahoria', categoria: 'Verdura'},
  {ingrediente: 'Lechuga', categoria: 'Verdura'},
   {ingrediente: 'Huevo', categoria: 'Proteina'},
   {ingrediente: 'Pollo', categoria: 'Proteina'},
 {ingrediente: 'Carne', categoria: 'Proteina'},
  ];

const respuestas=()=>{
  var ingredientesUnicos=[];  
  respuesta.then((item)=>{ 
    
    ingredientesUnicos=[...ingredientesUnicos,item]
    } 
    );
    return ingredientesUnicos;
}
const itemsunicos=respuestas();
const ingredien=itemsunicos;



  