package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository  extends JpaRepository<Item, Integer> {
}
