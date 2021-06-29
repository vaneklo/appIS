import React, {
  useEffect,
  useState,
} from 'react';

import {
  Field,
  Form,
  Formik,
} from 'formik';
import { Autocomplete } from 'formik-material-ui-lab';

import {
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MuiTextField from '@material-ui/core/TextField';

import {db} from '../formularioRegistro/firebase';
import PrevRecetas from '../prevRecetas/PrevRecetas';

const Autocompletado = (props) =>{ 
  const [elementos, setElementos] = useState(['ninguno']);

  const[listaIngredientesUnicos,setListaIngredientesUnicos]=useState([{ingrediente:' '}]);
  useEffect(()=>{getListaIngredientes()},[])

  const getListaIngredientes=async()=>{
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
                       var resultado=[];
   listaNombresUnicos.map((item)=>{  resultado=[...resultado,{ingrediente:item}];   })  
      
      
      setListaIngredientesUnicos(resultado);
    }

const campoAutocompletado=()=>(
  <>

    <Typography variant="h2" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '1em' }}>
  
      <img src="https://i.ibb.co/qmxT6nN/large-removebg-preview.png"  width="500" height="333">
      </img>
      </Typography>
      <b><div style={{ textAlign: 'center', color: '#20603d', }}>{"Recetas segun lo que tengas en casa!"}</div></b>
      <div style={{ textAlign: 'center', color: '#000000', }}>
        {"Ingresa los ingredientes que tengas a la mano en la barra buscadora, presiona buscar"}</div>
        <div style={{ textAlign: 'center', color: '#000000', }}>
        {"y deja que nuestra app te recomiende todo tipo de recetas!"}</div>
    <Formik
      initialValues={{
        autocomplete: [],
      }}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);

        }, 500);
        setElementos(() => {
          const buscar = values.autocomplete.map(elem => elem.ingrediente);
          return buscar;
        }

        );
        
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <Container maxWidth="xs">
          <Form>
            <Box display="flex" justifyContent="center" >
              <Box margin={1}  >
                <Field
                  name="autocomplete"
                  multiple
                  noOptionsText='No existen coincidencias'
                  component={Autocomplete}
                  options={listaIngredientesUnicos.sort((a,b) => {
                    if(a.ingrediente!=undefined && b.ingrediente!=undefined){a.ingrediente.localeCompare(b.ingrediente)}
                                 })
                  }
                  getOptionLabel={(option) => option.ingrediente}
                  style={{ width: '60vw' }}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      error={touched['autocomplete'] && !!errors['autocomplete']}
                      helperText={touched['autocomplete'] && errors['autocomplete']}
                      label="Buscar ingredientes"
                      variant="filled"
                      InputLabelProps={{
                        style: {color: '#000000', fontWeight:"bold"}
                    }}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" >
              <Box margin={1} >
                <Button
                style={{
                  backgroundColor: "#20603d",
              }}
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Buscar
            </Button>
              </Box>
            </Box>

          </Form>
        </Container>
      )}
    </Formik>

  </>
);
//de inicio el prev recetas esta vacio
// al pulsar el boton BUSCAR que se borre el contenido de prev recetas,que regrese a un estado inicial
return(
    <div>
      {campoAutocompletado()}
      <PrevRecetas buscar={elementos} rol={props.rol}/>
    </div>
  );

};
export default Autocompletado;