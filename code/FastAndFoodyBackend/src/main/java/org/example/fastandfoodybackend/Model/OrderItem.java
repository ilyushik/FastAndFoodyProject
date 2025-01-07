package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;

@Entity
@Table(name = "order_item")
public class OrderItem {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "amount")
    private int amount;

    @Column(name = "total")
    private int total;

    @ManyToOne()
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item itemId;

    @ManyToOne
    @JoinColumn(name = "basket", referencedColumnName = "id")
    private Basket basket;

    @ManyToOne
    @JoinColumn(name = "purchase" , referencedColumnName = "id")
    private Purchase purchase;

    public OrderItem() {
    }

    public OrderItem(int id, int amount, int total, Item itemId, Basket basket, Purchase purchase) {
        this.id = id;
        this.amount = amount;
        this.total = total;
        this.itemId = itemId;
        this.basket = basket;
        this.purchase = purchase;
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

    public Item getItemId() {
        return itemId;
    }

    public void setItemId(Item itemId) {
        this.itemId = itemId;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    public Purchase getPurchase() {
        return purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }
}
