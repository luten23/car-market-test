import React from "react"
import "../../styles/icomoon-style.css"
import { Link, useHistory, useParams } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import Error from "../../elements/Error"
import { getAllItems, putItemData, postItemData, getItemCardData, setItemInfoDefault } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Название должно быть не более 255 символов")
		.required("Нужно указать название"),
	price: Yup.number()
		.max(1000000000, "Стоимость должна быть не более 1000000000(1 миллиард)")
		.min(0, "Стоимость должна быть не меньше 0")
		.required("Нужно указать стоимость")
		.typeError("Стоимость должна быть числом")
});

function AddItem() {
	let { id } = useParams()
	let history = useHistory()
	const dispatch = useDispatch()
	const [dataRecived, setDataRecived] = React.useState(false);

	if (!id) {
		dispatch(setItemInfoDefault()) 
	}

	if (id && dataRecived === false) {
		dispatch(getItemCardData(id))
		setDataRecived(true)
	}

	const itemInfoState = useSelector(state => state.itemInfo.itemInfo)

	return (
		<div className="cotainer__addItem-inner">
			<h3>{id ? "Редактирование товара" : "Добавление товара"}</h3>
			{true && (
				<Formik initialValues={{ name: itemInfoState.name, price: itemInfoState.price, //image: itemInfo.image, 
					description: itemInfoState.description }}
					validationSchema={validationSchema}
					enableReinitialize={true}
					onSubmit={values => {
						if (id) {
							dispatch(putItemData(id, values.name, values.price, values.description)) // изменение
							history.push("/itemsandproperty") // пушим к списку товаров
							dispatch(getAllItems()) // обновление списка всех item'ов
						}
						else {
							dispatch(postItemData(values.name, values.price, values.description)) // создание
							history.push("/itemsandproperty") // пушим к списку товаров
							dispatch(getAllItems()) // обновление списка всех item'ов
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