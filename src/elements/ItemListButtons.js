import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import cogoToast from "cogo-toast"

function ItemListButtons(props) {
  const { id, deleteCallback } = props;

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_SERVER_URL}item/${id}`)
    .then(response => {
      cogoToast.success("Товар удален!")
      deleteCallback()
    })
    .catch(function(error) {
      cogoToast.error("Ошибка удаления товара!")
    });
  };

  return (
    <div className="listBtns__container">
      <Link className="edit__btn" to={`/edititem/${id}`}>Ред.</Link>
      <button className="del__btn" onClick={handleDelete}>Удалить</button>
    </div>
  );
}

export default ItemListButtons;
