import React from "react";
import "../styles/icomoon-style.css";
import "../styles/radio-style.scss";
import { Link, useHistory } from "react-router-dom";
import cogoToast from 'cogo-toast';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "../elements/Error";

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Название должно быть не более 255 символов")
		.required("Нужно указать название"),
	type: Yup.string()
		.required("Нужно указать тип проперти")
});


function AddProperty() {
	let history = useHistory();

	return (
		<div className="cotainer__addItem-inner">

			<h3>Добавление свойста</h3>

			<Formik initialValues={{ name: "", type: undefined }}
				validationSchema={validationSchema}
				onSubmit={values => {

					axios.get(`${process.env.REACT_APP_API_SERVER_URL}property?name=${values.name}`)
						.then(response => {
							//Возвращаем response.data.length === 1 если имя - есть в базе данных, и 0 если нет
							//console.log("ВАСЯ", response.data.length)
							if (response.data.length === 0) {
								//console.log(values)
								axios.post(`${process.env.REACT_APP_API_SERVER_URL}property/`, {
									name: values.name,
									type: values.type
								})
									.then(response => {
										cogoToast.success("Проперти добавлен!", {/*position: 'bottom-center'*/ });
										history.push("/itemsandproperty");
									})
									.catch(function (error) {
										cogoToast.error('Ошибка добавления проперти!', {/*position: 'bottom-center'*/ });
										//console.log(error);
									});
							}
							else {
								cogoToast.error('Проперти с таким именем уже существует!', {/*position: 'bottom-center'*/ });
								setTimeout(() => window.location.reload(), 2000); // 2сек перед релоадом
							}
						})
				}
				}
			>
				{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (

					<form onSubmit={handleSubmit}>
						<div className="input-row">
							<label htmlFor="name" className="addItem__input-label">Название свойства<span>*</span></label>
							<input name="name"
								type="text"
								id="name"
								placeholder="Цвет авто"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								className={touched.name && errors.name ? "has-error" : null}
							/>
							<Error touched={touched.name} message={errors.name} />
						</div>

						<p className="addItem__input-label">Укажите тип свойства<span>*</span></p>

						<label className="container-radio">Dropdown<input type="radio" name="type" value="Dropdown" onChange={handleChange} /><span className="checkmark"></span></label>
						<label className="container-radio">Number<input type="radio" name="type" value="Number" onChange={handleChange} /><span className="checkmark"></span></label>
						<label className="container-radio">String<input type="radio" name="type" value="String" onChange={handleChange} /><span className="checkmark"></span></label>

						<Error touched={touched.type} message={errors.type} />

						<div className="nav-btn__container">
							<Link className="nav-btn" to="/itemsandproperty">Вернуться</Link>
							<button type="submit" disabled={isSubmitting}>Сохранить</button>
						</div>

					</form>
				)}
			</Formik>
		</div>
	);
}

export default AddProperty;