package org.example.fastandfoodybackend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;

public class PersonDTO {
    @Valid

    private int id;

    @Size(min = 2, max = 50, message = "Name should be between 2 and 50")
    private String name;

    @Size(min = 2, max = 50, message = "Surname should be between 2 and 50")
    private String surname;

    @Size(min = 2, max = 100, message = "Phone should be between 2 and 20")
    private String phone;

    @Size(min = 2, max = 100, message = "Email should be between 2 and 100")
    private String email;

    @Size(min = 2, max = 50, message = "Username should be between 2 and 50")
    private String username;

    @Size(min = 8, max = 50, message = "Password should not be less than 8")
    private String personPassword;

    private String role;

    private String image;

    public PersonDTO() {}

    public PersonDTO(int id, String name, String surname, String email, String username, String personPassword, String role, String image, String phone) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.username = username;
        this.personPassword = personPassword;
        this.role = role;
        this.image = image;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
