package org.example.fastandfoodybackend.Model.AdditionalEntities;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.example.fastandfoodybackend.Model.Purchase;

import java.util.List;

@Entity
@Table(name = "status")
public class Status {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "status_name")
    private String status;

    @OneToMany(mappedBy = "status")
    private List<Purchase> purchases;

    public Status() {
    }

    public Status(int id, String status, List<Purchase> purchases) {
        this.id = id;
        this.status = status;
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }
}
