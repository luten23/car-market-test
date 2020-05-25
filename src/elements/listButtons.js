import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import cogoToast from 'cogo-toast';

function listButtons(props) {
  const { id, deleteCallback } = props;
  let customLinkEdit = `/edititem/${id}`

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_SERVER_URL}item/` + id)
    .then(response => {
      cogoToast.success("Товар удален!", {/*position: 'bottom-center'*/});
      deleteCallback(id);
    })
    .catch(function(error) {
      cogoToast.error('Ошибка удаления товара!', {/*position: 'bottom-center'*/});
      //console.log(error);
    });
  };

  const handleUpdate = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER_URL}item/` + id).then(response => {
    });
  };

  return (
    <div className="listBtns__container">
      <Link className="edit__btn" to={customLinkEdit} onClick={handleUpdate}>Ред.</Link>
      <button className="del__btn" onClick={handleDelete}>Удалить</button>
    </div>
  );
}

export default listButtons;
