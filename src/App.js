import React from "react"
import axios from "axios"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"
import { Login } from "./pages/login/login"
import { Registration } from "./pages/registration/registration"
import { ItemCard } from "./pages/itemCard/ItemCard"
import { AllItemsAndProperties } from "./pages/allItemsAndProperties/allItemsAndProperties"
import { AddItem } from "./pages/addItem/addItem"
import { AddProperty } from "./pages/addProperty/addProperty"

axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("authorization_token")}`

// Add a response interceptor
axios.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger --- Do something with response data
		return response
	},
	function (error) {
		if (error.response.status === 401) {
			localStorage.removeItem("authorization_token")
			setTimeout(() => window.location.reload(), 2000) // 2сек перед релоадом
		}
		return Promise.reject(error)
	}
)

export function App() {
	const isAuth = useSelector((state) => state.auth.isAuth)

	return (
		<div>
			{isAuth && (
				<Router>
					<Switch>
						<Route path="/" exact component={AllItemsAndProperties} />
						<Redirect strict from="/login" to="/itemsandproperties" />
						<Redirect strict from="/registration" to="/itemsandproperties" />
						<Route path="/itemsandproperties" component={AllItemsAndProperties} />
						<Route path="/additem" component={AddItem} />
						<Route path="/edititem/:id" component={AddItem} />
						<Route path="/addproperty" component={AddProperty} />
						<Route path="/items/:id" component={ItemCard} />
					</Switch>
				</Router>
			)}
			{isAuth === false && (
				<Router>
					<Switch>
						<Route path="/items/:id" component={ItemCard} />
						<Route path="/" exact component={Login} />
						<Route path="/login" component={Login} />
						<Route path="/registration" component={Registration} />
						<Redirect strict from="/itemsandproperties" to="/" />
						<Redirect strict from="/edititem/:id" to="/" />
						<Redirect strict from="/additem" to="/" />
						<Redirect strict from="/addproperty" to="/" />
					</Switch>
				</Router>
			)}
		</div>
	)
}
