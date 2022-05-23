import React from "react";
const axios = require("axios").default;

function App() {
  axios.get("/api/public/hello").then(function (response) {
    console.log(response);
  });
  return <div className="App"hello></div>;
}

export default App;
