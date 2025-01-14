package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Model.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Integer> {
    public List<Purchase> findPurchasesByPersonId(Person person);
}
