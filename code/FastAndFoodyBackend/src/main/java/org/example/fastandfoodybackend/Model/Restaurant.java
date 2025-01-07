package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;

import java.util.List;

@Entity
@Table(name = "restaurant")
public class Restaurant {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne
    @JoinColumn(name="admin_id", referencedColumnName = "id")
    private Person adminId;

    @Column(name = "address")
    private String address;

    @Column(name = "longitude")
    private double longitude;

    @Column(name = "latitude")
    private double latitude;

    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id")
    private City cityId;

    @Column(name = "phone")
    private String phone;

    @Email
    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "restaurantId")
    private List<Purchase> purchases;

    public Restaurant() {
    }

    public Restaurant(int id, Person adminId, String address, double longitude, double latitude, City cityId, String phone, String email, List<Purchase> purchases) {
        this.id = id;
        this.adminId = adminId;
        this.address = address;
        this.longitude = longitude;
        this.latitude = latitude;
        this.cityId = cityId;
        this.phone = phone;
        this.email = email;
        this.purchases = purchases;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Person getAdminId() {
        return adminId;
    }

    public void setAdminId(Person adminId) {
        this.adminId = adminId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public City getCityId() {
        return cityId;
    }

    public void setCityId(City cityId) {
        this.cityId = cityId;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Purchase> getPurchases() {
        return purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }
}
