package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.PurchaseRequestDTO;
import org.example.fastandfoodybackend.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/add")
    public ResponseEntity<?> addPurchase(@RequestBody PurchaseRequestDTO purchase) {
        if (purchase.getDeliveryWay().equals("Delivery") && purchase.getAddress().equals("") ) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("address", "Delivery address cannot be empty"));
        }
        return ResponseEntity.ok(purchaseService.createPurchase(purchase));
    }
}
