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
} from '@material-ui/core/';
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
  else{return '';}
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
if(nombreReceta=item.nombreReceta){
contador++;
}
})
if (contador==entero){
return true; 
}
else{return false;}
}

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

  const classes = useStyles();
  const data = {
    name: [
      { 
        com: "sopa", complejidad: 1, cal: 1, grasas:1, carb:1 , img:
      "https://images.unsplash.com/photo-1564135624576-c5c88640f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80" 
    },
      { 
        com: "papa", complejidad: 2, cal: 72, grasas:2, carb:2 ,img:
      "https://cdn.wccftech.com/wp-content/uploads/2021/02/xiaogenshin.jpg" 
    },
      { 
        com: "torta", complejidad: 3, cal: 37, grasas:3, carb:3 ,img:
      "https://images.unsplash.com/photo-1468774871041-fc64dd5522f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80"
    },
      { 
        com: "milanesa", complejidad: 4, cal:46, grasas:4, carb:4, img:
      "data:image/jpeg;base64,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"
    },
      { 
        com: "agua hervida", complejidad:5, cal:58, grasas:5, carb:5, img:
      "https://images.unsplash.com/photo-1564198879220-63f2734f7cec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2072&q=80" 
    },
    ],
    id: [1]};
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
    {tarjetasRecetas()}
    </div>
    
  );
  
}