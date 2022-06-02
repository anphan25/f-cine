import { CollapseDrawerProvider } from 'contexts/CollapseDrawerContext';
import React from 'react';
import Router from 'routes/Routes';

function App() {
  return (
    <CollapseDrawerProvider>
      <Router />
    </CollapseDrawerProvider>
  );
}

export default App;
