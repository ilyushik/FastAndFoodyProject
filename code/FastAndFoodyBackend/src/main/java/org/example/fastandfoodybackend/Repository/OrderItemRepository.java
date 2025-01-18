package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Basket;
import org.example.fastandfoodybackend.Model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository  extends JpaRepository<OrderItem, Integer> {
    void deleteOrderItemByBasket(Basket basket);
}
