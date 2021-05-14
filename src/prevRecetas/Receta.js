import React, {
    useEffect,
    useState,
  } from 'react';
  import {db} from '../formularioRegistro/firebase';

  
const Receta=()=> {
  console.log("oooopoppoop");
    const recetaEjemplo="pan";
    const [ingredientesReceta,setIngredientesReceta]=useState([]);
    const [detalleReceta, setDetalleReceta]=useState([]);
    //formato de detalleReceta
//tendras una receta [nombreReceta1,calorias1,descripcion1]
//formato de ingredientesReceta
//tendras sus ingredientes[{nombreIngrediente1,cantidad1,unidad1,nombreReceta}
//{nombreIngrediente2,cantidad2,unidad2,nombreReceta}
//{nombreIngrediente3,cantidad3,unidad3,nombreReceta}
//{nombreIngrediente4,cantidad4,unidad4,nombreReceta}
//]
    useEffect(()=>{getDatosReceta()},[]);  
    const getDatosReceta=async()=>{
         var obj;
         var lista=[];         
        const consultaIngredientes=await db.collection("ingrediente-receta").where('nombreReceta','==',recetaEjemplo).get();
        consultaIngredientes.forEach((doc) => { 
            obj=doc.data();
            obj.id=doc.id;
            lista.push(obj);
            console.log(lista);
          })
        setIngredientesReceta(lista);
        var obj2;
         var lista2=[];   
        const consultaDetalleReceta=await db.collection("receta").where('camponombre','==',recetaEjemplo).get();
        consultaDetalleReceta.forEach((doc) => { 
            obj2=doc.data();
            obj2.id=doc.id;
            lista2.push(obj);
            console.log(lista2);
          })
        setDetalleReceta(lista2);
    }
    return (
      <div>
               
      </div>
    );
  }
export default Receta;