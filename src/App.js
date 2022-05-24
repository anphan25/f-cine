import React from 'react';
import Router from 'routes/Routes';
const axios = require('axios').default;

function App() {
  // axios.get('/api/public/hello').then(function (response) {
  //   // handle success
  //   console.log(response);
  // });
  return (
    <>
      <Router />
    </>
  );
}

export default App;
