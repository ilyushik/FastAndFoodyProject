import "./MenuItemComponent.css"
import plus from "../../../images/add-item.svg"

export default function MenuItemComponent(props) {

    const item = props.item;

    return (
        <div className="menuItemComponent-container" key={item.id}>
            <img src={item.image} className="menuItemComponent-image"/>

            <div className="menuItemComponent-info-block">
                <div className="menuItemComponent-info">
                    <p className="menuItemComponent-info-itemName">{item.itemName}</p>
                    <p className="menuItemComponent-info-itemPrice">{item.price}$</p>
                </div>

                <div className="menuItemComponent-add-button-block">
                    <button className="menuItemComponent-add-button" onClick={props.addItem}>
                        <img src={plus} className="menuItemComponent-add-button-icon"/>
                    </button>
                </div>
            </div>
        </div>
    )
}