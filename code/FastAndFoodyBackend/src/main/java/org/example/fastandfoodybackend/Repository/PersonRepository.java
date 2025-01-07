package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository  extends JpaRepository<Person, Integer> {
}
