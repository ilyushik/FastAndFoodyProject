package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.OrderItemDTO;
import org.example.fastandfoodybackend.Model.Basket;
import org.example.fastandfoodybackend.Model.OrderItem;
import org.example.fastandfoodybackend.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ItemService itemService;

    public List<OrderItem> findOrderItemsByUser(int personId) {
        return orderItemRepository.findAll().stream().filter(o -> o.getBasket().getPerson().getId() == personId).toList();
    }

    public OrderItem addOrderItem(OrderItemDTO orderItem, Basket basket) {
        OrderItem orderItemToAdd = new OrderItem();
        orderItemToAdd.setAmount(orderItem.getAmount());
        orderItemToAdd.setBasket(basket);
        orderItemToAdd.setTotal(orderItem.getTotal());
        orderItemToAdd.setItemId(itemService.findItemById(orderItem.getItemId()));

        return orderItemRepository.save(orderItemToAdd);
    }
}
