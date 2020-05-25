import React from "react";
import "../styles/icomoon-style.css";
import { Link, useHistory, useParams } from "react-router-dom";
import cogoToast from 'cogo-toast';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Error from "../elements/Error";

function insertDate() {
	var date = new Date();
	if (date.getMonth() + 1 < 10) { var ttt = date.getDate() + ".0" + (date.getMonth() + 1) + "." + String(date.getFullYear()).substring([2]) }
	else { ttt = date.getDate() + "." + (date.getMonth() + 1) + "." + String(date.getFullYear()).substring([2]) }
	return ttt;
}

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Название должно быть не более 255 символов")
		.required("Нужно указать название"),
	price: Yup.number()
		.max(1000000000, "Стоимость должна быть не более 1000000000(1 миллиард)")
		.required("Нужно указать стоимость")
		.typeError("Стоимость должна быть числом")
});

function AddItem() {
	let { id } = useParams();
	let history = useHistory();
	const [itemInfo, setItemInfo] = React.useState();
	// eslint-disable-next-line no-unused-vars
	const [img, setImg] = React.useState("");
//	const [imgName, setImgName] = React.useState("Image");



/*

//ДОБАВЛЕНИЕ ИЗОБРАЕНИЯ BASE64

	const getImage = (event) => {

		// setImg(event.target.files[0]);
		// setImgName(event.target.files[0].name);

		// function encodeImageFileAsURL(element) {
		var file = event.target.files[0];
		setImgName(event.target.files[0].name);
		var reader = new FileReader();
		reader.onloadend = function () {
			//console.log('RESULT', reader.result)
			setImg(reader.result)
		}
		reader.readAsDataURL(file);
	}
	// };
*/


	React.useEffect(() => {
		if (id && !itemInfo) {
			axios.get(`${process.env.REACT_APP_API_SERVER_URL}item/` + id).then(response => {
				setItemInfo(response.data);
			});
		}
	});

	if (!id && !itemInfo) {
		setItemInfo({
			name: "",
			price: undefined,
			//image: "",
			description: ""
		});
	}

	return (
		<div className="cotainer__addItem-inner">
			{<h3>{id ? "Редактирование товара" : "Добавление товара"}</h3>}
			{itemInfo && (
				<Formik initialValues={{ name: itemInfo.name, price: itemInfo.price, //image: itemInfo.image, 
					description: itemInfo.description }}
					validationSchema={validationSchema}
					onSubmit={values => {
						if (id) {
							axios.put(`${process.env.REACT_APP_API_SERVER_URL}item/` + id, {
								name: values.name,
								price: values.price,
								//image: values.image,
								date: insertDate(),
								description: values.description
							})
								.then(response => {
									cogoToast.success("Товар изменён!", {/*position: 'bottom-center'*/ });
									history.push("/itemsandproperty");
								})
								.catch(function (error) {
									cogoToast.error('Ошибка изменения товара!', {/*position: 'bottom-center'*/ });
									//console.log(error);
								});
						} else {
							axios.post(`${process.env.REACT_APP_API_SERVER_URL}item/`, {
								name: values.name,
								price: values.price,
								//image: img,
								date: insertDate(),
								description: values.description
							})
								.then(response => {
									cogoToast.success("Товар добавлен!", {/*position: 'bottom-center'*/ });
									history.push("/itemsandproperty");
								})
								.catch(function (error) {
									cogoToast.error('Ошибка добавления товара!', {/*position: 'bottom-center'*/ });
									//console.log(error);
								});
						}
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<div className="input-row">
								<label className="addItem__input-label" htmlFor="Name">Название товара<span>*</span></label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Mercedes S550 4matic"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									className={touched.name && errors.name ? "has-error" : null}
								/>
								<Error touched={touched.name} message={errors.name} />
							</div>

							<div className="input-row">
								<label className="addItem__input-label" htmlFor="price">
									Стоимость товара<span>*</span>
								</label>
								<input
									type="number"
									name="price"
									id="price"
									placeholder="113 000"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.price}
									className={touched.price && errors.price ? "has-error" : null}
								/>
								<Error touched={touched.price} message={errors.price} />
							</div>

							<div className="input-row">
								<p className="addItem__input-label img-label">Изображение<span>*</span></p>{/*console.log("DFCZ", img)*/}
								<label className="img__upload-label" htmlFor="1">{/*imgName*/}</label>
								<input
									id="1"
									className="img__upload"
									type="file"
									name="image"
									accept="image/*"
									// onChange={getImage}
									// onBlur={handleBlur}
									// value={values.image}
								/>
								<Error />
							</div>
							<div className="input-row">
								<label className="addItem__input-label" htmlFor="description">
									Описание
              </label>
								<textarea
									name="description"
									type="text"
									id="description"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.description}
									className={touched.description && errors.description ? "has-error" : null}
									placeholder="Не следует, однако забывать, что начало повседневной работы по 
                      формированию позиции требуют определения и уточнения существенных 
                      финансовых и административных условий. Разнообразный и богатый опыт 
                      консультация с широким активом способствует подготовки и реализации"

								/>
								<Error touched={touched.description} message={errors.description} />
							</div>

							<div className="addPropertyToItem__title">
								<h3>{id ? "Редактирование свойств товара" : "Добавление товару свойств"}</h3>
								<button className="icon-plus-circle add__btn"></button>
							</div>

							<div className="addPropertyToItem__container">
								<div className="addPropertyToItem__container-inner">
									<div className="propertyTitleAndBtn__block">
										<button className="icon-minus-circle minus__btn"></button>
										<p className="property-add__title">Свойство 1</p>
									</div>
									<p className="select__p">
										<select>
											<option>Цвет авто</option>
											<option>Год выпуска</option>
											<option>Тип топлива</option>
										</select>
									</p>
								</div>
								<div className="addPropertyToItem__container-inner">
									<p>Значение</p>
									<input type="text" placeholder="" defaultValue="Черный" />
									<br />
									<div className="additinalValue__container">
										<input type="text" placeholder="" defaultValue="Синий" />
										<button className="icon-minus-circle minus__btn"></button>
									</div>
									<button className="icon-plus-circle add__btn"></button>
								</div>
							</div>


							<div className="nav-btn__container">
								<Link className="nav-btn" to="/itemsandproperty">
									Вернуться
              </Link>
								<button type="submit" disabled={isSubmitting}>
									Отправить
              </button>
							</div>
						</form>
					)}
				</Formik>
			)}
		</div>
	);
}

export default AddItem;