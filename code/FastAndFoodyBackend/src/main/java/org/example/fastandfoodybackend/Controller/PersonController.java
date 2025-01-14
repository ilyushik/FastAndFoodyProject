package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.DTO.PersonDTO;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping("/my-info")
    private ResponseEntity<?> personsInfo() {
        int id = 1;

        return ResponseEntity.ok(personService.findById(id));
    }

    @GetMapping("/my-info/orders")
    public ResponseEntity<?> personsOrders() {
        int id = 1;
        if (personService.usersPurchases(id).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no orders"));
        }

        return ResponseEntity.ok(personService.usersPurchases(id));
    }

    @GetMapping("/my-info/active-orders")
    public ResponseEntity<?> personsActiveOrders() {
        int id = 1;
        if  (personService.usersActivePurchases(id).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no active orders"));
        }

        return ResponseEntity.ok(personService.usersActivePurchases(id));
    }

    @GetMapping("/my-info/finished-orders")
    public ResponseEntity<?> personsFinishedOrders() {
        int id = 1;
        if  (personService.usersFinishedPurchases(id).isEmpty()) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "You have no finished orders"));
        }

        return ResponseEntity.ok(personService.usersFinishedPurchases(id));
    }

    @PostMapping("/my-info/edit")
    public ResponseEntity<?> updatePerson(@RequestBody PersonDTO person) {
        int id = 1;
        List<Person> peopleBySurname = personService.peopleBySurname(person.getSurname());
        List<Person> peopleByUsername = personService.peopleByUsername(person.getUsername());
        List<Person> peopleByEmail = personService.peopleByEmail(person.getEmail());
        List<Person> peopleByPhone = personService.peopleByPhone(person.getPhone());

        //person with the same name and surname has the same username
        if (!peopleBySurname.isEmpty()) {
            for (Person p : peopleBySurname) {
                if (p.getName().equals(person.getName()) && p.getId() != id) {
                    if (p.getUsername().equals(person.getUsername())) {
                        return ResponseEntity.badRequest().body(Collections.singletonMap("username", "Person with such username already exists"));
                    }
                }
            }
        }

        // person with the same username
        if (!peopleByUsername.isEmpty()) {
            for (Person p : peopleByUsername) {
                if (p.getUsername().equals(person.getUsername()) && p.getId() != id) {
                    if (p.getPersonPassword().equals(person.getPersonPassword())) {
                        return ResponseEntity.badRequest().body(Collections.singletonMap("password", "Password is not enough strong"));
                    }
                }
            }
        }

        // person with the same email
        if (!peopleByEmail.isEmpty()) {
            for (Person p : peopleByEmail) {
                if (p.getEmail().equals(person.getEmail()) && p.getId() != id) {
                    return ResponseEntity.badRequest().body(Collections.singletonMap("email", "Email is already exists"));
                }
            }
        }

        // person with the same phone
        if (!peopleByPhone.isEmpty()) {
            for (Person p : peopleByPhone) {
                if (p.getPhone().equals(person.getPhone()) && p.getId() != id) {
                    return ResponseEntity.badRequest().body(Collections.singletonMap("phone", "Phone is already exists"));
                }
            }
        }

        return ResponseEntity.ok(personService.updatePerson(person, id));
    }
}
