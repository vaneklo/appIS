import React,{useEffect,useState}from'react'
import MaterialTable from 'material-table'
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

function TableroIngredientes() {
const columnas=[{
tittle:'Cantidad',
field:'cantidad'
},
{
tittle:'Nombre',
field:'nombre'
}
];

const datos=[
{cantidad:'1 kilo', nombre:'papa'}
];



  return (

    <div>
    <MaterialTable tittle ="" columns={columnas} data={datos}
    actions={
      [
        {icon:'edit',
        tooltip:'editar',
        
        },
        {icon:'delete',
        tooltip:'eliminar',
        
        }
      ]

    }
    options={{
     actionsColumnIndex:-1}}
    />
    </div>







  );
}

export default TableroIngredientes;





