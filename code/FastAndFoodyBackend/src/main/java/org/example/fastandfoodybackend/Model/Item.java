package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Size;
import org.example.fastandfoodybackend.Model.AdditionalEntities.Category;

import java.util.List;

@Entity
@Table(name = "item")
public class Item {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "itemName")
    @Size(min = 1, max = 50, message = "Item's name  should be between 1 and 1000")
    private String itemName;

    @Column(name = "price")
    private int price;

    @Column(name = "description")
    @Size(min = 1, max = 1000, message = "Description should be between 1 and 1000")
    private String description;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "category", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "itemId")
    private List<OrderItem> orderItems;

    public Item() {
    }

    public Item(int id, String itemName, int price, String description, String image, Category category, List<OrderItem> orderItems) {
        this.id = id;
        this.itemName = itemName;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
        this.orderItems = orderItems;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
