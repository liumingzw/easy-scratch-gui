import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';
import GUI from './containers/GUI.jsx';

const reduxStore = createStore(reducer, applyMiddleware(thunk));

ReactDom.render(
    <Provider store = {reduxStore}>
        <GUI/>
    </Provider>,
    document.getElementById('container')
);
