import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { Provider } from 'react-redux';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const firebaseConfig = {
  apiKey: 'AIzaSyCQBbv-LFA0Fy2HLP82FAClcQf6JTXSnbM',
  authDomain: 'fantasy-hockey-website.firebaseapp.com',
  projectId: 'fantasy-hockey-website',
  storageBucket: 'fantasy-hockey-website.appspot.com',
  messagingSenderId: '428055655900',
  appId: '1:428055655900:web:e24a4dcdf722e54dedcb19',
  measurementId: 'G-ECYL5VLDRS',
};

const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const db = getFirestore(app);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();