import React from 'react';
import {Formik, Form, Field} from 'formik';
import {
  Button,
  Typography,
} from '@material-ui/core';
import MuiTextField from '@material-ui/core/TextField';
import {
  Autocomplete,
} from 'formik-material-ui-lab';
import Box from '@material-ui/core/Box';

import {ingredientes} from '../data/datos';

const Autocompletado = () => (
  <Formik
    initialValues={{
      autocomplete: [],
    }}

    onSubmit={(values, {setSubmitting}) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({submitForm, isSubmitting, touched, errors}) => (
      
        <Form>
          <h1>ComeCon</h1>   
          <Box display="flex" justifyContent="center" >
          <Box margin={1}  >
            <Field
              name="autocomplete"
              multiple
              component={Autocomplete}
              options={ingredientes}
              getOptionLabel={(option) => option.ingrediente}
              style={{width: 300}}
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
          <Box margin={1} >
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}  
            >
              Enviar
            </Button>
          </Box>
          
        </Form>
    )}
  </Formik>
);

export default Autocompletado;