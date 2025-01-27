package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository  extends JpaRepository<Person, Integer> {

    public List<Person> findPersonBySurname(String surname);

    public List<Person> findPersonByUsername(String username);

    public List<Person> findPersonByEmail(String email);

    public List<Person> findPersonByPhone(String phone);

    public Person findByEmail(String email);

    public Optional<Person> findByUsername(String username);
}
