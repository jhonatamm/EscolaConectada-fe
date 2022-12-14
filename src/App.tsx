import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.scss';
import LoadingComponent from './components/Loading/LoadingComponent';
import Routes from './routers/Routes';
import { BASE_URL } from './services/api';

function App() {
  const [isLoading, setisLoading] = useState(true);
  const [text, setText] = useState('Carregando a aplicação');

  useEffect(() => {

    axios.get(`${BASE_URL}status`)
      .then(function (response) {
        setisLoading(false);
      })
      .catch(function (error) {
        setText('Estamos com problemas para abrir a aplicação');
        console.log(error);
      })
      .then(function () {
      });
  }, [])
  return (
    <>{isLoading ? <LoadingComponent isLoading={isLoading} texto={text}></LoadingComponent> :

      <Routes />
    }

    </>
  );
}

export default App;
