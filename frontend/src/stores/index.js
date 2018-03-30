import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import rootSaga from '../sagas/index';

// Dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// TODO: Implement dev and prod stores: https://github.com/redux-saga/redux-saga/tree/master/examples/real-world/store
function reduxStore(history) {
    const historyMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        reducers,
        compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(historyMiddleware),
            reduxDevTools
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            // We need to require for hot reloading to work properly.
            const nextReducer = require('../reducers');  // eslint-disable-line global-require

            store.replaceReducer(nextReducer);
        });
    }

    sagaMiddleware.run(rootSaga);

    return store;
}

export default reduxStore;
