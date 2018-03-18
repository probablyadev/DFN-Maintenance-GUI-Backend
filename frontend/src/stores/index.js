import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {routerMiddleware} from "react-router-redux";

function reduxStore(history) {
    const historyMiddleware = routerMiddleware(history);

    const store = createStore(
        reducers,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(historyMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../reducers');  // eslint-disable-line global-require

            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

export default reduxStore;
