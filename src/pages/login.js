import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cogoToast from 'cogo-toast';
import Error from "../elements/Error";
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { authorization } from "../actions"

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.max(255, "E-mail должен быть не более 255 символов")
		.required("Необходимо указать E-mail")
		.email("E-mail указан неверно"),
	password: Yup.string()
		.required("Необходимо указать пароль")
		.max(255, "Пароль должен быть не более 255 символов")
		.min(8, 'Пароль должен быть мимнимум из 8 символов')
});

function Login() {

	const dispatch = useDispatch();

	return (
		<div className="login__block">
			<h1>Вход</h1>
			<Formik initialValues={{ email: "", password: "" }}
				validationSchema={validationSchema}
				onSubmit={values => {

					axios.post(`${process.env.REACT_APP_API_SERVER_URL}auth/login`, {
						email: values.email,
						password: values.password
					})
						.then(response => {
							const token = response.data.access_token
							axios.defaults.headers.common.Authorization = `Bearer ${token}`;
							Cookies.set('vasya', token)
							//window.location.reload();
							dispatch(authorization(true))
						}).catch(function (error) {
							cogoToast.error("Авторизация не удалась!", {/*position: 'bottom-center'*/ });
						});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

					<form onSubmit={handleSubmit}>
						<div className="input-row">
							<label htmlFor="email">E-mail</label>
							<input
								type="email"
								name="email"
								id="email"
								placeholder="Введте e-mail"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
								className={touched.email && errors.email ? "has-error" : null}
							/>
							<Error touched={touched.email} message={errors.email} />
						</div>
						<div className="input-row">
							<label htmlFor="password">Пароль</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Введте пароль"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								className={touched.password && errors.password ? "has-error" : null}
							/>
							<Error touched={touched.password} message={errors.password} />
						</div>

						<button className="login__btn" type="submit" disabled={isSubmitting}>Войти</button>
						<Link className="reg__btn" to="/registration">Зарегестрироваться</Link>

					</form>
				)}
			</Formik>
		</div>
	);
}
export default Login;