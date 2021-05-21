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
 // console.log(firebase.storage().ref('images').child('Pollo a la broaster').getDownloadURL());
  const classes = useStyles();
  const clickModal = () => {
  }

///////este es el parametro de busqueda de base de datos
  const listaIngredientesSolicitados=[...props.buscar];
///cambialo por el valor de props 


  const[ResultadoBusquedaRecetas,setResultadoBusquedaRecetas]=useState([]);
  const[ResultadoBusquedaRecetas100,setResultadoBusquedaRecetas100]=useState([]);
   

  useEffect(()=>{
    lisIngredientes = listaIngredientesSolicitados;
    getResultadoBusquedaRecetas();
  },[...listaIngredientesSolicitados])
  
  const cumpleTodosIngredientes=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
  var contador=0;
  console.log("juuan pasadsa");
  console.log(arreglo);
  arreglo.map((item)=>{
  if(nombreIngrediente=item.name && nombreReceta==item.nombreReceta){contador++;}})
  if (contador==entero){return true;}
  else{return false;} }


  const cumpleMitadIngredientes=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
    var contador=0;
    arreglo.map((item)=>{
    if(nombreIngrediente=item.name && nombreReceta==item.nombreReceta){
      contador++;
        }})
    if ((contador==entero/2 ||contador==(entero/2)+0.5  ||contador==(entero/2)+1 ) && (contador!=entero)){return true;}
    else{
      console.log('nononoono')
      return false;}}
  
  const cumpleMayoria=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
        var contador=0;
        arreglo.map((item)=>{
        if(nombreIngrediente=item.name && nombreReceta==item.nombreReceta){contador++;}})
        if ((contador==entero-1 ||contador==entero-2 ||contador==entero-3 ) && (contador!=entero/2 ||contador!=(entero/2)+1 ||contador!=(entero/2)+0.5 )){return true;}
        else{
          console.log('nononoono')
          return false;}}

  const getDatosReceta=async(nombre)=>{
    var obj2;
    var respuesta=[];
    const consulta=await db.collection("receta").where('camponombre','==',nombre).get();
    consulta.forEach((doc) => {
      if(consulta!=null){
     obj2=doc.data();
     obj2.id=doc.id;
     respuesta.push(obj2);
     return obj2;
      }
      })
  }

  const getResultadoBusquedaRecetas=async()=>{
    var obj;    
    var listaRecetas=[];
    var objt;
    var recetasTotales=[];
    var listaNombresRecetas100porciento=[];
    var listaNombresRecetas50porciento=[];
    var listaNombresRecetas1=[];
    var listaNombresRecetas75porciento=[];
    var ArregloRecetas100=[];
    var ArregloRecetas50=[];
    var ArregloRecetas1=[];
    var ArregloRecetas75=[];
    //la consulta en general
    const consultaCoincidencias=await db.collection("ingrediente-receta").where('name','in',listaIngredientesSolicitados).get();
    const consultaTotal=await db.collection("receta").get();
    consultaTotal.forEach((doc) => {
      if(consultaTotal!=null){
     objt=doc.data();
     objt.id=doc.id;
     recetasTotales.push(objt);
                              }
                                     })
     console.log('todoooooo')                                  
     console.log(recetasTotales);
     console.log('todoooooo')
      
    consultaCoincidencias.forEach((doc) => { 
        obj=doc.data();
        obj.id=doc.id;
        listaRecetas.push(obj);
      })

      console.log('consultar coincidencias')  
      console.log(listaRecetas);
      console.log('consultar coincidencias') 

      //recetas que tengan el 100 por ciento
      listaRecetas.map((receta)=>{
         if(cumpleTodosIngredientes(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){          
          console.log('si 100')
           listaNombresRecetas100porciento.push(receta.nombreReceta);   
           //obtener sus datos y agregarlo al arreglo
          //recetasTotales.indexOf(receta.nombreReceta)
          console.log(receta.nombreReceta)
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          console.log(index)
          //agrego todos los datos de la receta que cumple el 100 porciento
             if(!ArregloRecetas100.includes(recetasTotales[index])){
           ArregloRecetas100.push(recetasTotales[index])}
         }
         else{console.log('no 100')}
         })
        console.log('lista al 100aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ')
        console.log(listaNombresRecetas100porciento)
        console.log(ArregloRecetas100)
        console.log('lista al 100 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
     //recetas que tengan el 100 por ciento

     //recetas que tengan el 50 por ciento
     listaRecetas.map((receta)=>{
       console.log(listaIngredientesSolicitados.length/2)
      if(cumpleMitadIngredientes(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
        if(!listaNombresRecetas50porciento.includes(receta.nombreReceta)){
          console.log('si 50 ');
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          console.log(index)
          if(!ArregloRecetas50.includes(recetasTotales[index])){ArregloRecetas50.push(recetasTotales[index])}

          listaNombresRecetas50porciento.push(receta.nombreReceta);
               }
      }
      else{console.log('no 50 ')}
      })
      console.log('lista de 50bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
      console.log(ArregloRecetas50)
      console.log('lista de 50bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    //recetas que tengan el 50 por ciento

    //recetas que tengan 1 ingrediente
    listaRecetas.map((receta)=>{
      console.log('1')
          if(!listaNombresRecetas1.includes(receta.nombreReceta)){
            var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
            console.log(index)
            if(!ArregloRecetas1.includes(recetasTotales[index])){ArregloRecetas1.push(recetasTotales[index])}
            listaNombresRecetas1.push(receta.nombreReceta);}
     })
     console.log('lista de 1ccccccccccccccccccccccccccccccccccc')
     console.log(ArregloRecetas1)
     console.log('lista de 1ccccccccccccccccccccccccccc')
    //recetas que tengan 1 ingrediente

    //recetas que tengan el 75 y mas por ciento
       listaRecetas.map((receta)=>{
        console.log(75)
       if(cumpleMayoria(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
         if(!listaNombresRecetas75porciento.includes(receta.nombreReceta)){
          listaNombresRecetas75porciento.push(receta.nombreReceta);
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          console.log(index)
          if(!ArregloRecetas75.includes(recetasTotales[index])){ArregloRecetas75.push(recetasTotales[index])      }
          
           console.log('si 75 ');}
       }
       else{console.log('no 75 ')}
       })
       console.log('lista de 75ddddddddddddddddddddddddddddddd')
       console.log(ArregloRecetas75)
       console.log('lista de 75dddddddddddddddddddddddd')
     //recetas que tengan el 75 y mas por ciento




     //var obj2;
     //var arrayRecetas100=[];
     //const consultarDatosRecetas100= await db.collection("receta").orderBy("campocomplejidad", "asc").where('camponombre','in',listaNombresRecetas100porciento).get();
     //consultarDatosRecetas100.forEach((doc) => { 
      // if(consultarDatosRecetas100!=null){
      //console.log(consultarDatosRecetas100)
      //obj2=doc.data();
      //obj2.id=doc.id;
      //arrayRecetas100.push(obj2);
      // }
      // })
    setResultadoBusquedaRecetas(ArregloRecetas100);
    //setResultadoBusquedaRecetas100(ArregloRecetas100);
    
    console.log(ResultadoBusquedaRecetas)

    }
      
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
