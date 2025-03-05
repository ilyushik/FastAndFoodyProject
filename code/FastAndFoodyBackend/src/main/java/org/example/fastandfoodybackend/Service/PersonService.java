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
                    p.getPromoCode() != null ? p.getPromoCode().getCode() : null, p.getStatus().getStatus(), p.getDeliveryWay().getWay(), p.getPersonId().getId(), p.getAddress(),
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
        PersonDTO personDTO = new PersonDTO(person.getId(), person.getName(), person.getEmail(),
                person.getRole().getRole(), person.getImage());

        return personDTO;
    }

    // find people by email
    public List<Person> peopleByEmail(String email) {
        return personRepository.findPeopleByEmail(email);
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

    public PurchaseDTO findPurchaseById(int id) {
        Purchase purchase = purchaseRepository.findById(id).orElse(null);
        PurchaseDTO purchaseDTO = new PurchaseDTO(purchase.getId(), purchase.getWish(), purchase.getRestaurantId().getId(),
                purchase.getPaymentWay().getWay(), purchase.getPromoCode() != null ? purchase.getPromoCode().getCode() : null,
                purchase.getStatus().getStatus(), purchase.getDeliveryWay().getWay(), purchase.getPersonId() !=null ? purchase.getPersonId().getId() : null,
                purchase.getAddress(), purchase.getDate(), purchase.getSum());

        return purchaseDTO;
    }


    public PersonDTO findPersonByEmailChange(String email, String name, String image) {
        Person person = personRepository.findByEmail(email);
        if (!person.getName().equals(name)) {
            person.setName(name);
            personRepository.save(person);
        }
        if (!person.getImage().equals(image)) {
            person.setImage(image);
            personRepository.save(person);
        }
        PersonDTO personDTO = new PersonDTO(person.getId(), person.getName(), person.getEmail(),
                person.getRole().getRole(), person.getImage());

        return personDTO;
    }

    public Person findPersonByEmail(String email) {
        Person person = personRepository.findByEmail(email);

        return person;
    }
}
