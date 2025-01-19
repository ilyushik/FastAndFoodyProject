package org.example.fastandfoodybackend.Model.AdditionalEntities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.example.fastandfoodybackend.Model.Item;

import java.util.List;

@Entity
@Table(name = "category")
public class Category {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "category_name")
    private String categoryName;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Item> items;

    public Category() {
    }

    public Category(int id, String categoryName, List<Item> items) {
        this.id = id;
        this.categoryName = categoryName;
        this.items = items;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
