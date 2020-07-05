import axios from 'axios'
import cogoToast from 'cogo-toast';

// авторизация
export const authorization = (value) => {
	return {
		type: 'SIGN_IN',
		payload: value
	}
}

export const setItemInfoDefault = () => {
	return {
		type: 'DATA_SET_DEFAULT',
		payload: ''
	}
}

// получение всего списка айтемов для главной страницы
export const getAllItems = () => { 
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:3333/item`);
			const rows = response.data;
			dispatch({
				type: 'GET_ALL_ITEMS',
				payload: rows
			})
		}
		catch (error) {
			cogoToast.error('Не удалось получить данные от сервера!');
		}
	}
}

// получение всего списка проперти для главной страницы
export const getAllProperties = () => { 
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:3333/property`);
			const rows = response.data;
			dispatch({
				type: 'GET_ALL_PROPERTIES',
				payload: rows
			})
		}
		catch (error) {
			cogoToast.error('Не удалось получить данные от сервера!');
		}
	}
}

// получение данных конкретного айтема для просмотра карточки товара
export const getItemCardData = (id) => {
	return async dispatch => {
		try {
			const response = await axios.get(`http://localhost:3333/item/${id}`)
			const itemInfo = response.data
			dispatch({
				type: 'GET_ITEM_CARD_DATA',
				payload: itemInfo
			})
		}
		catch (error) {
			cogoToast.error('Не удалось получить данные от сервера!');
		}
	}
}

// изменение данных при редактировании товара
export const putItemData = (id, name, price, description) => {
	return dispatch => {
		return axios.put(`http://localhost:3333/item/${id}`, { name, price, description })
			.then(response => {
				cogoToast.success("Товар изменён!");
				dispatch({
					type: 'PUT_ITEM_DATA',
					payload: ''
				})
			}).catch((error) => {
				cogoToast.error('Ошибка изменения товара!');
			});
	}
}

// добовление нового айтема
export const postItemData = ( name, price, description) => {
	return dispatch => {
		return axios.post(`http://localhost:3333/item`, { name, price, description })
			.then(response => {
				cogoToast.success("Товар добавлен!");
				dispatch({
					type: 'POST_ITEM_DATA',
					payload: ''
				})
			}).catch((error) => {
				cogoToast.error('Ошибка добавления товара!');
			});
	}
}

// добавление проперти, с проверкой на уникальность имени
export const postProperty = (name, type) => {
	return dispatch => {
		return axios.get(`http://localhost:3333/property?name=${name}`)
			.then(response => { 
			// возвращаем response.data.length === 1 если имя - есть в базе данных, и 0 если нет
				if (response.data.length === 0) {
					axios.post(`http://localhost:3333/property/`, { name, type })
						.then(response => {
							cogoToast.success("Проперти добавлен!");
						})
						.catch(function (error) {
							cogoToast.error('Ошибка добавления проперти!');
						});
				}
				else {
					cogoToast.error('Проперти с таким именем уже существует!');
				}
				dispatch({
					type: 'POST_PROPERTY',
					payload: 'lol'
				})
			}).catch((error) => {
				cogoToast.error('Проперти с таким именем уже существует!');
			});
	}
}