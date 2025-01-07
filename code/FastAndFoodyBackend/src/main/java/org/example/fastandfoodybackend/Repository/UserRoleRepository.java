package org.example.fastandfoodybackend.Repository;

import org.example.fastandfoodybackend.Model.AdditionalEntities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRoleRepository  extends JpaRepository<UserRole, Integer> {
}
