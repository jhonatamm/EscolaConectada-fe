import axios from 'axios';
import React, { useEffect } from 'react';

import './App.scss';
import Routes from './routers/Routes';

function App() {

  useEffect(() => {

    axios.get('http://localhost:8080/api/metrics/escola?escolaId=6328fa78cc662a35a71406f3&bimestreCod=&ano=2022')
    .then(function (response) {
      // handle success

      //console.log(response);
      if (response.data.content){
        console.log(response.data.content)
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
    });
  }, [])
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
