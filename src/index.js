import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './reducers/index';
import {SIGNIN} from './actions/index'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer);
// if (document.cookie){
//     console.log(document.cookie);
//     store.dispatch({ type: SIGNIN});
// }

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router> 
    </Provider>,
    document.getElementById('root')
);
