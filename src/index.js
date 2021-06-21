import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

ReactDOM.render(
  <Router>
     <Auth0Provider
    domain="dev-eqya4kqd.us.auth0.com"
    clientId="qKGGfxi7YUm9TyTxX5KthvUzAzHuKick"
    redirectUri={window.location.origin}
  >
    <Auth0ProviderWithHistory>
      
      <App />
    </Auth0ProviderWithHistory>
    </Auth0Provider>
  </Router>,
  document.getElementById("root")
);