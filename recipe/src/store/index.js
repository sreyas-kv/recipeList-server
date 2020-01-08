import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true })
        : compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunkMiddleware)),
    );

    // const store = createStore(
    //     rootReducer,
    //     applyMiddleware(thunk)
    // )

    // if (module.hot) {
    //     module.hot.accept('../reducers', () => {
    //         store.replaceReducer(rootReducer);
    //     });
    // }

    return store;
}