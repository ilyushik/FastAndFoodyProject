import "./SelectRestaurantView.css"
import Layout from "../../../components/usersComponents/Layout/Layout";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import SelectRestaurantViewComponent
    from "../../../components/publicComponents/SelectRestaurantViewComponent/SelectRestaurantViewComponent";

export default function SelectRestaurantView() {

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [restaurants, setRestaurants] = useState([]);

    const [cityZoom, setCityZoom] = useState({});

    const zoom = selectedCity === null ? 4 : 11

    const center = {lat: selectedCity ? cityZoom.latitude : 48.208772,
        lng: selectedCity ? cityZoom.longitude : 16.372741}

    const fetchCitiesHandler = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/additional/city`)
            console.log(response.data)

            const formattedCities = response.data.map(city => ({
                label: city.name,
                value: city.name
            }));

            setCities(formattedCities);
        } catch (e) {
            console.log(e.response.data)
        }
    }, [])

    const fetchRestaurantsHandler = useCallback(async () => {
        setRestaurants([]);
        try {
            const response = await axios.get(selectedCity
                ? `${process.env.REACT_APP_BACKEND_LINK}/restaurant?city=${selectedCity.value}`
                : `${process.env.REACT_APP_BACKEND_LINK}/restaurant`);
            console.log(response.data);
            setRestaurants(response.data);
        } catch (e) {
            console.log(e.response?.data || e.message);
        }
    }, [selectedCity]);

    const fetchCityHandler = async (city) => {
        try {
            const response =
                await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/additional/city?city=${city}`)
            console.log(response.data)
            setCityZoom(response.data);
        } catch (e) {
            console.log(e.response?.data)
        }
    }

    useEffect(() => {
        fetchCitiesHandler();
    }, [fetchCitiesHandler]);

    useEffect(() => {
        fetchRestaurantsHandler()
    }, [fetchRestaurantsHandler]);

    const cityHandler = (selected) => {
        setSelectedCity(selected);
        fetchCityHandler(selected?.value)
    }

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    })

    if (!isLoaded) {
        return (
            <p>...</p>
        )
    }

    const clearSelectedCity = () => {
        setSelectedCity(null);
        fetchRestaurantsHandler()
        setCityZoom(null)
    }

    const handleMapClick = (restaurant) => {
        alert(`Restaurant №${restaurant.id}, ${restaurant.address}`);
    };

    return (
        <Layout>
            <div className="selectRestaurantView-container">
                <div className="selectRestaurantView-select-city">
                    <Select className="selectRestaurantView-selector" options={cities}
                            onChange={cityHandler}
                            value={selectedCity}
                            placeholder="Select city"
                            isClearable={clearSelectedCity}/>

                    <div className="selectRestaurantView-restaurants-block">
                        {restaurants?.map((restaurant) => {
                            return (
                                <SelectRestaurantViewComponent restaurant={restaurant} />
                            )
                        })}
                    </div>
                </div>

                <div className="selectRestaurantView-map">
                    <GoogleMap center={center} zoom={zoom} mapContainerStyle={{width:'100%', aspectRatio: '1.1/1',
                    borderRadius: '10px'}}>
                        {restaurants?.map((restaurant) => {
                            return (
                                <Marker position={{lat: restaurant.latitude, lng: restaurant.longitude}}
                                onClick={() => handleMapClick(restaurant)}/>
                            )
                        })}
                    </GoogleMap>
                </div>
            </div>
        </Layout>
    )
}