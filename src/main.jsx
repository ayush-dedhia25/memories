import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux Imports
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Local Imports
import App from './App';
import reducers from './redux/reducers';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

function Main() {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <App />
         </Provider>
      </BrowserRouter>
   );
}

ReactDOM.render(<Main />, document.getElementById('root'));
