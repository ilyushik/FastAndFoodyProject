package org.example.fastandfoodybackend.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;

public class PersonDTO {
    @Valid

    private int id;

    @Size(min = 2, max = 50, message = "Name should be between 2 and 50")
    private String name;

    @Size(min = 2, max = 100, message = "Email should be between 2 and 100")
    private String email;

    private String role;

    private String image;

    public PersonDTO() {}

    public PersonDTO(int id, String name, String email, String role, String image) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.image = image;
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
}
