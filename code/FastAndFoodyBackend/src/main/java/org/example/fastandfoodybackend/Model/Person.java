package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import org.example.fastandfoodybackend.Model.AdditionalEntities.UserRole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "person")
public class Person {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    @Size(min = 2, max = 50, message = "Name should be between 2 and 50")
    private String name;

    @Email
    @Column(name = "email")
    @Size(min = 2, max = 100, message = "Email should be between 2 and 100")
    private String email;

    @ManyToOne
    @JoinColumn(name = "person_role", referencedColumnName = "id")
    private UserRole role;

    @Column(name = "image")
    private String image;

    @OneToOne(mappedBy = "adminId")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "personId")
    private List<Purchase> purchases;

    public Person() {
    }

    public Person(int id, String name, String email, UserRole role, String image,
                  Restaurant restaurant, List<Purchase> purchases) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.image = image;
        this.restaurant = restaurant;
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }


}
