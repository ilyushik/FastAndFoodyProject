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
public class Person implements UserDetails {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    @Size(min = 2, max = 50, message = "Name should be between 2 and 50")
    private String name;

    @Column(name = "surname")
    @Size(min = 2, max = 50, message = "Surname should be between 2 and 50")
    private String surname;

    @Column(name = "phone")
    private String phone;

    @Email
    @Column(name = "email")
    @Size(min = 2, max = 100, message = "Email should be between 2 and 100")
    private String email;

    @Column(name = "username")
    @Size(min = 2, max = 50, message = "Username should be between 2 and 50")
    private String username;

    @Column(name = "person_password")
    @Size(min = 8, max = 50, message = "Password should not be less than 8")
    private String personPassword;

    @ManyToOne
    @JoinColumn(name = "person_role", referencedColumnName = "id")
    private UserRole role;

    @Column(name = "image")
    private String image;

    @Transient
    @OneToMany(mappedBy = "person")
    private List<Basket> baskets;

    @OneToOne(mappedBy = "adminId")
    private Restaurant restaurant;

    @OneToMany(mappedBy = "personId")
    private List<Purchase> purchases;

    public Person() {
    }

    public Person(int id, String name, String surname, String email, String username, String personPassword, UserRole role, String image, List<Basket> baskets,
                  Restaurant restaurant, List<Purchase> purchases, String phone) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.personPassword = personPassword;
        this.role = role;
        this.image = image;
        this.baskets = baskets;
        this.restaurant = restaurant;
        this.purchases = purchases;
        this.phone = phone;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPersonPassword() {
        return personPassword;
    }

    public void setPersonPassword(String personPassword) {
        this.personPassword = personPassword;
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

    public List<Basket> getBaskets() {
        return baskets;
    }

    public void setBasket(List<Basket> baskets) {
        this.baskets = baskets;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getRole()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getPassword() {
        return personPassword;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
