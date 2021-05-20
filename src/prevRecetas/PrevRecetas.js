import React, {
  useEffect,
  useState,
} from 'react';

import firebase from 'firebase';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from '@material-ui/core/';
//import Receta from './Receta';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '../componentes/Modal';
import { db } from '../formularioRegistro/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
    height: "600px",
    backgroundColor:'#f5efd7',
  }
}));

var lisIngredientes;
 
function changeBackground(color) {
  document.body.style.background = color;
}

window.addEventListener("load",function() { changeBackground('#bdecb6') });

export default function PrevRecetas(props) {
  console.log(firebase.storage().ref('images').child('Pollo a la broaster').getDownloadURL());
  const classes = useStyles();
  
  const clickModal = () => {
  }
  //usar variable de ventana para que al presionar f5 no se pierda la info
  const getValoresInicialesListaIngredientesSolicitados=()=>{
    var resultado=window.localStorage.getItem('ingredientesSeleccionados');
    if(resultado!=null){
    return resultado;  
    }
    else{return'';}
  }
  ////
  //const listaIngredientesSolicitados=getValoresInicialesListaIngredientesSolicitados();
  /////////////////////////////////////////////////////////////////////

///////este es el parametro de busqueda de base de datos
  const listaIngredientesSolicitados=[...props.buscar];
///cambialo por el valor de props 

  ////////////////
  const[ResultadoBusquedaRecetas,setResultadoBusquedaRecetas]=useState([]);
  useEffect(()=>{
    lisIngredientes = listaIngredientesSolicitados;
    getResultadoBusquedaRecetas();
  },[...listaIngredientesSolicitados])
  
  const cumpleTodosIngredientes=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
  var contador=0;
  arreglo.map((item)=>{
  if(nombreIngrediente=item.name && nombreReceta==item.nombreReceta){contador++;}})

  if (contador==entero){return true;}
  else{return false;} }
  const getResultadoBusquedaRecetas=async()=>{
    var obj;    
    var listaRecetas=[];
    var listaNombresRecetas=[];
    var obj2;
    var arrayRecetas=[];
    console.log("VIWENES");
    const consultaCoincidencias=await db.collection("ingrediente-receta").where('name','in',listaIngredientesSolicitados).get();
    console.log("VIERNES");
    consultaCoincidencias.forEach((doc) => { 
        obj=doc.data();
        obj.id=doc.id;
        listaRecetas.push(obj);          
      })
      console.log(listaRecetas);
      listaRecetas.map((receta)=>{
         if(cumpleTodosIngredientes(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
           console.log('si')
          listaNombresRecetas.push(receta.nombreReceta);
         }
         else{console.log('no')}
         })
        console.log(listaNombresRecetas)
    const consultarDatosRecetas= await db.collection("receta").where('camponombre','in',listaNombresRecetas).get();
     consultarDatosRecetas.forEach((doc) => { 
       if(consultarDatosRecetas!=null){
      console.log(consultarDatosRecetas)
      obj2=doc.data();
      obj2.id=doc.id;
      arrayRecetas.push(obj2);
       }
       })
       
     setResultadoBusquedaRecetas(arrayRecetas);
     console.log(ResultadoBusquedaRecetas);
      }
      console.log(ResultadoBusquedaRecetas);

      ///////////////////////////
      const tarjetasRecetas=()=>(
        
         
            ResultadoBusquedaRecetas.map((elem) => (
            <Grid  item xs={3} key={ResultadoBusquedaRecetas.id}>
                <Card className={classes.root}>
                    <CardMedia style = {{ height: 0, paddingTop: '56%'}}
                        className={classes.cardMedia}
                        image={'https://firebasestorage.googleapis.com/v0/b/recetas-saludables-69ee9.appspot.com/o/images%2F'+elem.camponombre+'?alt=media&token=29474796-b79f-4657-b87a-21ae8097e5de'}
                      /> 
                      <CardHeader
                        title={`${elem.camponombre}`}
                        subheader={`Complejidad : ${elem.campocomplejidad}`}
                      />
                      <CardContent>
                      {`Calorias : ${elem.campoCalorias}`}<div/> 
                      {`Grasas saturadas : ${elem.campoGrasas}`}<div/>
                      {`Carbohidratos : ${elem.campoCarbohidratos}`}
                  </CardContent>
                  <CardActions>
                     <Modal ingredientes={lisIngredientes} imagen={'https://firebasestorage.googleapis.com/v0/b/recetas-saludables-69ee9.appspot.com/o/images%2F'+elem.camponombre+'?alt=media&token=29474796-b79f-4657-b87a-21ae8097e5de'} complejidad={elem.campocomplejidad} calorias={elem.campoCalorias} grasas={elem.campoGrasas} carbohidratos={elem.campoCarbohidratos} nombre={elem.camponombre} descripcion={elem.campodescripcion}/>
                    </CardActions>
                </Card>
              </Grid>
         
          ))
       
      );
    return (         
   
      <Grid
      container
      spacing={4}
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
    >
      {tarjetasRecetas()}
      </Grid>  
    );
}
