import React from 'react';

import {
  useAuth0,
  withAuthenticationRequired,
} from '@auth0/auth0-react';
import {
  Container,
  Typography,
} from '@material-ui/core';

import Loading from './loading';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;
  console.log(user.name);

  return (
    <Container maxWidth='sm' >
    <div>
      <div className="row align-items-center profile-header">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />

        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <Typography variant="h6" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '1em' }}>
          <p className="lead text-muted">{email}</p>

      </Typography>
        </div>
      </div>
      <Typography variant="h6" component="h2" gutterBottom style={{ textAlign: 'center', marginTop: '1em' }}>

      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      </Typography>

    </div>

    </Container>

  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});