package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.PurchaseRequestDTO;
import org.example.fastandfoodybackend.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/purchase")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/add")
    public ResponseEntity<?> addPurchase(@RequestBody PurchaseRequestDTO purchase) {
        return ResponseEntity.ok(purchaseService.createPurchase(purchase));
    }

    @GetMapping("/setPerson/{id}")
    public ResponseEntity<?> setPerson(@PathVariable int id) {
        return ResponseEntity.ok(purchaseService.setPersonToPurchase(id));
    }
}
