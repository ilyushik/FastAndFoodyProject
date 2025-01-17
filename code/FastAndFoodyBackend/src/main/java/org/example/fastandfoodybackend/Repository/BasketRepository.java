package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Basket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends JpaRepository<Basket, Integer> {
}
