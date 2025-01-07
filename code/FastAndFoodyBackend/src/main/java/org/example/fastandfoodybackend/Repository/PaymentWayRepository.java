package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.PaymentWay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentWayRepository  extends JpaRepository<PaymentWay, Integer> {
}
