import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Receta from '../prevRecetas/Receta';
import Paper from '@material-ui/core/Paper';


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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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
            Calorias: {props.calorias} <br/>
            Grasas saturadas: {props.grasas} <br/>
            Carbohidratos: {props.carbohidratos} <br/>
          </Typography>
          <Typography variant='h6' component='h2' gutterBottom>
            Ingredientes:
          </Typography>
          {props.ingredientes}
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
