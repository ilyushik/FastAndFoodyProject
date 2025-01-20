package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.OrderItemDTO;
import org.example.fastandfoodybackend.Model.OrderItem;
import org.example.fastandfoodybackend.Model.Purchase;
import org.example.fastandfoodybackend.Repository.ItemRepository;
import org.example.fastandfoodybackend.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemService {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private ItemRepository itemRepository;

    public OrderItem save(OrderItemDTO orderItem, Purchase purchase) {
        OrderItem orderItemEntity = new OrderItem();
        orderItemEntity.setAmount(orderItem.getAmount());
        orderItemEntity.setTotal(orderItem.getTotal());
        orderItemEntity.setItemId(itemRepository.findById(orderItem.getItemId()).orElse(null));
        orderItemEntity.setPurchase(purchase);

        return orderItemRepository.save(orderItemEntity);
    }
}
