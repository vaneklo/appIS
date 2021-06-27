import firebase from 'firebase';
import Contexto from './contexto'
import { db } from '../formularioRegistro/firebase';
import { useAuth0 } from'@auth0/auth0-react'
import { useState, useEffect } from'react'

const DatosContexto=(props)=>{
const {user,isAuthenticated} =useAuth0();
const [nombreUsuario,setNombreUsuario]=useState(null);
const [correoUsuario,setCorreoUsuario]=useState(null);
const [listaFavoritos,setListaFavoritos]=useState([]);
const [rol,setRol]=useState(null);

const [cambio,setCambio]=useState(0);
const [ciclo,setciclo]=useState(true);
//const [datosContexto,setDatosContexto]=useState(estadoInicial);

useEffect(()=>guardarUsuario(),[nombreUsuario,isAuthenticated]);
useEffect(()=>cargarDatos(),[isAuthenticated]);

const guardarUsuario=()=>{

if(isAuthenticated){
  console.log('guardar usuario')
const authApply = firebase.auth().createUserWithEmailAndPassword(user.email,'001122334a')
.then(()=>{
     db.collection('usuario').doc().set({correoElectronico:user.email,
                                       nombreCompleto:user.nickname,
                                       rol:"cliente"});
    setCambio(cambio+1);
    //cargarDatos(user.email);
           })
    .catch(error=>{
    setCambio(cambio+1);
   //cargarDatos(user.email);   
                   console.log('error')
                   console.log(error);
                                        })
                                    }
}
const cargarDatos=async()=>{

if(isAuthenticated){
  console.log('cargando datos de existentedsdsdsdsdsdsds')
    var objt;
    var datosCliente=[];
    const consultaDatosCliente=await db.collection("usuario").where('correoElectronico','==',user.email).get();
    consultaDatosCliente.forEach((doc) => {
        if(consultaDatosCliente!=null){
          objt=doc.data();
          objt.id=doc.id;
          datosCliente.push(objt);}})

          console.log(datosCliente);

          var objRecetas;
          var datosRecetas=[];
    const consultarRecetasFavoritas=await db.collection("receta-usuario").where('correoElectronico','==',user.email).get();
    consultarRecetasFavoritas.forEach((doc) => {
       
            objRecetas=doc.data();
            objRecetas.id=doc.id;
            datosRecetas.push(objRecetas);})
           setListaFavoritos(datosRecetas);
          
           console.log(datosRecetas)
           
           console.log(listaFavoritos)

    if(datosCliente[0].rol=='cliente'){
        setNombreUsuario(user.nickname);
        setCorreoUsuario(user.email);
        setRol(datosCliente[0].rol);

                                    }
    else{
        if(datosCliente[0].rol=='administrador'){
            setNombreUsuario(user.nickname);
            setCorreoUsuario(user.email);
            setRol(datosCliente[0].rol);                   
                                                  }
        }
}
}

const setearRecetasFavoritas=async()=>{
if(isAuthenticated){
    var objRecetas;
    var datosRecetas=[];
    const consultarRecetasFavoritas=await db.collection("receta-usuario").where('correoElectronico','==',user.email).get();
    consultarRecetasFavoritas.forEach((doc) => {
        if(consultarRecetasFavoritas!=null){
            objRecetas=doc.data();
            objRecetas.id=doc.id;
          datosRecetas.push(objRecetas);}})//[{},{},{}]
          console.log("setar")
          setListaFavoritos(datosRecetas);
          
                }
}


return(
<Contexto.Provider value={
nombreUsuario,
correoUsuario,
listaFavoritos,
rol,
setearRecetasFavoritas   
     }>
{props.children}
</Contexto.Provider>
);
}
export default DatosContexto;