package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("")
    public ResponseEntity<?> getRestaurants(@RequestParam(value = "city", required = false) String city) {
        if (city == null) {
            return ResponseEntity.ok(restaurantService.allRestaurantsDTO());
        }

        return ResponseEntity.ok(restaurantService.restaurantDtoByCity(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRestaurantById(@PathVariable int id) {
        return ResponseEntity.ok(restaurantService.findRestaurantById(id));
    }
}
