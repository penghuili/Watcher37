import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import AppContainer from './components/AppContainer';
import { useNavigateListner } from './hooks/useNavigateListener';
import store from './store';


function App() {
  useNavigateListner();

  return (
    <StoreProvider store={store}>
      <AppContainer />
    </StoreProvider>
  );
}

export default App;
