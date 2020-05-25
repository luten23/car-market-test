import React from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/icomoon-style.css";

function ItemCard() {
  let { id } = useParams();
  const [itemInfo, setItemInfo] = React.useState();

  React.useEffect(() => {
    if (!itemInfo) {
      axios.get(`${process.env.REACT_APP_API_SERVER_URL}item/` + id).then(response => {
        setItemInfo(response.data);
      });
    }
  });

  // console.log("ID =", id);
  // console.log("itemInfo =", itemInfo);

  return (
    <div className="ItemCard__inner">
      <Link className="back__btn" to="/itemsandproperty">
        Вернуться
      </Link>
      {itemInfo && (
        <div>
          <div className="line__line"></div>
          <div className="ItemCard__discription">
            <img src={require("./../images/item-img.png")} alt="тварь" />
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
      )}
    </div>
  );
}

export default ItemCard;
