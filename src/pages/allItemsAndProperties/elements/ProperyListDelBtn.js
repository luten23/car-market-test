import React from "react"
import { delProperty } from "../../../store/actions"
import { useDispatch } from "react-redux"
import styles from "./buttonsList.module.css"

export function ProperyListDelBtn(props) {
	const { id } = props
	const dispatch = useDispatch()

  const handleDelete = () => {
		dispatch(delProperty(id))
  }

  return (
    <div className={styles.properyListDelBtn__container}>
      <button className={styles.del__btn} onClick={handleDelete}>Удалить</button>
    </div>
  )
}