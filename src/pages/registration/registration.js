import React from "react"
import styles from "./registration.module.css"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Error } from "../../elements/Error"
import { useDispatch } from "react-redux"
import { userRegisration } from "../../store/actions"

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
		.min(8, "Пароль должен быть мимнимум из 8 символов"),
	passwordConfirmation: Yup.string()
		.required("Необходимо указать пароль ещё раз")
		.oneOf([Yup.ref("password"), null], "Пароль должен совпадать")
})

export function Registration() {

	const dispatch = useDispatch()
	const [passFirstVisible, setPassFirstVisible] = React.useState(true)
	const [passSecondVisible, setPassSecondVisible] = React.useState(true)

	return (
		<div className={styles.container}>
			<div className={styles.registration__block}>
				<h1>Регистрация</h1>
				<Formik initialValues={{ name: "", lastname: "", email: "", password: "", passwordConfirmation: "" }}
					validationSchema={validationSchema}
					onSubmit={values => {
						dispatch(userRegisration(values.name, values.lastname, values.email, values.password)) // регистрация
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<div className={styles.input_row}>
								<label htmlFor="name">Имя</label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Введте имя"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									className={touched.name && errors.name ? styles.has_error : null}
								/>
								<Error touched={touched.name} message={errors.name} />
							</div>
							<div className={styles.input_row}>
								<label htmlFor="lastname">Фамилия</label>
								<input
									type="text"
									name="lastname"
									id="lastname"
									placeholder="Введте фамилию"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.lastname}
									className={touched.lastname && errors.lastname ? styles.has_error : null}
								/>
								<Error touched={touched.lastname} message={errors.lastname} />
							</div>
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
									type={passFirstVisible ? "password" : "text"}
									name="password"
									id="password"
									placeholder="Введте пароль"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									className={touched.password && errors.password ? styles.has_error : null}
								/>
								<button className={passFirstVisible ? styles.eye_btn : styles.eye_btn_pressed} type="button" onClick={()=> setPassFirstVisible(passFirstVisible ? false : true)}></button>
								<Error touched={touched.password} message={errors.password} />
							</div>
							<div className={styles.input_row}>
								<label htmlFor="passwordConfirmation">Повторите пароль</label>
								<input
									type={passSecondVisible ? "password" : "text"}
									name="passwordConfirmation"
									id="passwordConfirmation"
									placeholder="Введте пароль ещё раз"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.passwordConfirmation}
									className={touched.passwordConfirmation && errors.passwordConfirmation ? styles.has_error : null}
								/>
								<button className={passSecondVisible ? styles.eye_btn : styles.eye_btn_pressed} type="button" onClick={()=> setPassSecondVisible(passSecondVisible ? false : true)}></button>
								<Error touched={touched.passwordConfirmation} message={errors.passwordConfirmation} />
							</div>
							<button className={styles.reg__btn} type="submit" disabled={isSubmitting}>Зарегестрироваться</button>
							<Link className={styles.back__btn} to="/login">Вернуться</Link>
						</form>
					)}
				</Formik>
			</div>
		</div>
	)
}