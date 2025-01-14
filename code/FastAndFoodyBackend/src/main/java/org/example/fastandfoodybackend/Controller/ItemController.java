package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("")
    public ResponseEntity<?> items() {
        return ResponseEntity.ok(itemService.items());
    }
}
