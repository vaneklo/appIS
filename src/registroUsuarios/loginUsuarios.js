import React, { useContext, useState } from 'react';
import firebase from 'firebase';
import {
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useUsuario, UsuarioProvider } from '../UserContext';

const useStyles = makeStyles((theme) => ({
    formulario: {
      border: '1px solid black',
      padding: '10px',
      borderRadius: '10px',
      variant:'filled'
    }
  }));

const FormularioLoginUsuario = () => {
    const classes = useStyles();
      //const {cambiarVerRegistroUsuario,cambiarVerRegistroReceta,
    //    cambiarVerRecetasFavoritas}=useContext(useUsuario);
      const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      
      const handleChange = (prop) => (event) => {
         setValues({ ...values, [prop]: event.target.value });
        console.log(values);
      };
    
  const iniciarSesionUsuario=(e)=>{
    e.preventDefault();
    //iniciamos sesion, si tuvo exito cambiamos valores del context sino nos quedamos en la pag
    //e informamos de un error
  const authApply = firebase.auth().signInWithEmailAndPassword(values.amount,values.password)
   .then(
  user=>{
   //todo fue correcto, ahora debo cambiar los valores del contexto
   //primero debo recuperar su rol,nombre completo,del cliente y sus recetas favoritas en el context
  
  // var rol='cliente'
  // var nombreComplero='juan perez perez'
  // var correoElectronico='correo@gmail.com'
    
   
  // setDatosUsuario(nombreComplero,correoElectronico);
  // if(rol=='cliente'){
   // cambiarVerRegistroUsuario(false);
    //cambiarVerRegistroReceta(false);
   // cambiarVerRecetasFavoritas(true);
    //                  }
   //else{
     // if(rol=='administrador'){
     //   cambiarVerRegistroUsuario(false);
     //   cambiarVerRegistroReceta(true);
     //   cambiarVerRecetasFavoritas(false);
     //                           }
     //   }  

   console.log("logueo correcto");

         })
   .catch(error=>{
        //mensaje de error
       alert('usuario no encontrado,debe registrarse primero')
        //falta que el usuario no
       console.log(error);
    
    })
  


    }



return (
    <Container maxWidth='sm' >
      <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '2em' }}>
        Registro de Usuario
      </Typography>

      <form className={classes.formulario}>
        <Grid container spacing={3}>
          <Grid item sm={12} xs={12}>
            <TextField
              label="Correo"
              InputProps={{ inputProps: { maxLength: 35 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca su correo'
              name='campocorreo'
              onChange={handleChange('amount')}
             //onChange={handleInputChange}
              //value={values.camponombre}
            />

             <TextField
              label="Contraseña"
              InputProps={{ inputProps: { maxLength: 10 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca su contraseña'
              name='campocontra'

                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                InputProps={{ inputProps: { maxLength: 10 } }}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                   // onClick={handleClickShowPassword}
                   // onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
              //onChange={handleInputChange}
              //value={values.camponombre}
            />
            
          </Grid>

          <Grid item sm={12} xs={12} align="center">
          <Button 
            style={{
              backgroundColor: "#20603d",
             
          }}
            variant="contained" 
            color="primary" 
            onClick={(e)=>{iniciarSesionUsuario(e)}}
            >
              Registrar 
              </Button></Grid>

        </Grid>
      </form>


    </Container>

        )};
export default FormularioLoginUsuario;