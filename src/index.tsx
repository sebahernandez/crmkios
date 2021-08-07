import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { theme } from './theme';
import Routes from './routes';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/App.css';
import * as serviceWorker from './serviceWorker';
import { WebSocketLink } from "@apollo/client/link/ws"; 
import './theme/global.css';
import { useState } from 'react';
import React from 'react';


const createApolloClient = () => {

  return new ApolloClient({
      link: new WebSocketLink({ 
      uri: 'wss://cuddly-hog-22.hasura.app/v1/graphql',
      options: {
        reconnect: true,
        timeout: 10000,
        connectionParams: {
          headers: {
            'content-type' : 'application/json',
            'x-hasura-admin-secret':  'kxUJ2vmT0kihpyf9x7MDVAj1OoURuQzMXhN9O8JuLvMhVk05aSIKL4IdQZ4WXNDN',
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TUR`
          }
        }
      }
     }),
     cache: new  InMemoryCache
  });
 };
 
function App () {
  const [idToken, setIdToken] = useState("");
  
  const engine = new Styletron();
  const client = createApolloClient();
  
  return (
    <ApolloProvider client={client as any}>
      <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </BaseProvider>
      </StyletronProvider>
    </ApolloProvider>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


