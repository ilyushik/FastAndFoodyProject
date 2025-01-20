package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.DeliveryWay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryWayRepository extends JpaRepository<DeliveryWay, Integer> {

    public DeliveryWay findByWay(String way);
}
