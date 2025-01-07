package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.PromoCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromoCodeRepository  extends JpaRepository<PromoCode, Integer> {
}
