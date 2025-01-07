package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public ResponseEntity<?> people() {
        return ResponseEntity.ok(personService.people());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> person(@PathVariable int id) {
        return ResponseEntity.ok(personService.findById(id));
    }
}
