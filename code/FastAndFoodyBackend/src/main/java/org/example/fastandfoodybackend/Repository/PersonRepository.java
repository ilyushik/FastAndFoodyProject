package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository  extends JpaRepository<Person, Integer> {

    public List<Person> findPeopleByEmail(String email);

    public Person findByEmail(String email);

    public Optional<Person> findPersonByEmail(String email);
}
