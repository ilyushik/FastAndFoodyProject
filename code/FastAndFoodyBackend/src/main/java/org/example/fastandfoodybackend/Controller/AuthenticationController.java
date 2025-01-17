package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Security.AuthenticationRequest;
import org.example.fastandfoodybackend.Security.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@CrossOrigin("*")
public class AuthenticationController {

    private final AuthenticationService service;
    private final PersonRepository repository;

    public AuthenticationController(AuthenticationService service, PersonRepository repository) {
        this.service = service;
        this.repository = repository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request) {
        Person person = repository.findByUsername(request.getUsername()).orElse(null);
        if (person == null) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("username", "User with this username does not exist"));
        }
        if (!person.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("password", "Invalid password"));
        }
        return ResponseEntity.ok(service.login(request));
    }
}
