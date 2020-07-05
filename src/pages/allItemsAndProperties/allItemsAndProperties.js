import React from "react"
import { Link } from "react-router-dom"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { ItemListTableMaterial } from "./elements/ItemListTableMaterial"
import { PropertyListTableMaterial } from "./elements/PropertyListTableMaterial"
import styles from "./itemsAndProperties.module.css"
import "./tabsStyles.css"

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}	{...other}>
			{value === index && (
				<Box>
					<Typography component={"span"}>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

export function AllItemsAndProperties() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	}

	const initialFormState = { searchReq: "" }
	// используем useState и передаем в качестве начального значения объект - initialFormState
	const [searchReq, setSearchReq] = React.useState(initialFormState)

	const handleInputChange = event => {
		const { value } = event.currentTarget
		setSearchReq({ searchReq: value })
	}

	return (
		<div className={styles.main__container}>
			<Tabs value={value} onChange={handleChange} aria-label="styled tabs">
				<Tab label="Листинг товаров" />
				<Tab label="Листинг проперти" />
			</Tabs>
			<TabPanel value={value} index={0}>
				<div className={styles.items__inner_container}>
					<div className={styles.search__input_container} >
						<input
							type="text"
							placeholder="Поиск"
							value={searchReq.value}
							onChange={handleInputChange}
						/>
					</div>
					<Link className={styles.link__btn} to="/additem">Добавить товар</Link>
				</div>
				<ItemListTableMaterial searchReq={searchReq} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<div className={styles.property__inner_container}>
					<Link className={styles.link__btn} to="/addproperty">Добавить проперти</Link>
				</div>
				<PropertyListTableMaterial />
			</TabPanel>
		</div>
	)
}