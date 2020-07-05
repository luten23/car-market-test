import React from "react"
import { Link } from "react-router-dom"
import ItemListTableMaterial from "./elements/ItemListTableMaterial"
import PropertyListTableMaterial from "./elements/PropertyListTableMaterial"

import Tabs from "../../elements/Tabs";

function AllItemsAndProperty() {

	const initialFormState = { searchReq: "" }
	// используем useState и передаем в качестве начального значения объект - initialFormState
	const [searchReq, setSearchReq] = React.useState(initialFormState)

	const handleInputChange = event => {
		const { value } = event.currentTarget
		setSearchReq({ searchReq: value })
	}

	return (
		<div className="container__inner-items-property">
			<Tabs>

				<div className="tab__content" label="Листинг товаров">
					<div className="items__inner-container">

						<div className="search__input-container" >
							<input
								type="text"
								placeholder="Поиск"
								value={searchReq.value}
								onChange={handleInputChange}
							/>
						</div>
						{/*console.log(searchReq)*/}
						<Link className="link__btn" to="/additem">Добавить товар</Link>
					</div>
					<ItemListTableMaterial searchReq={searchReq} />
				</div>

				<div className="tab__content" label="Листинг проперти">
					<div className="property__inner-container">
						<Link className="link__btn" to="/addproperty">Добавить проперти</Link>
					</div>
						<PropertyListTableMaterial />
				</div>
			</Tabs>
		</div>
	);
}

export default AllItemsAndProperty;
