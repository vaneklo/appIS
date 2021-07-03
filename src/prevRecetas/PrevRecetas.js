import React, {
  useEffect,
  useState,
} from 'react';

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
import { db } from '../formularioRegistro/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    
    justifyContent: 'space-around',
    flexGrow: 1,
    padding: theme.spacing(4),
    height: "550px",
    width: "280px",
    backgroundColor:'#f5efd7',
    
  },
  gridList: {
    flexWrap: 'nowrap',
    
    transform: 'translateZ(0)',
    height: "650px",
  },
  resu: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }
}));

var lisIngredientes;
 /*
function changeBackground(color) {
  document.body.style.background = color;
}
window.addEventListener("load",function() { changeBackground('#bdecb6') });*/

export default function PrevRecetas(props) {
  const[listaIngredientesSolicitados,setListaIngredientesSolicitados]=useState(props.buscar);
  const classes = useStyles();
  const[listaPerfecta, setListaPerfecta]=useState([]);
  const[listaRecetasSemiPerfectas, setListaSemiPerfecta]=useState([]);
  const clickModal = () => {
  }
///////este es el parametro de busqueda de base de datos
//const listaIngredientesSolicitados=[...props.buscar];

///cambialo por el valor de props 


  const[verEncabezado100,setVerEncabezado100]=useState(true);
  const[verEncabezadoRecomendaciones,setVerEncabezadoRecomendaciones]=useState(true);

  const[ResultadoBusquedaRecetas,setResultadoBusquedaRecetas]=useState([]);
  const[ResultadoBusquedaRecetas50,setResultadoBusquedaRecetas50]=useState([]);
  const[ResultadoBusquedaRecetas1,setResultadoBusquedaRecetas1]=useState([]);
 useEffect(()=>setListaIngredientesSolicitados(props.buscar),[props.buscar]);
 useEffect(()=>getResultadoBusquedaRecetas(),[props.buscar,listaIngredientesSolicitados]);
  




  const cumpleTodosIngredientes=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
  var contador=0;
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
      return false;}}
  
  const cumpleMayoria=(entero,nombreIngrediente,nombreReceta,arreglo)=>{
        var contador=0;
        arreglo.map((item)=>{
        if(nombreIngrediente=item.name && nombreReceta==item.nombreReceta){contador++;}})
        if ((contador==entero-1 ||contador==entero-2 ||contador==entero-3 ) && (contador!=entero/2 ||contador!=(entero/2)+1 ||contador!=(entero/2)+0.5 )){return true;}
        else{
          return false;}}

  const getDatosReceta=async(nombre)=>{
    console.log("getdatosreceta")
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
    const consultaTotal=await db.collection("receta").orderBy("campocomplejidad", "asc").get()
    consultaTotal.forEach((doc) => {
      if(consultaTotal!=null){
     objt=doc.data();
     objt.id=doc.id;
     recetasTotales.push(objt);
                              }
                                     })
    consultaCoincidencias.forEach((doc) => { 
        obj=doc.data();
        obj.id=doc.id;
        listaRecetas.push(obj);
      })
   
      //recetas que tengan el 100 por ciento
      listaRecetas.map((receta)=>{
         if(cumpleTodosIngredientes(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
           listaNombresRecetas100porciento.push(receta.nombreReceta);   
           //obtener sus datos y agregarlo al arreglo
          //recetasTotales.indexOf(receta.nombreReceta)
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          //agrego todos los datos de la receta que cumple el 100 porciento
             if(!ArregloRecetas100.includes(recetasTotales[index])){
           ArregloRecetas100.push(recetasTotales[index])}
         }
         })
         //console.log(ArregloRecetas100);
        // setVerEncabezado100(false);
       //  if(ArregloRecetas100.length<1){return setVerEncabezado100(false);}
         
     //recetas que tengan el 100 por ciento

     //recetas que tengan el 50 por ciento
     listaRecetas.map((receta)=>{
      if(cumpleMitadIngredientes(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
        if(!listaNombresRecetas50porciento.includes(receta.nombreReceta)){
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          if(!ArregloRecetas50.includes(recetasTotales[index])){ArregloRecetas50.push(recetasTotales[index])}
               if(ArregloRecetas100.includes((recetasTotales[index]))){
                listaNombresRecetas50porciento.push(receta.nombreReceta);
               }     
               }
             }
      else{

      }
      })
      
    //recetas que tengan el 50 por ciento

    //recetas que tengan 1 ingrediente
    listaRecetas.map((receta)=>{
          if(!listaNombresRecetas1.includes(receta.nombreReceta)){
            var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
            if(!ArregloRecetas1.includes(recetasTotales[index])){
              ArregloRecetas1.push(recetasTotales[index])}
            listaNombresRecetas1.push(receta.nombreReceta);}
     })
    //recetas que tengan 1 ingrediente

    //recetas que tengan el 75 y mas por ciento
       listaRecetas.map((receta)=>{
       if(cumpleMayoria(listaIngredientesSolicitados.length,receta.name,receta.nombreReceta,listaRecetas)){
         if(!listaNombresRecetas75porciento.includes(receta.nombreReceta)){
          listaNombresRecetas75porciento.push(receta.nombreReceta);
          var index = recetasTotales.map(item=>item.camponombre).indexOf(receta.nombreReceta)
          if(!ArregloRecetas75.includes(recetasTotales[index])){ArregloRecetas75.push(recetasTotales[index])      }
          
           ;}
       }
       else{
         
       }
       })
       
     //recetas que tengan el 75 y mas por ciento




     //var obj2;
     //var arrayRecetas100=[];
     //const consultarDatosRecetas100= await db.collection("receta").orderBy("campocomplejidad", "asc").where('camponombre','in',listaNombresRecetas100porciento).get();
     //consultarDatosRecetas100.forEach((doc) => { 
      // if(consultarDatosRecetas100!=null){
      //obj2=doc.data();
      //obj2.id=doc.id;
      //arrayRecetas100.push(obj2);
      // }
      // })
     // const[ResultadoBusquedaRecetas,setResultadoBusquedaRecetas]=useState([]);
    //  const[ResultadoBusquedaRecetas50,setResultadoBusquedaRecetas50]=useState([]);
     // const[ResultadoBusquedaRecetas1,setResultadoBusquedaRecetas1]=useState([]);
     ArregloRecetas100.sort((a,b)=>
     {
      const nomA=a.camponombre.toLowerCase();
      const nomB=b.camponombre.toLowerCase();
      if(nomA<nomB){return -1;}
      if(nomA>nomB){return 1;}
      return 0;
     })

     ArregloRecetas100.sort((a,b)=>
     {
      const complejA=a.campocomplejidad;
      const complejB=b.campocomplejidad;
     
      if(complejA<complejB){return -1;}
      if(complejA>complejB){return 1;}
      return 0;
     }) 

     ArregloRecetas100.sort((a,b)=>
     {
      const complejA=a.campoCantidadIngredientes;
      const complejB=b.campoCantidadIngredientes;
      if(complejA<complejB){return -1;}
      if(complejA>complejB){return 1;}
      return 0;
     }) 

     ArregloRecetas50.sort((a,b)=>
     {
      const nomA=a.camponombre.toLowerCase();
      const nomB=b.camponombre.toLowerCase();
      if(nomA<nomB){return -1;}
      if(nomA>nomB){return 1;}
      return 0;
     })

     ArregloRecetas50.sort((a,b)=>
     {
       const complejA=a.campocomplejidad;
       const complejB=b.campocomplejidad;
      if(complejA<complejB){return -1;}
      if(complejA>complejB){return 1;}
      return 0;
     }) 

     ArregloRecetas1.sort((a,b)=>
     {
      const nomA=a.camponombre.toLowerCase();
      const nomB=b.camponombre.toLowerCase();
      if(nomA<nomB){return -1;}
      if(nomA>nomB){return 1;}
      return 0;
     })

     ArregloRecetas1.sort((a,b)=>
     {
       const complejA=a.campocomplejidad;
       const complejB=b.campocomplejidad;
      if(complejA<complejB){return -1;}
      if(complejA>complejB){return 1;}
      return 0;
     }) 
  

    setResultadoBusquedaRecetas(ArregloRecetas100);
     if(ArregloRecetas50.length!=0){setResultadoBusquedaRecetas50(ArregloRecetas50);     }
    else{
      setResultadoBusquedaRecetas50(ArregloRecetas1);}
    
      var resListaPerfecta=[];
      var resListaCPerfecta=[];
      ArregloRecetas100.map((receta)=>{
      if(receta.campoCantidadIngredientes==listaIngredientesSolicitados.length){resListaPerfecta.push(receta);}
      else{resListaCPerfecta.push(receta);}
      })
      setListaPerfecta(resListaPerfecta);
      //setListaSemiPerfecta(resListaCPerfecta);
      if(resListaCPerfecta.length>0){
        setListaSemiPerfecta(resListaCPerfecta);    
      }
      else{ 
        setListaSemiPerfecta(ArregloRecetas1);}
    //setResultadoBusquedaRecetas100(ArregloRecetas100);
    }
    const mapeoListaPerfecta=()=>( listaPerfecta.map((elem) => 
    ( <Grid item xs={3} key={listaPerfecta.id}> 
    <Card className={classes.root}> 
    <CardMedia style = {{ height: 0, paddingTop: '56%'}} 
    className={classes.cardMedia} 
    image={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+
    elem.camponombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} /> 
    <CardHeader title={`${elem.camponombre}`} 
    subheader={`Complejidad : ${elem.campocomplejidad}`} /> 
    <CardContent> {`Calorias : ${elem.campoCalorias}`}
    <div/> {`Grasas saturadas : ${elem.campoGrasas}`}
    <div/> {`Carbohidratos : ${elem.campoCarbohidratos}`} 
    </CardContent> 
    <CardActions> 
      <Modal ingredientes={lisIngredientes} rol={props.rol}
      imagen={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+
      elem.camponombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} complejidad={elem.campocomplejidad} 
      calorias={elem.campoCalorias} grasas={elem.campoGrasas} carbohidratos={elem.campoCarbohidratos} 
      nombre={elem.camponombre} descripcion={elem.campodescripcion}/> 
      </CardActions> 
      </Card> 
      </Grid> )) );



      const mapeoListaSugerencias=()=>(listaRecetasSemiPerfectas.map((elem) =>
      ( <Grid item xs={3} key={listaRecetasSemiPerfectas.id}> 
      <Card className={classes.root}> 
      <CardMedia style = {{ height: 0, paddingTop: '56%'}}
       className={classes.cardMedia} 
       image={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+
       elem.camponombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} /> 
       <CardHeader title={`${elem.camponombre}`} 
       subheader={`Complejidad : ${elem.campocomplejidad}`} /> 
       <CardContent> {`Calorias : ${elem.campoCalorias}`}
       <div/> {`Grasas saturadas : ${elem.campoGrasas}`}
       <div/> {`Carbohidratos : ${elem.campoCarbohidratos}`} 
       </CardContent>
        <CardActions> 
         <Modal ingredientes={lisIngredientes} rol={props.rol}
         imagen={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+
         elem.camponombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} 
         complejidad={elem.campocomplejidad} 
         calorias={elem.campoCalorias} 
         grasas={elem.campoGrasas} 
         carbohidratos={elem.campoCarbohidratos} 
         nombre={elem.camponombre} 
         descripcion={elem.campodescripcion}/> </CardActions> </Card> </Grid> )) );

     
     /*
         const tarjetasRecetas50porciento=()=>(
        ResultadoBusquedaRecetas50.map((elem) => (
        <Grid  item xs={3} key={ResultadoBusquedaRecetas.id}>
            <Card className={classes.root}>
                <CardMedia style = {{ height: 0, paddingTop: '56%'}}
                    className={classes.cardMedia}
                    image={'https://firebasestorage.googleapis.com/v0/b/recetassaludables-1af0b.appspot.com/o/images%2F'+elem.camponombre+'?alt=media&token=9055b467-b88d-483c-b097-1970b52aa037'}
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
                 <Modal ingredientes={lisIngredientes} image={'https://firebasestorage.googleapis.com/v0/b/recetassaludables-1af0b.appspot.com/o/images%2F'+elem.camponombre+'?alt=media&token=9055b467-b88d-483c-b097-1970b52aa037'} complejidad={elem.campocomplejidad} calorias={elem.campoCalorias} grasas={elem.campoGrasas} carbohidratos={elem.campoCarbohidratos} nombre={elem.camponombre} descripcion={elem.campodescripcion}/>
                </CardActions>
            </Card>
          </Grid>
     
      ))
  );*/


  
     /*agrege el hidden para que, de no mostrarse ninguna coincidencia no apareciera*/

      if(listaPerfecta.length>0)
      {return (
      <div>
            <div className={classes.resu} hidden={!verEncabezado100} >{"Recetas con todos sus ingredientes:"}</div><br></br>
            <GridList className={classes.gridList} cols={2.5}
            container
            spacing={35}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {mapeoListaPerfecta()}
            </GridList><br></br>
            <div className={classes.resu} hidden={!verEncabezadoRecomendaciones}>{"sugerencias"}</div><br></br>
            <GridList className={classes.gridList} cols={2.5}
            container
            spacing={35}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >  
            {mapeoListaSugerencias()
      }
            </GridList>  
            </div>
      );
      }else{
      return(
      <div>
            <div className={classes.resu} hidden={!verEncabezado100} >{"no encontramos todos los ingredientes, sugerencias"}</div><br></br>
            <GridList className={classes.gridList} cols={2.5}
            container
            spacing={35}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {mapeoListaSugerencias()}
            </GridList><br></br>
            )
            </div>
         )   }}
        
         ;