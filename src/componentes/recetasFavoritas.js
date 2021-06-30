
import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { db } from '../formularioRegistro/firebase';
import Tarjetas from './Tarjetas';
import {Redirect } from 'react-router-dom';
import { Paginacion } from './paginacion';
  const RecetasFavoritas = (props) => {
  const [listaFavoritos, setListaFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paginaActual,setPaginaActual]=useState(1);
  const [tarjetasPorPagina] = useState(6);

  const {user,isAuthenticated} =useAuth0();

  useEffect(() => {consulta()},[]);

const consulta=async()=>{
  console.log('consulta recetas favori');
   if(isAuthenticated){
     var res=[];
    var objt;
    var recetasTotales=[];
    const consultaTotal=await db.collection("receta").orderBy("campocomplejidad", "asc").get()
    consultaTotal.forEach((doc) => {
      if(consultaTotal!=null){
     objt=doc.data();
     objt.id=doc.id;
     recetasTotales.push(objt);}})
     console.log(recetasTotales)
                            var objRecetas;
                            var datosRecetas=[];
                            const consultarRecetasFavoritas=await db.collection("receta-usuario").where('correoElectronico','==',user.email).get();
                            consultarRecetasFavoritas.forEach((doc) => {
                             objRecetas=doc.data();
                             objRecetas.id=doc.id;
                             datosRecetas.push(objRecetas);})
    console.log(datosRecetas)                         
                
    var lista=[];
    for(let i=0;i<datosRecetas.length;i++){
    lista.push(datosRecetas[i].camponombre);
    }
    console.log(lista);
   for(let i=0;i<lista.length;i++){
    var index = recetasTotales.map(item=>item.camponombre).indexOf(lista[i])    
    console.log(index)                    
   if(index>=0){res.push(recetasTotales[index])}

    }
  setListaFavoritos(res);
   console.log(res);
   }
}
  const indiceLimite = paginaActual * tarjetasPorPagina;
  const indicePrincipio = indiceLimite - tarjetasPorPagina;
  const tarjetasActuales = listaFavoritos.slice(indicePrincipio, indiceLimite);

  const paginate=(numero)=>{setPaginaActual(numero)
  console.log(paginaActual);
  };
  if(props.rol!='cliente'){
    console.log('link to');
    return(<Redirect to='/'/>);
  }

  return (
    <div>
    <Tarjetas listaFavoritos={tarjetasActuales} loading={loading} ></Tarjetas>
    <Paginacion tarjetasPorPagina={tarjetasPorPagina}
                tarjetasTotales={listaFavoritos.length}
                paginate={paginate}/>
     </div>
  );
};

export default RecetasFavoritas;