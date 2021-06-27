
export const Paginacion =({tarjetasPorPagina,tarjetasTotales,paginate})=>{

const numeracion=[];
for(let i=1;i<=Math.ceil(tarjetasTotales/tarjetasPorPagina);i++)
{numeracion.push(i);}
return (
<ul className='paginacion'>
{numeracion.map(numero=>
    (
     <button key={numero} onClick={()=>paginate(numero)}>
         {numero}
     </button>
    )
    )}
</ul>
);

}