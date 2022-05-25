import { CollapseDrawerProvider } from "contexts/CollapseDrawerContext";
import React from "react";
import Router from "./routes/Routes";
const axios = require("axios").default;

function App() {
  // axios.get("https://fcinema.tk/api/public/hello").then(function (response) {
  //   // handle success
  //   console.log(response);
  // });
  return (
    <CollapseDrawerProvider>
      <Router />
    </CollapseDrawerProvider>
  );
}

export default App;
