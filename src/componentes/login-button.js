import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
    style={{
      backgroundColor: "#20603d",
  }}
      variant="contained"
      color="primary"
      onClick={() => loginWithRedirect()}
    >
      Iniciar Sesion
    </Button>
  );
};

export default LoginButton;