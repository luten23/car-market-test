import React from "react"
import { Link } from "react-router-dom"
import { delItem } from "../../../store/actions"
import { useDispatch } from "react-redux"
import styles from "./buttonsList.module.css"

export function ItemListButtons(props) {
	const { id } = props
	const dispatch = useDispatch()

  const handleDelete = () => {
		dispatch(delItem(id))
	}

  return (
    <div className={styles.listBtns__container}>
      <Link style={{color: "#0258ff"}} to={`/edititem/${id}`}>Ред.</Link>
      <button className={styles.del__btn} onClick={handleDelete}>Удалить</button>
    </div>
  );
}