import React, { useContext, useEffect, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import Label from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AuthNav from './authentication-button';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../formularioRegistro/firebase';
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import Autocompletado from './Autocompletado';
import SeccionFormulario from '../formularioRegistro/SeccionFormulario';
import RecetasFavoritas from './recetasFavoritas';
import Profile from '../views/profile';
import ProtectedRoute from '../auth/protected-route';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const[rol,setRol]=useState(null);
    const{user,isAuthenticated}=useAuth0();
   
    useEffect(async()=>{
        console.log('useefect leer header');
        if(isAuthenticated)
        {
        var objt;
        var roles=[];
        const consultaDatosRol=await db.collection("usuario").where('correoElectronico','==',user.email).get();
        consultaDatosRol.forEach((doc) => {
            if(consultaDatosRol!=null){
              objt=doc.data();
              objt.id=doc.id;
              roles.push(objt);}})
              console.log(roles[0].rol);
              setRol(roles[0].rol)
              console.log(rol);
    }
    },[isAuthenticated])

   const botones=()=>{
   if(isAuthenticated)
   {  
       if(rol==="cliente"){
        return(
            <div className={classes.root}>
            <AppBar style={{ background: '#20603d' }} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>ComeCon</Typography>

                    <Label color="inherit">{user.name}</Label>
                    
                    <Button color="inherit" component={Link} to="/" >Inicio</Button>
    
                    <Button color="inherit"  component={Link} to="/RecetasFavoritas">favoritos</Button>
                         
                    <Button color="inherit" component={Link} to="/authnav" >perfil</Button>
    
                    <AuthNav/>
    
                </Toolbar>
            </AppBar>
        </div>
           );
       }

       else{
        return(
            <div className={classes.root}>
            <AppBar style={{ background: '#20603d' }} position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>ComeCon</Typography>
                    <Label color="inherit">{user.name}</Label>
                    <Button color="inherit" component={Link} to="/" >Inicio</Button>
        
                    <Button color="inherit" component={Link} to="/registrar" >Registrar recetas</Button>
                     
                    <Button color="inherit" component={Link} to="/authnav" >perfil</Button>
    
                    <AuthNav/>
    
                </Toolbar>
            </AppBar>
        </div>
           );
       }

   }
   else{
    return(
        <div className={classes.root}>
        <AppBar style={{ background: '#20603d' }} position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>ComeCon</Typography>
                
                <Button color="inherit" component={Link} to="/" >Inicio</Button>
     
                <Button color="inherit" component={Link} to="/authnav" >perfil</Button>

                <AuthNav/>

            </Toolbar>
        </AppBar>
    </div>
       );
   }
   }

   const RutaProtegidaCliente=(props)=>{
    if(isAuthenticated){
       if(rol=="cliente"){return(<Route  {...props}> </Route>);}
        else { return(<Redirect to='/authnav'/>);}
         
       }}
       
   ///aqui esta el footer
    return (
            <div >
       {botones()}
       
       <Switch>
        <Route exact path="/"> <Autocompletado />    </Route>
        
          <Route  path="/registrar" > <SeccionFormulario /> </Route>

          <Route  path="/RecetasFavoritas" > <RecetasFavoritas/>  </Route>

          <ProtectedRoute path="/authnav" ><Profile/> </ProtectedRoute>

      </Switch>

            </div>
    );
}
