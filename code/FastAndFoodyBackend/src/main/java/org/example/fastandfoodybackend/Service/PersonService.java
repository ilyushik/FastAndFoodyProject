package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public List<Person> people() {
        return personRepository.findAll();
    }

    public Person findById(int id) {
        return personRepository.findById(id).orElse(null);
    }
}
