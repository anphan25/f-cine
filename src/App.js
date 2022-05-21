import React from "react";
const axios = require("axios").default;

function App() {
  axios.get("/api/public/hello").then(function (response) {
    // handle success
    console.log(response);
  });
  return <div className="App"></div>;
}

export default App;
