package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository  extends JpaRepository<Status, Integer> {
    public Status findByStatus(String status);
}
