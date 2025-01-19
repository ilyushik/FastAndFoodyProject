import "./MenuView.css"
import Layout from "../../../components/usersComponents/Layout/Layout";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import MenuItemComponent from "../../../components/publicComponents/MenuItemComponent/MenuItemComponent";

export default function MenuView() {
    const [items, setItems] = useState([]);

    const fetchItemsHandler = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/item`, {
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${localStorage.getItem("token")}`
                // }
            });
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

    return (
        <Layout>
            <div className="menuView-block">
                <div>
                    {Object.entries(groupedItems).map(([category, categoryItems]) => (
                        <div key={category} className="category-block">
                            <h2 className="category-title">{category}</h2>
                            <div className="menuView-container">
                                {categoryItems.map((item) => (
                                    <MenuItemComponent key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="menu-padding"></div>
                </div>
            </div>
        </Layout>
    );
}
