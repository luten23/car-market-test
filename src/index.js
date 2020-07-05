import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./App"
import * as serviceWorker from "./serviceWorker"
import { createStore, applyMiddleware } from "redux"
import { allReducers } from "./store/reducers"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction"

const composeEnhancers = composeWithDevTools({})

const store = createStore( allReducers, composeEnhancers(applyMiddleware(thunk)) )

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)

serviceWorker.unregister()
