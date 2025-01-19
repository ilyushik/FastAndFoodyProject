package org.example.fastandfoodybackend.Model.AdditionalEntities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.example.fastandfoodybackend.Model.Purchase;

import java.util.List;

@Entity
@Table(name = "payment_way")
public class PaymentWay {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "way")
    private String way;

    @JsonIgnore
    @OneToMany(mappedBy = "paymentWay")
    private List<Purchase> purchases;

    public PaymentWay() {
    }

    public PaymentWay(int id, String way, List<Purchase> purchases) {
        this.id = id;
        this.way = way;
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWay() {
        return way;
    }

    public void setWay(String way) {
        this.way = way;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }
}
