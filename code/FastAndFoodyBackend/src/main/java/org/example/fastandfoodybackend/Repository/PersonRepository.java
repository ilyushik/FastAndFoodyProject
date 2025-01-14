package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository  extends JpaRepository<Person, Integer> {

    public List<Person> findPersonBySurname(String surname);

    public List<Person> findPersonByUsername(String username);

    public List<Person> findPersonByEmail(String email);

    public List<Person> findPersonByPhone(String phone);
}