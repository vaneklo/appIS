import React from 'react';

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

  
    const validarCorreo = (str) => {
        var pattern = new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");
        return !!pattern.test(str);
      };
      
      const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
return (
    <Container maxWidth='sm' >
      <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '2em' }}>
        Registro de Administrador
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
              placeholder='Consfirmar contraseña'
              name='campoconcontra'
              //onChange={handleInputChange}
              //value={values.camponombre}
            
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
              
            />

            <TextField
              
              label="Codigo de acceso"
              InputProps={{ inputProps: { maxLength: 5 } }}
              defaultValue=""
              fullWidth='true'
              placeholder='Introduzca codigo'
              name='campocod'
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
            //onClick={handleSubmit}
            >
              Registrar 
              </Button></Grid>

        </Grid>
      </form>


    </Container>

        )};
export default FormularioUsuario;