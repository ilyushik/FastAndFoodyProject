package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.City;
import org.example.fastandfoodybackend.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
}
