package org.example.fastandfoodybackend.Model.AdditionalEntities;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.example.fastandfoodybackend.Model.Purchase;

import java.util.List;

@Entity
@Table(name = "promo_code")
public class PromoCode {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "promoCode")
    private List<Purchase> purchases;

    public PromoCode() {
    }

    public PromoCode(int id, String code, List<Purchase> purchases) {
        this.id = id;
        this.code = code;
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }
}
