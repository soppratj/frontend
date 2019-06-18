import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './stores/store';
import Container from './containers/container';

const store = configureStore();

try{
    ReactDOM.render(
        <Provider store={store}>
            <Container />
        </Provider>,
        document.getElementById('root')
    );
}catch(e){
    throw new Error("RenderFailed " + e.message);
}