import React from "react";
import axios from "axios";
import cogoToast from 'cogo-toast';

function ProperyListDelBtn(props) {
  const { id, deleteCallback } = props;

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_SERVER_URL}property/` + id)
    .then(response => {
      cogoToast.success("Проперти удалён!");
      deleteCallback(id);
    })
    .catch(function(error) {
      cogoToast.error('Ошибка удаления проперти!', {/*position: 'bottom-center'*/});
      //console.log(error);
    });
  };

  return (
    <div className="ProperyListDelBtn__container">
      <button className="del__btn" onClick={handleDelete}>Удалить</button>
    </div>
  );
}

export default ProperyListDelBtn;
