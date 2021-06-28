import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    GridList,}from '@material-ui/core/';
import { isElement } from 'react-dom/test-utils';
import { makeStyles } from '@material-ui/core/styles';
import ModalFavoritos from './ModalFavoritos';
const Tarjetas=({listaFavoritos,loading})=>
{  
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

    const classes = useStyles();
    

return(
<div>{
(listaFavoritos.map(elem =>
      (
      <Card className={classes.root}> 
      <CardMedia style = {{ height:0, paddingTop: '56%'}}
       className={classes.cardMedia} 
       image={'https://firebasestorage.googleapis.com/v0/b/recetassaludables-1af0b.appspot.com/o/images%2F'+
       elem.camponombre+'?alt=media&token=9055b467-b88d-483c-b097-1970b52aa037'} /> 
       <CardHeader title={`${elem.camponombre}`} 
       subheader={`Complejidad : ${elem.campocomplejidad}`} /> 
       <CardContent> {`Calorias : ${elem.campoCalorias}`}
       <div/> {`Grasas saturadas : ${elem.campoGrasas}`}
       <div/> {`Carbohidratos : ${elem.campoCarbohidratos}`} 
       </CardContent>
       <CardActions> 
         <ModalFavoritos
         imagen={'https://firebasestorage.googleapis.com/v0/b/recetassaludables-1af0b.appspot.com/o/images%2F'+
         elem.camponombre+'?alt=media&token=9055b467-b88d-483c-b097-1970b52aa037'} 
         complejidad={elem.campocomplejidad} 
         calorias={elem.campoCalorias} 
         grasas={elem.campoGrasas} 
         carbohidratos={elem.campoCarbohidratos} 
         nombre={elem.camponombre} 
         descripcion={elem.campodescripcion}/> </CardActions>
         </Card> 
         )
         )
         )}         
</div>
);


}
export default Tarjetas;