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
import {db} from '../formularioRegistro/firebase'
import {
  Button,
  Container,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import MuiTextField from '@material-ui/core/TextField';
import { ingredientes } from '../data/datos';
import PrevRecetas from '../prevRecetas/PrevRecetas';


const Autocompletado = () =>{ 
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
    <Typography variant="h2" component="h1" gutterBottom style={{ textAlign: 'center', marginTop: '2em' }}>
      ComeCon
      </Typography>
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
                  options={listaIngredientesUnicos.sort((a, b) => a.ingrediente.localeCompare(b.ingrediente))
                  }
                  getOptionLabel={(option) => option.ingrediente}
                  style={{ width: '60vw' }}
                  renderInput={(params) => (
                    <MuiTextField
                      {...params}
                      error={touched['autocomplete'] && !!errors['autocomplete']}
                      helperText={touched['autocomplete'] && errors['autocomplete']}
                      label="Buscar ingredientes"
                      variant="outlined"
                    />
                  )}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" >
              <Box margin={1} >
                <Button
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

return(
    <div>
      {campoAutocompletado()}
      <PrevRecetas buscar={elementos}/>
    </div>
  );

};
export default Autocompletado;