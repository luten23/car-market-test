import axios from "axios"
import cogoToast from "cogo-toast"

/** авторизация */
export const authorization = (value) => {
	return {
		type: "SIGN_IN",
		payload: value
	}
}

/** получение всего списка айтемов для главной страницы + поиск */
export const getAllItems = (searchReq) => { 
	return async dispatch => {
		try {
			const response = await axios.get(`/item?name_like=${searchReq}`)
			const rows = response.data
			dispatch({
				type: "GET_ALL_ITEMS",
				payload: rows
			})
		}
		catch (error) {
			cogoToast.error("Не удалось получить данные от сервера!")
		}
	}
}

/** получение всего списка проперти для главной страницы */
export const getAllProperties = () => { 
	return async dispatch => {
		try {
			const response = await axios.get(`/property`)
			const rows = response.data
			dispatch({
				type: "GET_ALL_PROPERTIES",
				payload: rows
			})
		}
		catch (error) {
			cogoToast.error("Не удалось получить данные от сервера!")
		}
	}
}

/** получение данных конкретного айтема для просмотра карточки товара */
export const getItemCardData = (id) => {
	return async dispatch => {
		try {
			const response = await axios.get(`/item/${id}`)
			const itemInfo = response.data
			dispatch({
				type: "GET_ITEM_CARD_DATA",
				payload: itemInfo
			})
		}
		catch (error) {
			cogoToast.error("Не удалось получить данные от сервера!")
		}
	}
}

/** сброс данных перед добовлением нового item'a */
export const setItemInfoDefault = () => {
	return {
		type: "DATA_SET_DEFAULT"
	}
}

/** изменение данных при редактировании товара */
export const putItemData = (id, name, price, description) => {
	return async dispatch => {
		try {
			await axios.put(`/item/${id}`, { name, price, description })
			cogoToast.success("Товар изменён!")
			// dispatch(getAllItems()) // список обновляется в useEffect
		}
		catch (error) {
			cogoToast.error("Ошибка изменения товара!")
		}
	}
}

/** добовление нового айтема */
export const postItemData = ( name, price, description) => {
	return async dispatch => {
		try {
			await axios.post(`/item`, { name, price, description })
			cogoToast.success("Товар добавлен!")
			// dispatch(getAllItems()) // список обновляется в useEffect
		}
		catch (error) {
			cogoToast.error("Ошибка добавления товара!")
		}
	}
}

/** добавление проперти, с проверкой на уникальность имени */
export const postProperty = (name, type) => {
	return async dispatch => {
		try {
			const response = await axios.get(`/property?name=${name}`)
			// возвращаем response.data.length === 1 если имя - есть в базе данных, и 0 если нет
			if (response.data.length === 0) {
				axios.post(`/property/`, { name, type })
					.then(response_1 => {
						cogoToast.success("Проперти добавлен!")
					})
					.catch(function (error) {
						cogoToast.error("Ошибка добавления проперти!")
					})
			}
			else {
				cogoToast.error("Проперти с таким именем уже существует!")
			}
			dispatch(getAllProperties())
		}
		catch (error_1) {
			cogoToast.error("Проперти с таким именем уже существует!")
		}
	}
}

/** удаление товара */
export const delItem = (id) => { 
	return async dispatch => {
		try {
			await axios.delete(`/item/${id}`)
			cogoToast.success("Товар удален!")
			dispatch(getAllItems())
		}
		catch (error) {
			cogoToast.error("Ошибка удаления товара!")
		}
	}
}

/** удаление проперти */
export const delProperty = (id) => { 
	return async dispatch => {
		try {
			await axios.delete(`http://localhost:3333/property/${id}`)
			cogoToast.success("Проперти удален!")
			dispatch(getAllProperties())
		}
		catch (error) {
			cogoToast.error("Ошибка удаления проперти!")
		}
	}
}

/** установка токена в axios, сохранение токена в localStorage, и диспатч стэйта авторизации */
const saveUserToken = (token, dispatch) => {
	axios.defaults.headers.common.Authorization = `Bearer ${token}`
	localStorage.setItem("authorization_token", token)
	dispatch(authorization(true))
}

/** регистрация нового пользователя */
export const userRegisration = ( name, lastname, email, password ) => {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:3333/auth/register`, { name, lastname, email, password })
			cogoToast.success("Регистрация успешна!")
			const token = response.data.access_token
			saveUserToken(token, dispatch)
		}
		catch (error) {
			cogoToast.error("Регистрация не удалась!")
			cogoToast.info("Возможно указанный e-mail уже зарегестрирован")
		}
	}
}

/** авторизация пользователя */
export const userAuthorization = ( email, password ) => {
	return async dispatch => {
		try {
			const response = await axios.post(`http://localhost:3333/auth/login`, { email, password })
			cogoToast.success("Авторизация успешна!")
			const token = response.data.access_token
			saveUserToken(token, dispatch)
		}
		catch (error) {
			cogoToast.error("Авторизация не удалась!")
		}
	}
}