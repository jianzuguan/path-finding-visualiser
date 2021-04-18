import React from 'react';
import './App.css';
import PathFindingVisualiser from 'PathFindingVisualiser';

import { Provider as ReduxProvider } from 'react-redux';
import reduxStore from 'redux/store';

function App() {
  return (
    <ReduxProvider store={reduxStore}>
      <div className="App">
        <PathFindingVisualiser />
      </div>
    </ReduxProvider>
  );
}

export default App;
