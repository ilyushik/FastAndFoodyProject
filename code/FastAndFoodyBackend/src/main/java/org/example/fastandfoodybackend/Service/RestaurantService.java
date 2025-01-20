package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.RestaurantDTO;
import org.example.fastandfoodybackend.Repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<RestaurantDTO> allRestaurantsDTO() {
        return restaurantRepository.findAll().stream().map(r->{
            RestaurantDTO restaurantDTO = new RestaurantDTO();
            restaurantDTO.setId(r.getId());
            restaurantDTO.setAddress(r.getAddress());
            restaurantDTO.setLatitude(r.getLatitude());
            restaurantDTO.setLongitude(r.getLongitude());
            restaurantDTO.setCity(r.getCityId().getName());
            restaurantDTO.setPhone(r.getPhone());
            restaurantDTO.setEmail(r.getEmail());
            return restaurantDTO;
        }).toList();
    }

    public List<RestaurantDTO> restaurantDtoByCity(String city) {
        List<RestaurantDTO> allRestaurantsDTO = allRestaurantsDTO();
        allRestaurantsDTO = allRestaurantsDTO.stream().filter(r->r.getCity().equals(city)).toList();

        return allRestaurantsDTO;
    }
}
