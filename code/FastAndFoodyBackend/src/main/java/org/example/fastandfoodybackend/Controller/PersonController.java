package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.PersonDTO;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;
    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/my-info")
    private ResponseEntity<?> personsInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Person person = personRepository.findByUsername(auth.getName()).orElseThrow();

        return ResponseEntity.ok(personService.findById(person.getId()));
    }

    @GetMapping("/my-info/orders")
    public ResponseEntity<?> personsOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Person person = personRepository.findByUsername(auth.getName()).orElseThrow();
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
    public ResponseEntity<?> personsActiveOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Person person = personRepository.findByUsername(auth.getName()).orElseThrow();
        if  (personService.usersActivePurchases(person.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no active orders"));
        }

        return ResponseEntity.ok(personService.usersActivePurchases(person.getId()));
    }

    @GetMapping("/my-info/finished-orders")
    public ResponseEntity<?> personsFinishedOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Person person = personRepository.findByUsername(auth.getName()).orElseThrow();
        if  (personService.usersFinishedPurchases(person.getId()).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no finished orders"));
        }

        return ResponseEntity.ok(personService.usersFinishedPurchases(person.getId()));
    }

    @PostMapping("/my-info/edit")
    public ResponseEntity<?> updatePerson(@RequestBody PersonDTO person) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Person authPerson = personRepository.findByUsername(auth.getName()).orElseThrow();
        List<Person> peopleBySurname = personService.peopleBySurname(person.getSurname());
        List<Person> peopleByUsername = personService.peopleByUsername(person.getUsername());
        List<Person> peopleByEmail = personService.peopleByEmail(person.getEmail());
        List<Person> peopleByPhone = personService.peopleByPhone(person.getPhone());

        //person with the same name and surname has the same username
        if (!peopleBySurname.isEmpty()) {
            for (Person p : peopleBySurname) {
                if (p.getName().equals(person.getName()) && p.getId() != authPerson.getId()) {
                    if (p.getUsername().equals(person.getUsername())) {
                        return ResponseEntity.badRequest().body(Collections.singletonMap("username", "Person with such username already exists"));
                    }
                }
            }
        }

        // person with the same username
        if (!peopleByUsername.isEmpty()) {
            for (Person p : peopleByUsername) {
                if (p.getUsername().equals(person.getUsername()) && p.getId() != authPerson.getId()) {
                    if (p.getPersonPassword().equals(person.getPersonPassword())) {
                        return ResponseEntity.badRequest().body(Collections.singletonMap("password", "Password is not enough strong"));
                    }
                }
            }
        }

        // person with the same email
        if (!peopleByEmail.isEmpty()) {
            for (Person p : peopleByEmail) {
                if (p.getEmail().equals(person.getEmail()) && p.getId() != authPerson.getId()) {
                    return ResponseEntity.badRequest().body(Collections.singletonMap("email", "Email is already exists"));
                }
            }
        }

        // person with the same phone
        if (!peopleByPhone.isEmpty()) {
            for (Person p : peopleByPhone) {
                if (p.getPhone().equals(person.getPhone()) && p.getId() != authPerson.getId()) {
                    return ResponseEntity.badRequest().body(Collections.singletonMap("phone", "Phone is already exists"));
                }
            }
        }

        return ResponseEntity.ok(personService.updatePerson(person, authPerson.getId()));
    }
}
