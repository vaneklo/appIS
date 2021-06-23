import { useAuth0 } from '@auth0/auth0-react';
import React, { useState, useEffect } from 'react';
import { db } from '../formularioRegistro/firebase';

import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    GridList,
  } from '@material-ui/core/';
  //import Receta from './Receta';
  import { makeStyles } from '@material-ui/core/styles';
  
  import Modal from '../componentes/Modal';
const RecetasFavoritas = () => {
  const [listaFavoritos, setListaFavoritos] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const {user,isAuthenticated} =useAuth0();
  useEffect(() => {consulta()},[isAuthenticated]);

const consulta=async()=>{
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
   if(index>0){res.push(recetasTotales[index])}

  
    }
  setListaFavoritos(res);
   console.log(res);
   }
}

const tarjetas=()=>
     
    (listaFavoritos.map((elem) => 
    ( <Grid item xs={3} key={listaFavoritos.id}> 
    <Card > 
    <CardMedia style = {{ height: 0, paddingTop: '56%'}} 
    
    image={'https://firebasestorage.googleapis.com/v0/b/recetassaludables-1af0b.appspot.com/o/images%2F'+
    elem.camponombre+'?alt=media&token=9055b467-b88d-483c-b097-1970b52aa037'} /> 
    <CardHeader title={`${elem.camponombre}`} 
    subheader={`Complejidad : ${elem.campocomplejidad}`} /> 
    <CardContent> {`Calorias : ${elem.campoCalorias}`}
    <div/> {`Grasas saturadas : ${elem.campoGrasas}`}
    <div/> {`Carbohidratos : ${elem.campoCarbohidratos}`} 
    </CardContent> 
    <CardActions> 

      </CardActions> 
      </Card> 
      </Grid> )) );

 // const indexOfLastPost = currentPage * postsPerPage;
 // //const indexOfFirstPost = indexOfLastPost - postsPerPage;
 // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'></h1>
      {tarjetas()}
     
    </div>
  );
};

export default RecetasFavoritas;