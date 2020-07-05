import React from "react"
import styles from "./login.module.css"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Error } from "../../elements/Error"
import { useDispatch } from "react-redux"
import { userAuthorization } from "../../store/actions"

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.max(255, "E-mail должен быть не более 255 символов")
		.required("Необходимо указать E-mail")
		.email("E-mail указан неверно"),
	password: Yup.string()
		.required("Необходимо указать пароль")
		.max(255, "Пароль должен быть не более 255 символов")
		.min(8, "Пароль должен быть мимнимум из 8 символов")
})

export function Login() {

	const dispatch = useDispatch()
	const [passVisible, setPassVisible] = React.useState(true)

	return (
		<div className={styles.container}>
			<div className={styles.login__block}>
				<h1>Вход</h1>
				<Formik
					initialValues={{ email: "", password: "" }}
					validationSchema={validationSchema}
					onSubmit={values => {
						dispatch(userAuthorization(values.email, values.password)) // логин
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<div className={styles.input_row}>
								<label htmlFor="email">E-mail</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Введте e-mail"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									className={touched.email && errors.email ? styles.has_error : null}
								/>
								<Error touched={touched.email} message={errors.email} />
							</div>
							<div className={styles.input_row}>
								<label htmlFor="password">Пароль</label>
								<input
									type={passVisible ? "password" : "text"}
									name="password"
									id="password"
									placeholder="Введте пароль"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									className={touched.password && errors.password ? styles.has_error : null}
								/>
								<button className={passVisible ? styles.eye_btn : styles.eye_btn_pressed} type="button" onClick={()=> setPassVisible(passVisible ? false : true)}></button>
								<Error touched={touched.password} message={errors.password} />
							</div>
							<div>
								<button className={styles.login__btn} type="submit" disabled={isSubmitting}>Войти</button>
								<Link className={styles.reg__btn} to="/registration">Зарегестрироваться</Link>
							</div>
						</form>
					)}
				</Formik>
			</div>
		</div>
	)
}