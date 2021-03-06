import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import ModalFavoritos from './ModalFavoritos';
const Tarjetas=({listaFavoritos,loading})=>
{     console.log(listaFavoritos);
     const useStyles = makeStyles((theme) => ({
      root: {
        justifyContent: 'space-around',
        flexGrow: 1,
        padding: theme.spacing(4),
        height: "500px",
        width: "350px",
        backgroundColor:'#f5efd7',
        
      },
    resu: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },clasediv: {
      flexGrow: 1,
      padding: theme.spacing(2)
  }
  }));

    const classes = useStyles();
    
return(

<div className={classes.clasediv}>
  <Grid
  container
  spacing={4}
  direction="row"
  justify="flex-start"
  alignItems="flex-start"
>{
(listaFavoritos.map(elem =>
      (
      <Grid item xs={4} key={elem.id}> 
      <Card className={classes.root}> 
      <CardMedia style = {{ height:0, paddingTop: '56%'}}
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
         <ModalFavoritos
image={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+
elem.camponombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} 
         complejidad={elem.campocomplejidad} 
         calorias={elem.campoCalorias} 
         grasas={elem.campoGrasas} 
         carbohidratos={elem.campoCarbohidratos} 
         nombre={elem.camponombre} 
         descripcion={elem.campodescripcion}/> </CardActions>
         </Card> </Grid>)
         )        

         )} </Grid>
</div>
);


}
export default Tarjetas;