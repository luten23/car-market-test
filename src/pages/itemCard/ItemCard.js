import React from "react"
import { Link, useParams } from "react-router-dom"
import "../../styles/icomoon-style.css"
import { getItemCardData } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"

function ItemCard() {
	let { id } = useParams()
	const [dataRecived, setDataRecived] = React.useState(false)
	const dispatch = useDispatch()

    if (dataRecived === false) { 
			dispatch(getItemCardData(id))
      setDataRecived(true)
    }

	const itemInfo = useSelector(state => state.itemInfo.itemInfo)

  return (
    <div className="ItemCard__inner">
      <Link className="back__btn" to="/itemsandproperty">
        Вернуться
      </Link>
      {/* {dataRecived && ( */}
        <div>
          <div className="line__line"></div>
          <div className="ItemCard__discription">
            <img src={require("../../images/item-img.png")} alt="itemImage" />
            <div className="ItemCard__discription-text">
              <h1>{itemInfo.name}</h1>
              <p>{itemInfo.description}</p>
            </div>
          </div>
          <form action="f" method="post">
            <h3>Цвет</h3>
            <p className="select__p">
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
            <p className="price">{itemInfo.price}<span> $</span></p>
            <p className="buy__btn">
              <input type="submit" value="Беру!!!" />
            </p>
          </form>
        </div>
      {/* )} */}
    </div>
  );
}

export default ItemCard;
