import * as React from 'react';
import { Provider } from 'react-redux';
import AppRoute from './src/components/routes/AppRoute';
import store from './src/services/redux/store';


const App = () => {
  return (
    <Provider store={store}>
      <AppRoute/>
    </Provider>
  );
}

export default App;