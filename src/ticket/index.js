import React,{Component}from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import 'normalize.css'
import App from './App'
import './App.css'
ReactDOM.render(
       <Provider store={store}><App/></Provider>,
        document.getElementById('root')
);