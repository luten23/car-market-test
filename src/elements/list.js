import React from "react";
import axios from "axios";

function ItemListGetData() {
  const [itemList, setItemList] = React.useState();

  React.useEffect(() => {
    // console.log("hook");
    if (!itemList) {
      axios.get(`${process.env.REACT_APP_API_SERVER_URL}db`).then(response => {
        const data = response.data;
        //console.log("FFF", data.item);
        setItemList(data.item);
      });
    }
  }, [itemList]);

  //console.log("itemList", itemList);
  //console.log("render");

  return (
    <ul>
      {itemList &&
        itemList.map(item => (
          <li key={item.id}>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div>{item.date}</div>
          </li>
        ))}
    </ul>
  );
}

export default ItemListGetData;
