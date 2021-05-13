import {db} from '../formularioRegistro/firebase'

var resultado=[];

export const listaIngredientes=async()=>{
var obj;    
var listaNombresUnicos=[];
var lista=[];

const querySnapshot=await db.collection("ingrediente-receta").get();
querySnapshot.forEach((doc) => { 
    obj=doc.data();
    obj.id=doc.id;
    lista.push(obj);            }
                    )

     lista.map((ingrediente)=>{
        if(listaNombresUnicos==[]){
                  listaNombresUnicos=[ingrediente.name];
                          }
        else{
           if(!listaNombresUnicos.includes(ingrediente.name)){
            var nuevaRespuesta=[...listaNombresUnicos,ingrediente.name];
            listaNombresUnicos=nuevaRespuesta;}
           
            }
        }
     )
    
     listaNombresUnicos.map((item)=>{  resultado=[...resultado,{ingrediente:item}];   })
     console.log('............ddddd');
    // console.log(resultado);

     return resultado;    
}
const ingredientes=listaIngredientes();
//.then((item)=>{ 
 //   console.log(item);
  //  } 
   // );


export const respuesta=ingredientes;
//export const respuesta=[{ingrediente:'sdadsa'}];