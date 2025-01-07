package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository  extends JpaRepository<Category, Integer> {
}
