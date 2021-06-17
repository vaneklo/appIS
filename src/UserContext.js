import React,{useState,useEffect,createContext,useMemo} from 'react'

const usuarioContext=React.createContext();
//son datos fijos que se utilizaran a lomlargo del arbol de la aplicacion solo cuando el usuario se loguee
//correctamente se usaran los metodos set usuario y correo 
export function UsuarioProvider(props){
const [nombreCompletoUsuario,setNombreCompletoUsuario]=useState(null);
const [correoUsuario,setCorreoUsuario]=useState(null);
const [recetasFavoritas,setRecetasFavoritaS]=useState([]);

const [verRegistroUsuario,setVerRegistroAUsuario]=useState(true);
const [verRegistroReceta,setVerRegistroReceta]=useState(false);
const [verRecetasFavoritas,setVerRecetasFavoritas]=useState(true);

const setDatosUsuario=(nombreCompleto,correo)=>{
    console.log('context datos usaurio')
    setNombreCompletoUsuario(nombreCompleto);
    setCorreoUsuario(correo);
}
//pendiente
const cargarRecetasFavoritas=()=>{}
//devolver un arreglo de -receta-

const cambiarVerRegistroUsuario=(bool)=>{setVerRegistroAUsuario(bool)}
const cambiarVerRegistroReceta=(bool)=>{setVerRegistroReceta(bool)}
const cambiarVerRecetasFavoritas=(bool)=>{setVerRecetasFavoritas(bool)}


// les proporciono estas variables
// se actualizara cada que cambien las recetas o el nombre o el correo
const value=React.useMemo(()=>{
return({nombreCompletoUsuario,
        correoUsuario,
        recetasFavoritas,
        verRegistroUsuario,
        verRegistroReceta,
        verRecetasFavoritas,
        setDatosUsuario,
        cambiarVerRegistroUsuario,
        cambiarVerRegistroReceta,
        cambiarVerRecetasFavoritas,
        cargarRecetasFavoritas,
})}
       ,[nombreCompletoUsuario,
        correoUsuario,
        recetasFavoritas,
        verRegistroUsuario,
        verRegistroReceta,
        verRecetasFavoritas,
        ])


return <usuarioContext.Provider value={value} {...props}/>
}

export function useUsuario(){
const context= React.useContext(usuarioContext);
if(!context){throw new Error("erro de usuario en el context")}
return context;}