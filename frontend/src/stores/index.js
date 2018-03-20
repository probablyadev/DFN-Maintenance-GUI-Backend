import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {routerMiddleware} from "react-router-redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "../actions";

// dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// TODO: Implement dev and prod stores: https://github.com/redux-saga/redux-saga/tree/master/examples/real-world/store
function reduxStore(history) {
    const historyMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        compose(
            applyMiddleware(thunk),
            applyMiddleware(sagaMiddleware),
            applyMiddleware(historyMiddleware),
            reduxDevTools
        ));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../reducers');  // eslint-disable-line global-require

            store.replaceReducer(nextReducer);
        });
    }

    // store.runSaga = sagaMiddleware.run;
    // store.close = () => store.dispatch(END);

    sagaMiddleware.run(rootSaga);

    return store;
}

export default reduxStore;
