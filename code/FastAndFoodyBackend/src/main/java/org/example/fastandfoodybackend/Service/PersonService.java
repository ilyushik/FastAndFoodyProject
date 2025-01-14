package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.PersonDTO;
import org.example.fastandfoodybackend.DTO.PurchaseDTO;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Model.Purchase;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.example.fastandfoodybackend.Repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private PurchaseRepository purchaseRepository;

    //converter purchase to purchaseDTO
    List<PurchaseDTO> purchaseToDTO(List<Purchase> purchases) {
        return purchases.stream().map(p -> {
            PurchaseDTO purchaseDTO = new PurchaseDTO(p.getId(), p.getWish(), p.getRestaurantId().getId(), p.getPaymentWay().getWay(),
                    p.getPromoCode().getCode(), p.getStatus().getStatus(), p.getDeliveryWay().getWay(), p.getPersonId().getId(), p.getAddress(),
                    p.getDate(), p.getSum());
            return purchaseDTO;
        }).toList();
    }

    //list of people
    public List<Person> people() {
        return personRepository.findAll();
    }

    // find person by id
    public PersonDTO findById(int id) {
        Person person = personRepository.findById(id).orElse(null);
        PersonDTO personDTO = new PersonDTO(person.getId(), person.getName(), person.getSurname(),
                person.getEmail(), person.getUsername(), person.getPersonPassword(), person.getRole().getRole(),
                person.getImage(), person.getPhone());

        return personDTO;
    }

    // find people by surname
    public List<Person> peopleBySurname(String surname) {
        return personRepository.findPersonBySurname(surname);
    }

    // find people by username
    public List<Person> peopleByUsername(String username) {
        return personRepository.findPersonByUsername(username);
    }

    // find people by email
    public List<Person> peopleByEmail(String email) {
        return personRepository.findPersonByEmail(email);
    }

    // find people by phone
    public List<Person> peopleByPhone(String phone) {
        return personRepository.findPersonByPhone(phone);
    }

    // purchases of user
    public List<PurchaseDTO> usersPurchases(int id) {
        Person person = personRepository.findById(id).orElse(null);
        List<Purchase> purchases = purchaseRepository.findPurchasesByPersonId(person);
        return purchaseToDTO(purchases);
    }

    // active purchases of user
    public List<PurchaseDTO> usersActivePurchases(int id) {
        Person person = personRepository.findById(id).orElse(null);
        List<Purchase> purchases = purchaseRepository.findPurchasesByPersonId(person);
        purchases = purchases.stream().filter(p -> p.getStatus().getStatus().equals("In progress") || p.getStatus().getStatus().equals("On way")).toList();

        return purchaseToDTO(purchases);
    }

    // finished purchases of user
    public List<PurchaseDTO> usersFinishedPurchases(int id) {
        Person person = personRepository.findById(id).orElse(null);
        List<Purchase> purchases = purchaseRepository.findPurchasesByPersonId(person);
        purchases = purchases.stream().filter(p -> p.getStatus().getStatus().equals("Canceled") || p.getStatus().getStatus().equals("Delivered")).toList();

        return purchaseToDTO(purchases);
    }

    // update personal info
    public PersonDTO updatePerson (PersonDTO person, int id) {
        Person personToUpdate = personRepository.findById(id).orElse(null);
        personToUpdate.setName(person.getName());
        personToUpdate.setSurname(person.getSurname());
        personToUpdate.setPhone(person.getPhone());
        personToUpdate.setEmail(person.getEmail());
        personToUpdate.setUsername(person.getUsername());
        personToUpdate.setPersonPassword(person.getPersonPassword());
        personToUpdate.setImage(person.getImage());

        personRepository.save(personToUpdate);

        return person;
    }
}
