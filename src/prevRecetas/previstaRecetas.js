import React, {
    useEffect,
    useState,
  } from 'react';
  import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
  }
  from '@material-ui/core/';
  import { makeStyles } from '@material-ui/core/styles';
  import {db} from '../formularioRegistro/firebase'
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4)
    }
  
  }));
  export default function MediaCard() {
  //usar variable de ventana
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
  const listaIngredientesSolicitados=['queso'];
  const[ResultadoBusquedaRecetas,setResultadoBusquedaRecetas]=useState([]);
  useEffect(()=>{getResultadoBusquedaRecetas()},[])
  
  const cumpleTodosIngredientes=(entero,nombreReceta,arreglo)=>{
  var contador=0;
  arreglo.map((item)=>{
  if(nombreReceta=item.nombreReceta){contador++;}})
  if (contador==entero){return true;}
  else{return false;} }

  console.log('listaRecetas');
  const getResultadoBusquedaRecetas=async()=>{
    
    var obj;    
    var listaRecetas=[];
    var listaNombresRecetas=[];
    var obj2;
    var arrayRecetas=[];
  
    const consultaCoincidencias=await db.collection("ingrediente-receta").where('name','in',listaIngredientesSolicitados).get();
    consultaCoincidencias.forEach((doc) => { 
        obj=doc.data();
        obj.id=doc.id;
        listaRecetas.push(obj);
        console.log(listaRecetas);
      })
      

      listaRecetas.map((receta)=>{
         if(cumpleTodosIngredientes(listaIngredientesSolicitados.length,receta.nombreReceta,listaRecetas)){
          listaNombresRecetas.push(receta.nombreReceta);
         }
         })
  
     const consultarDatosRecetas= await db.collection("receta").where('camponombre','in',listaNombresRecetas).get();
     consultarDatosRecetas.forEach((doc) => { 
       if(consultarDatosRecetas!=null){
      console.log(consultarDatosRecetas)
      obj2=doc.data();
      obj2.id=doc.id;
      arrayRecetas.push(obj2);
       }
       })
       console.log(arrayRecetas);
      setResultadoBusquedaRecetas(arrayRecetas);
      }
      ///////////////////////////
    const classes = useStyles();
    const tarjetasRecetas=()=>(
      ResultadoBusquedaRecetas.map((elem) => (
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={3} key={ResultadoBusquedaRecetas.id}>
              <Card className={classes.root}>
                  <CardMedia style = {{ height: 0, paddingTop: '56%'}}
                      className={classes.cardMedia}
                     image={ "https://images.unsplash.com/photo-1564198879220-63f2734f7cec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2072&q=80" }
                    />
                    <CardHeader
                      title={`Receta : ${elem.camponombre}`}
                      subheader={`Complejidad : ${elem.campocomplejidad}`}
                    />
                    <CardContent>
                    {`Calorias : ${elem.campoCalorias}`}<div/> 
                    {`Grasas saturadas : ${elem.campoGrasas}`}<div/>
                    {`Carbohidratos : ${elem.campoCarbohidratos}`}
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                      Ver Receta
                    </Button> 
                  </CardActions>
              </Card>
            </Grid>
          )
        </Grid>
      ))
    );
    return (
      <div className={classes.root}>
      {tarjetasRecetas}
      </div>
      
    );
    
  }