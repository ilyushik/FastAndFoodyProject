package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.Model.Basket;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.BasketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BasketService {

    @Autowired
    private BasketRepository basketRepository;

    public Basket saveBasket(Person person) {
        Basket basket = new Basket();
        basket.setPersons(person);

        return basketRepository.save(basket);
    }
}
