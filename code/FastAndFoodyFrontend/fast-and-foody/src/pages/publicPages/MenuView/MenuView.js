import "./MenuView.css"
import Layout from "../../../components/usersComponents/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import MenuItemComponent from "../../../components/publicComponents/MenuItemComponent/MenuItemComponent";

export default function MenuView() {
    const [items, setItems] = useState([]);

    const fetchItemsHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/item`, {});
            console.log(response.data);
            setItems(response.data);
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    }, []);

    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler]);

    const groupItemsByCategory = (items) => {
        return items.reduce((acc, item) => {
            const category = item.category || "Без категории";
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(item);
            return acc;
        }, {});
    };

    const groupedItems = groupItemsByCategory(items);

    const addItemToLocalStorage = (item) => {
        let storedItems = JSON.parse(localStorage.getItem("items"));
        if (!Array.isArray(storedItems)) {
            storedItems = [];
        }

        localStorage.setItem("items", JSON.stringify([...storedItems, item]));
    };



    return (
        <Layout>
            <div className="menuView-block">
                <div>
                    {Object.entries(groupedItems).map(([category, categoryItems]) => (
                        <div key={category} className="category-block">
                            <h2 className="category-title">{category}</h2>
                            <div className="menuView-container">
                                {categoryItems.map((item) => (
                                    <MenuItemComponent key={item.id} item={item} addItem={() =>
                                        addItemToLocalStorage(item)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
