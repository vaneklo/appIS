import { Button } from '@material-ui/core';

export const Paginacion =({tarjetasPorPagina,tarjetasTotales,paginate})=>{

const numeracion=[];
for(let i=1;i<=Math.ceil(tarjetasTotales/tarjetasPorPagina);i++)
{numeracion.push(i);}
return (
<ul className='paginacion'>
{numeracion.map(numero=>
    (
     <Button style={{ backgroundColor: "#20603d",color:"#ffffff", justifyContent: 'center'}} 
     variant="outlined" color="primary" key={numero} onClick={()=>paginate(numero)}>
         {numero}
     </Button>
    )
    )}
</ul>
);

}