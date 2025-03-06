package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.PersonDTO;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;
    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/my-info")
    private ResponseEntity<?> personsInfo(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        String name = principal.getAttribute("name");
        String picture = principal.getAttribute("picture");
        PersonDTO person = personService.findPersonByEmailChange(email, name, picture);

        return ResponseEntity.ok(person);
    }

    @GetMapping("/my-info/orders")
    public ResponseEntity<?> personsOrders(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Person person = personRepository.findPersonByEmail(email).orElseThrow();
        if (personService.usersPurchases(person.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no orders"));
        }

        return ResponseEntity.ok(personService.usersPurchases(person.getId()));
    }

    @GetMapping("/my-info/orders/{id}")
    public ResponseEntity<?> personsOrder(@PathVariable int id) {
        return ResponseEntity.ok(personService.findPurchaseById(id));
    }

    @GetMapping("/my-info/active-orders")
    public ResponseEntity<?> personsActiveOrders(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Person person = personRepository.findPersonByEmail(email).orElseThrow();
        if  (personService.usersActivePurchases(person.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no active orders"));
        }

        return ResponseEntity.ok(personService.usersActivePurchases(person.getId()));
    }

    @GetMapping("/my-info/finished-orders")
    public ResponseEntity<?> personsFinishedOrders(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Person person = personRepository.findPersonByEmail(email).orElseThrow();
        if  (personService.usersFinishedPurchases(person.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no finished orders"));
        }

        return ResponseEntity.ok(personService.usersFinishedPurchases(person.getId()));
    }

    @DeleteMapping("/my-info/delete")
    public ResponseEntity<?> personsDelete(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Person person = personRepository.findPersonByEmail(email).orElseThrow();

        return ResponseEntity.ok(personService.deletePerson(person));
    }
}
