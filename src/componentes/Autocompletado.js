import React from 'react';

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

import { ingredientes } from '../data/datos';

const Autocompletado = () => (
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
          alert(JSON.stringify(values, null, 2));
        }, 500);
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
                  options={ingredientes.sort((a, b) => a.ingrediente.localeCompare(b.ingrediente))
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
                  Enviar
            </Button>
              </Box>
            </Box>

          </Form>
        </Container>
      )}
    </Formik>
  </>
);

export default Autocompletado;