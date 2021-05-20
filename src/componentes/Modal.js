import React, {
  useEffect,
  useState,
} from 'react';

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
  console.log('mht')
  
  const [ingredientesReceta,setIngredientesReceta]=useState([]);
  const [detalleReceta, setDetalleReceta]=useState([]);
  useEffect(()=>{getDatosReceta()},[]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
   const getDatosReceta=async()=>{
            var obj;
            var lista=[];         
   const consultaIngredientes=await db.collection("ingrediente-receta").where('nombreReceta','==',props.nombre).get();
   consultaIngredientes.forEach((doc) => { 
       obj=doc.data();
       obj.id=doc.id;
       lista.push(obj);
     })
      setIngredientesReceta(lista);
    var obj2;
    var lista2=[];   
   const consultaDetalleReceta=await db.collection("receta").where('camponombre','==',props.nombre).get();
   consultaDetalleReceta.forEach((doc) => { 
       obj2=doc.data();
       obj2.id=doc.id;
       lista2.push(obj);
     })
   setDetalleReceta(lista2);

   console.log('lista de ingredientes')
   console.log(ingredientesReceta)
    console.log(detalleReceta)
}
 const getListaIngredientes=()=>{
var respuesta='';
ingredientesReceta.map((item)=>
  respuesta=respuesta+'\n\r'+'-'+item.cantidad+' '+item.unidades+' de '+item.name)
console.log(respuesta)
return respuesta;

 }
  return (
    <div>
      <Button style={{ backgroundColor: "#20603d",color:"#ffffff"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Ver receta
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Receta: {props.nombre}
        </DialogTitle>
        <DialogContent dividers>
        <Paper variant="outlined"><img src={props.imagen} /> </Paper>
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
          {getListaIngredientes()}
        <Typography variant='h6' component='h2' gutterBottom>
            Pasos de elaboración:
          </Typography>
          <Typography gutterBottom>
            {props.descripcion}
          </Typography>

        </DialogContent>
      </Dialog>
    </div>
  );
}
