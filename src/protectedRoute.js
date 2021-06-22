import {Redirect, Route} from 'react-router-dom';
import Contexto from './contexto/contexto';
import SeccionFormulario from "./formularioRegistro/SeccionFormulario";
export default function ProtectedRoute(props){
    const{estadoBotonRegistrarRecetas,estadoBotonVerRecetasFavoritas}=useContext(Contexto);
if(estadoBotonRegistrarRecetas){
return (
<Route {...props} >
      <SeccionFormulario/> 
</Route>);}
else{return(<Redirect to ='/'/>);}

}