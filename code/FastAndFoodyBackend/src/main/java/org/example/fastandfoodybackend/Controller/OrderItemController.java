package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.OrderItemDTO;
import org.example.fastandfoodybackend.Model.Basket;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Service.BasketService;
import org.example.fastandfoodybackend.Service.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/order-item")
public class OrderItemController {

    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private BasketService basketService;

    @GetMapping
    public ResponseEntity<?> orderItemsById() {
        int id = 1;

        return ResponseEntity.ok(orderItemService.findOrderItemsByUser(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> addOrderItem(@RequestBody OrderItemDTO orderItem) {
        int personId = 1;
        Person person = personRepository.findById(personId).orElseThrow();
        Basket basket = basketService.saveBasket(person);
        return ResponseEntity.ok(orderItemService.addOrderItem(orderItem, basket));
    }
}
