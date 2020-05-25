import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Registration from "./pages/registration";
import ItemCard from "./pages/ItemCard";
import AllItemsAndProperty from "./pages/allItemsAndProperty";
import AddItem from "./pages/addItem";
import AddProperty from "./pages/addProperty";
import axios from "axios"
import Cookies from 'js-cookie'
import { useSelector } from "react-redux"

axios.defaults.headers.common.Authorization = `Bearer ${Cookies.get('vasya')}`;
console.log("API_SERVER_URL:", process.env.REACT_APP_API_SERVER_URL)

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger --- Do something with response data
  return response;
}, function (error) {
  if(error.response.status === 401) {
    Cookies.remove('vasya');
    setTimeout(() => window.location.reload(), 2000); // 2сек перед релоадом
  }
  return Promise.reject(error);
});

function App() {

  const isAuth = useSelector(state => state.auth.isAuth)

    return (
      <div className="container">
        {isAuth && <Router>
          <Switch>
            <Route path="/" exact component={AllItemsAndProperty}/>
            <Redirect strict from="/login" to="/itemsandproperty" />
            <Redirect strict from="/registration" to="/itemsandproperty" />
            <Route path="/itemsandproperty" component={AllItemsAndProperty}/>
            <Route path="/additem" component={AddItem}/>
            <Route path="/edititem/:id" component={AddItem}/>
            <Route path="/addproperty" component={AddProperty}/>
            <Route path="/items/:id" component={ItemCard}/>
            
          </Switch>
        </Router>}
        {isAuth===false && <Router>
          <Switch>
            <Route path="/items/:id" component={ItemCard}/>
            <Route path="/" exact component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/registration" component={Registration}/>
            <Redirect strict from="/itemsandproperty" to="/" />
            <Redirect strict from="/edititem/:id" to="/" />
            <Redirect strict from="/addproperty" to="/" />
          </Switch>
        </Router>}
      </div>
    );
  }

export default App;