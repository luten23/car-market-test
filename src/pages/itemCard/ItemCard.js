import React from "react"
import { Link, useParams } from "react-router-dom"
import "../../styles/icomoon-style.css"
import { getItemCardData } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"
import styles from "./ItemCard.module.css"
import image from "../../images/item-img.png"

export function ItemCard() {
	let { id } = useParams()
	const [dataRecived, setDataRecived] = React.useState(false)
	const dispatch = useDispatch()

	if (dataRecived === false) {
		dispatch(getItemCardData(id))
		setDataRecived(true)
	}

	const itemInfo = useSelector((state) => state.itemInfo.itemInfo)

	return (
		<div className={styles.itemCard__container}>
			<Link className={styles.back__btn} to="/itemsandproperties">
				Вернуться
			</Link>
			<div>
				<div className={styles.line__line}></div>
				<div className={styles.itemCard__discription}>
					<img src={image} alt="itemImage" />
					<div className={styles.itemCard__discription_text}>
						<h1>{itemInfo.name}</h1>
						<p>{itemInfo.description}</p>
					</div>
				</div>
				<form action="f" method="post">
					<h3>Цвет</h3>
					<p className={styles.select__p}>
						<select defaultValue="Синий">
							<option value="Синий">Синий</option>
							<option value="Черный">Черный</option>
							<option value="Белый">Белый</option>
						</select>
					</p>
					<h3>Год выпуска</h3>
					<p>2017</p>
					<h3>Тип топлива</h3>
					<p>Бензин</p>
					<h3>Стоимость</h3>
					<p className={styles.price}>
						{itemInfo.price}
						<span> $</span>
					</p>
					<p className={styles.buy__btn}>
						<input type="submit" value="Беру!!!" />
					</p>
				</form>
			</div>
		</div>
	)
}
