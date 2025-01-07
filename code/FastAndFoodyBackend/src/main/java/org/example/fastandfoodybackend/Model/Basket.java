package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;

import java.util.List;

@Entity
@Table(name = "basket")
public class Basket {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Transient
    @OneToMany(mappedBy = "basket")
    private List<OrderItem> orderItems;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person person;

    public Basket() {
    }

    public Basket(int id, List<OrderItem> orderItems, Person person) {
        this.id = id;
        this.orderItems = orderItems;
        this.person = person;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Person getPerson() {
        return person;
    }

    public void setPersons(Person person) {
        this.person = person;
    }
}
