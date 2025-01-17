package org.example.fastandfoodybackend.DTO;

import jakarta.validation.Valid;

public class OrderItemDTO {

    @Valid

    private int id;

    private int amount;

    private int total;

    private int itemId;

    public OrderItemDTO() {
    }

    public OrderItemDTO(int id, int amount, int total, int itemId) {
        this.id = id;
        this.amount = amount;
        this.total = total;
        this.itemId = itemId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }
}
