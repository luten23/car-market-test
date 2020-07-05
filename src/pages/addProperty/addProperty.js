import React from "react"
import "../../styles/icomoon-style.css"
import "../../styles/radio-style.scss"
import styles from "./addProperty.module.css"
import { Link, useHistory } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Error } from "../../elements/Error"
import { postProperty } from "../../store/actions"
import { useDispatch } from "react-redux"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Название должно быть не более 255 символов")
		.required("Нужно указать название"),
	type: Yup.string()
		.required("Нужно указать тип проперти")
})

export function AddProperty() {
	
	let history = useHistory()
	const dispatch = useDispatch()

	return (
		<div className={styles.cotainer__addProperty_inner}>
			<h3>Добавление свойста</h3>
			<Formik initialValues={{ name: "", type: undefined }}
				validationSchema={validationSchema}
				onSubmit={values => {
					dispatch(postProperty(values.name, values.type)) // добовление проперти + обновление списка
					history.push("/itemsandproperties")
				}}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
					<form onSubmit={handleSubmit}>
						<div className={styles.input_row}>
							<label htmlFor="name" className={styles.addProperty__input_label}>Название свойства<span>*</span></label>
							<input name="name"
								type="text"
								id="name"
								placeholder="Цвет авто"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								className={touched.name && errors.name ? styles.has_error : null}
							/>
							<Error touched={touched.name} message={errors.name} />
						</div>
						<p className={styles.addItem__input_label}>Укажите тип свойства<span>*</span></p>
						<label className="container-radio">Dropdown<input type="radio" name="type" value="Dropdown" onChange={handleChange} /><span className="checkmark"></span></label>
						<label className="container-radio">Number<input type="radio" name="type" value="Number" onChange={handleChange} /><span className="checkmark"></span></label>
						<label className="container-radio">String<input type="radio" name="type" value="String" onChange={handleChange} /><span className="checkmark"></span></label>
						<Error touched={touched.type} message={errors.type} />
						<div className={styles.nav_btn__container}>
							<Link className={styles.nav_btn} to="/itemsandproperties">Вернуться</Link>
							<button type="submit" disabled={isSubmitting}>Сохранить</button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	)
}