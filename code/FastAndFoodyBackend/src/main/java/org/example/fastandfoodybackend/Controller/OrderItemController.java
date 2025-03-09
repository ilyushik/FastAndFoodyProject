package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Service.OrderItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order-item")
public class OrderItemController {

    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findByPurchaseId(@PathVariable("id") int purchaseId) {
        return ResponseEntity.ok(orderItemService.findOrderItemsByOrderId(purchaseId));
    }
}
