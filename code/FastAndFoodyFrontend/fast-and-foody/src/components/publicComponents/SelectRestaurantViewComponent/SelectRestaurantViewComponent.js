import "./SelectRestaurantViewComponent.css"
import arrow from "../../../images/arrow-right-short.png"
import {useNavigate} from "react-router-dom";

export default function SelectRestaurantViewComponent(props) {

    const restaurant = props.restaurant;
    const navigate = useNavigate()

    const continueOrder = () => {
        const purchase = {
            restaurantId: restaurant.id
        }

        localStorage.setItem("purchase", JSON.stringify(purchase));
        navigate('/order-form')
    }

    return (
        <div className="selectRestaurantViewComponent-container">
            <div className="selectRestaurantView-restaurant-number-address">
                <p className="selectRestaurantViewComponent-titles">Restaurant №{restaurant.id}</p>
                <p className="selectRestaurantViewComponent-titles">{restaurant.address}</p>
            </div>

            <img onClick={continueOrder} src={arrow} className="selectRestaurantViewComponent-image" />
        </div>
    )
}