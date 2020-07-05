import React from "react"
import "../../styles/icomoon-style.css"
import { Link, useHistory, useParams } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Error } from "../../elements/Error"
import { putItemData, postItemData, getItemCardData, setItemInfoDefault } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./addItem.module.css"

const validationSchema = Yup.object().shape({
	name: Yup.string()
		.max(255, "Название должно быть не более 255 символов")
		.required("Нужно указать название"),
	price: Yup.number()
		.max(1000000000, "Стоимость должна быть не более 1000000000(1 миллиард)")
		.min(0, "Стоимость должна быть не меньше 0")
		.required("Нужно указать стоимость")
		.typeError("Стоимость должна быть числом")
})

export function AddItem() {
	let { id } = useParams()
	let history = useHistory()
	const dispatch = useDispatch()
	const [dataRecived, setDataRecived] = React.useState(false)

	// создание
	if (!id) {
		dispatch(setItemInfoDefault())
	}

	// изменение
	if (id && dataRecived === false) {
		dispatch(getItemCardData(id))
		setDataRecived(true)
	}

	const itemInfoState = useSelector(state => state.itemInfo.itemInfo)

	return (
		<div className={styles.cotainer__addItem_inner}>
			<h3>{id ? "Редактирование товара" : "Добавление товара"}</h3>
			{true && (
				<Formik initialValues={{
					name: itemInfoState.name,
					price: itemInfoState.price,
					description: itemInfoState.description
				}}
					validationSchema={validationSchema}
					enableReinitialize={true}
					onSubmit={values => {
						if (id) {
							dispatch(putItemData(id, values.name, values.price, values.description)) // изменение
							history.push("/itemsandproperties") // пушим к списку товаров
						}
						else {
							dispatch(postItemData(values.name, values.price, values.description)) // создание
							history.push("/itemsandproperties") // пушим к списку товаров
						}
					}}
				>
					{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
						<form onSubmit={handleSubmit}>
							<div className={styles.input_row}>
								<label className={styles.addItem__input_label} htmlFor="Name">Название товара<span>*</span></label>
								<input
									type="text"
									name="name"
									id="name"
									placeholder="Mercedes S550 4matic"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									className={touched.name && errors.name ? styles.has_error : null}
								/>
								<Error touched={touched.name} message={errors.name} />
							</div>

							<div className={styles.input_row}>
								<label className={styles.addItem__input_label} htmlFor="price">
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
									className={touched.price && errors.price ? styles.has_error : null}
								/>
								<Error touched={touched.price} message={errors.price} />
							</div>

							<div className={styles.input_row}>
								<p className={styles.img_label}>Изображение<span>*</span></p>
								<label className={styles.img__upload_label} htmlFor="1">Image</label>
								<input
									id="1"
									className={styles.img__upload}
									type="file"
									name="image"
									accept="image/*"
								/>
								<Error />
							</div>
							<div className={styles.input_row}>
								<label className={styles.addItem__input_label} htmlFor="description">
									Описание
              </label>
								<textarea
									name="description"
									type="text"
									id="description"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.description}
									className={touched.description && errors.description ? styles.has_error : null}
									placeholder="Не следует, однако забывать, что начало повседневной работы по формированию позиции требуют определения и уточнения существенных финансовых и административных условий. Разнообразный и богатый опыт консультация с широким активом способствует подготовки и реализации"
								/>
								<Error touched={touched.description} message={errors.description} />
							</div>
							<div className={styles.addPropertyToItem__title}>
								<h3>{id ? "Редактирование свойств товара" : "Добавление товару свойств"}</h3>
								<button className={styles.add__btn}></button>
							</div>
							<div className={styles.addPropertyToItem__container}>
								<div className={styles.addPropertyToItem__container_inner}>
									<div className={styles.propertyTitleAndBtn__block}>
										<button className={styles.minus__btn}></button>
										<p className={styles.propertyAdd__title}>Свойство 1</p>
									</div>
									<p className={styles.select__p}>
										<select>
											<option>Цвет авто</option>
											<option>Год выпуска</option>
											<option>Тип топлива</option>
										</select>
									</p>
								</div>
								<div className={styles.addPropertyToItem__container_inner}>
									<p>Значение</p>
									<input type="text" placeholder="" defaultValue="Черный" />
									<br />
									<div className={styles.additinalValue__container}>
										<input type="text" placeholder="" defaultValue="Синий" />
										<button className={styles.minus__btn}></button>
									</div>
									<button className={styles.add__btn}></button>
								</div>
							</div>

							<div className={styles.nav_btn__container}>
								<Link className={styles.nav_btn} to="/itemsandproperties">
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
	)
}