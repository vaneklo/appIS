import React, {
  useEffect,
  useState,
} from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { db } from '../formularioRegistro/firebase';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Modal(props) {
  var nombreReceta=props.nombre
  const [ingredientesReceta,setIngredientesReceta]=useState([]);
  const [detalleReceta, setDetalleReceta]=useState([]);
  const [estadoBotonFavorito,setearRecetasFavoritas]=useState(false);
  const {user,isAuthenticated} =useAuth0();

  const[recetas,setRecetas]=useState([]);
 const [texto,setTexto]=useState('receta no guardada');
 const [rol,setRol]=useState('');

useEffect(()=>{getDatosReceta()},[]);
useEffect(()=>{cargarEstadoDeFavorito()},[])
useEffect(()=>{console.log("isauth");getRecetasFavoritas();},[props.nombre])
useEffect(()=>{cargarRol()},[isAuthenticated])

const getRecetasFavoritas = async () => {
  console.log('consultas')
if(isAuthenticated){
  var objRecetas;
  var datosRecetas=[];
const consultarRecetasFavoritas=await db.collection("receta-usuario").where('correoElectronico','==',user.email).get();
consultarRecetasFavoritas.forEach((doc) => {
    objRecetas=doc.data();
    objRecetas.id=doc.id;
    datosRecetas.push(objRecetas.camponombre);})
    console.log(datosRecetas)
    var index = datosRecetas.map(item=>item).indexOf(props.nombre);
    console.log(index)
    if(index>=0){setTexto('receta guardada');}
            else{setTexto('receta no guardada')}  
  }
}

const cargarRol=async()=>{
  if(isAuthenticated)
  {
  var objt;
  var roles=[];
  console.log('cargando rol');
  console.log(isAuthenticated)
  const consultaDatosRol=await db.collection("usuario").where('correoElectronico','==',user.email).get();
  consultaDatosRol.forEach((doc) => {
      if(consultaDatosRol!=null){
        objt=doc.data();
        objt.id=doc.id;
        roles.push(objt);}})
        setRol(roles[0].rol);
        console.log(rol);
}

}
  const [open, setOpen] = React.useState(false);
/*
   const cargarEstadoDeFavorito=()=>{
     //ya estan las recetas
    var index = recetas.map(item=>item.camponombre).indexOf(props.nombre)
    console.log(index)
    if(index>0){setTexto('receta guardada');
    return (
       <button key={props.nombre} onClick={()=>guardarRecetaParaElUsuario()}>{texto}</button>
          );
              }
    else{ setTexto('receta no guardada')
      return (
        <button key={props.nombre} onClick={()=>guardarRecetaParaElUsuario()}>{texto}</button>
             );
        }           
   }
*/const cargarEstadoDeFavorito=()=>{
  console.log(recetas)
  
  var index = recetas.map(item=>item).indexOf(props.nombre);

  console.log(index)
  if(index>=0){setTexto('receta guardada');}
          else{setTexto('receta no guardada')}             
 }
const guardarRecetaParaElUsuario=()=>{
 if(isAuthenticated){
   if(rol=='cliente'){
       if(texto=='receta guardada'){alert('la receta ya fue guardada en favoritos')}
       else{
        setTexto('receta guardada');
        console.log(texto);
       db.collection('receta-usuario').doc().set({ 
       correoElectronico:user.email,
       camponombre:props.nombre});
       alert("receta guardada en favoritos"); 
   }
   }else{
     alert("Solo los clientes pueden guardar recetas");
   }
                    }
 else{alert('registrate para guaradar recetas')}
}
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
   const getDatosReceta=async()=>{
     var objt;
     var listat=[];      
     const consultaTodosIngredientes=await db.collection("ingrediente-receta").get();
     consultaTodosIngredientes.forEach((doc) =>{ 
     objt=doc.data();
     objt.id=doc.id;
     listat.push(objt);
     })
    setIngredientesReceta(listat);
    var obj2;
    var lista2=[];   
   const consultaDetalleReceta=await db.collection("receta").where('camponombre','==',nombreReceta).get();
   consultaDetalleReceta.forEach((doc) => { 
       obj2=doc.data();
       obj2.id=doc.id;
       lista2.push(obj2);
     })
   setDetalleReceta(lista2);  
}

const getIngredientes=(nombreReceta)=>{
const ingredientesDeReceta=ingredientesReceta.filter((item)=>{
if(item.nombreReceta==nombreReceta){return true;}
else {return false;}
})
return (
   ingredientesDeReceta.map((item)=>
  <div>
      <label key={item.cantidad+item.nombre}>{'-'+item.cantidad+' '+item.unidades+' de '+item.name}</label>
       <br></br>
  </div>
  )
)
}
  return (
    <div>
      <Button style={{ backgroundColor: "#20603d",color:"#ffffff"}} 
      variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver receta
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Receta: {props.nombre}
        </DialogTitle>
        <DialogContent dividers>
        <Paper variant="outlined"><img src={'https://firebasestorage.googleapis.com/v0/b/respaldo-e5d0a.appspot.com/o/images%2F'+props.nombre+'?alt=media&token=f3ebf252-23fe-4a07-8656-c30d351fa9f1'} /> </Paper>
        <Typography gutterBottom>
            Complejidad: {props.complejidad}
          </Typography>
          <Typography gutterBottom>
            Calorias: {props.calorias +' kcal'} <br/>
            Grasas saturadas: {props.grasas+' gr'} <br/>
            Carbohidratos: {props.carbohidratos+' gr'} <br/>
          </Typography>
          <Typography variant='h6' component='h2' gutterBottom>
            Ingredientes:
          </Typography>
          {getIngredientes(props.nombre)}
          
        <Typography variant='h6' component='h2' gutterBottom>
            Pasos de elaboración:
          </Typography>
          <Typography gutterBottom>
            {props.descripcion}
          </Typography>
          <Button style={{ backgroundColor: "#20603d",color:"#ffffff"}} 
         variant="outlined" color="primary" onClick={()=>guardarRecetaParaElUsuario()}>{texto}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
