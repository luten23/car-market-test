import React from "react"
import { Link //, useHistory 
} from "react-router-dom"
import cogoToast from 'cogo-toast'
import { Formik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import Error from "../../elements/Error"
import Cookies from 'js-cookie'
import { useDispatch } from "react-redux"
import { authorization } from "../../store/actions"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Имя должно быть не более 255 символов")
		.required("Необходимо указать имя"),
	lastname: Yup.string()
		.max(255, "Фамилия должна быть не более 255 символов")
		.required("Необходимо указать фамилию"),
	email: Yup.string()
		.max(255, "E-mail должен быть не более 255 символов")
		.required("Необходимо указать E-mail")
		.email("E-mail указан неверно"),
	password: Yup.string()
		.required("Необходимо указать пароль")
		.max(255, "Пароль должен быть не более 255 символов")
		.min(8, 'Пароль должен быть мимнимум из 8 символов'),
	passwordConfirmation: Yup.string()
		.required("Необходимо указать пароль ещё раз")
		.oneOf([Yup.ref('password'), null], 'Пароль должен совпадать')
})

function Registration() {
	//let history = useHistory()
	const dispatch = useDispatch()

	return (
		<div className="login__block">
			<h1>Регистрация</h1>
			<Formik initialValues={{ name: "", lastname: "", email: "", password: "", passwordConfirmation: "" }}
				validationSchema={validationSchema}
				onSubmit={values => {
					axios.post(`${process.env.REACT_APP_API_SERVER_URL}auth/register`, {
						name: values.name,
						lastname: values.lastname,
						email: values.email,
						password: values.password
					})
						.then(response => {
							cogoToast.success("Регистрация успешна!")
							//history.push("/");
							const token = response.data.access_token
							axios.defaults.headers.common.Authorization = `Bearer ${token}`;
							Cookies.set('vasya', token)
							//window.location.reload();
							dispatch(authorization(true))
						})
						.catch(function (error) {
							cogoToast.error("Регистрация не удалась!")
							//console.log(error);
						});
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

					<form onSubmit={handleSubmit}>
						<div className="input-row">
							<label htmlFor="name">Имя</label>
							<input
								type="text"
								name="name"
								id="name"
								placeholder="Введте имя"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								className={touched.name && errors.name ? "has-error" : null}
							/>
							<Error touched={touched.name} message={errors.name} />
						</div>
						<div className="input-row">
							<label htmlFor="lastname">Фамилия</label>
							<input
								type="text"
								name="lastname"
								id="lastname"
								placeholder="Введте фамилию"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.lastname}
								className={touched.lastname && errors.lastname ? "has-error" : null}
							/>
							<Error touched={touched.lastname} message={errors.lastname} />
						</div>
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
						<div className="input-row">
							<label htmlFor="password2">Повторите пароль</label>
							<input
								type="password"
								name="passwordConfirmation"
								id="passwordConfirmation"
								placeholder="Введте пароль ещё раз"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.passwordConfirmation}
								className={touched.passwordConfirmation && errors.passwordConfirmation ? "has-error" : null}
							/>
							<Error touched={touched.passwordConfirmation} message={errors.passwordConfirmation} />
						</div>
						<button className="login__btn regreg" type="submit" disabled={isSubmitting}>Зарегестрироваться</button>
						<Link className="reg__btn" to="/login">Вернуться</Link>
					</form>
				)}
			</Formik>
		</div>
	);
}
export default Registration;
