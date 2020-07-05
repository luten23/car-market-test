import React from "react"
import styles from "./error.module.css"

export const Error = ({ touched, message }) => {
	if (!touched) {
		return <div className={styles.form_message__invalid}>&nbsp;</div>
	}
	if (message) {
		return <div className={styles.form_message__invalid}>{message}</div>
	}
	return <div className={styles.form_message__valid}>&nbsp;</div>
}
