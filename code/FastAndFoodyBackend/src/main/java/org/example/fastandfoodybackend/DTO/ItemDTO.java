package org.example.fastandfoodybackend.DTO;

import jakarta.validation.Valid;

public class ItemDTO {
    @Valid

    private int id;

    private String itemName;

    private int price;

    private String description;

    private String image;

    private String category;

    public ItemDTO() {}

    public ItemDTO(int id, String itemName, int price, String description, String image, String category) {
        this.id = id;
        this.itemName = itemName;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
