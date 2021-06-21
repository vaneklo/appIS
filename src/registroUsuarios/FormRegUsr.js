import React from 'react';

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

import { db } from '../formularioRegistro/firebase';

const useStyles = makeStyles((theme) => ({
    formulario: {
      border: '1px solid black',
      padding: '10px',
      borderRadius: '10px',
      variant:'filled'
    }
  
  }));

const FormularioUsuario = () => {
  
    const classes = useStyles();

    
      
      const [values, setValues] = React.useState({
        nameComplete:'',
        amount: '',
        password: '',
        passwordConfirm:'',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      
      const handleChange = (prop) => (event) => {

        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
   const funcionRegistrarCliente=(e)=>{
    //agregar todas las restricciones
    const validarCorreo = (str) => {
      var pattern = new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");
      return !!pattern.test(str);
    };

    const validarNombre = (str) => {
      var pattern = new RegExp("^[a-zA-Zñáéíóú]+\\.?");
      return !!pattern.test(str);
    };

    const validarTamContra = (str) => {
    
      var tamValido=str.length>5 && str.length<=10;
      return tamValido;
    };

    const validarContraIgual = (str) => {
    
      var igual = str;
      return igual;
    };
    registrarNuevoCliente(e);



   }



  const registrarNuevoCliente=(e)=>{
    e.preventDefault();
   if(values.password==values.passwordConfirm){
     //creamos un nuevo cliente pero el contexto no debe cambiar

   const authApply = firebase.auth().createUserWithEmailAndPassword(values.amount,values.password)
   .then(user=>{//luego cambio los valores del context tambien los valores de visibilidad
    db.collection('usuario').doc().set({correoElectronico:values.amount,
                                      nombreCompleto:values.nameComplete,
                                      rol:"cliente"});
   console.log(user);})
   .catch(error=>{
     alert('el correo electronico ya esta registrado,prueba con otro')
    console.log(error);})
   }
   else{ console.log('contrasenas diferentes')}
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
              label="Nombre Completo"
              InputProps={{ inputProps: { maxLength: 35 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca su nombre completo'
              name='campoNombre'
              onChange={handleChange('nameComplete')}
             //onChange={handleInputChange}
              //value={values.camponombre}
                       />

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
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
              //onChange={handleInputChange}
              //value={values.camponombre}
            />

                <TextField
              
              label="Confirmar contraseña"
              InputProps={{ inputProps: { maxLength: 10 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Confirmar contraseña'
              name='campoconcontra'
              //onChange={handleInputChange}
              //value={values.camponombre}
            
              type={values.showPassword ? 'text' : 'password'}
              onChange={handleChange('passwordConfirm')}
              InputProps={{ inputProps: { maxLength: 10 } }}
              endAdornment={
              <InputAdornment position="end">
                  <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
              </InputAdornment>
              }
              
            />

            
          </Grid>

          <Grid item sm={12} xs={12} align="center">
          <Button 
            style={{
              backgroundColor: "#20603d",
             
          }}
            variant="contained" 
            color="primary" 
            onClick={(e)=>{registrarNuevoCliente(e)}}
            >

            
              Registrar 
              </Button></Grid>

        </Grid>
      </form>


    </Container>

        )};
export default FormularioUsuario;