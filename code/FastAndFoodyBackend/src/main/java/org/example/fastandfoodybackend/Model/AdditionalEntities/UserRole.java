package org.example.fastandfoodybackend.Model.AdditionalEntities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.fastandfoodybackend.Model.Person;

import java.util.List;

@Entity
@Table(name = "user_role")
public class UserRole {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "role")
    private String role;

    @JsonIgnore
    @OneToMany(mappedBy = "role")
    private List<Person> persons;

    public UserRole() {
    }

    public UserRole(int id, String role, List<Person> persons) {
        this.id = id;
        this.role = role;
        this.persons = persons;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }
}
