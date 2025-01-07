package org.example.fastandfoodybackend.Model;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import org.example.fastandfoodybackend.Model.AdditionalEntities.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "purchase")
public class Purchase {
    @Valid

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "wish")
    private String wish;

    @ManyToOne
    @JoinColumn(name = "restaurant_id", referencedColumnName = "id")
    private Restaurant restaurantId;

    @ManyToOne
    @JoinColumn(name = "payment_way", referencedColumnName = "id")
    private PaymentWay paymentWay;

    @ManyToOne
    @JoinColumn(name = "promo_code", referencedColumnName = "id")
    private PromoCode promoCode;

    @ManyToOne
    @JoinColumn(name = "status", referencedColumnName = "id")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "delivery_way", referencedColumnName = "id")
    private DeliveryWay deliveryWay;

    @Transient
    @OneToMany(mappedBy = "purchase")
    private List<OrderItem> orderItemId;

    @ManyToOne
    @JoinColumn(name = "person_id", referencedColumnName = "id")
    private Person personId;

    @Column(name = "address")
    private String address;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "sum")
    private int sum;

    public Purchase() {
    }

    public Purchase(int id, String wish, Restaurant restaurantId, PaymentWay paymentWay, PromoCode promoCode, Status status, DeliveryWay deliveryWay,
                    List<OrderItem> orderItemId, Person personId, String address, LocalDateTime date, int sum) {
        this.id = id;
        this.wish = wish;
        this.restaurantId = restaurantId;
        this.paymentWay = paymentWay;
        this.promoCode = promoCode;
        this.status = status;
        this.deliveryWay = deliveryWay;
        this.orderItemId = orderItemId;
        this.personId = personId;
        this.address = address;
        this.date = date;
        this.sum = sum;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWish() {
        return wish;
    }

    public void setWish(String wish) {
        this.wish = wish;
    }

    public Restaurant getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(Restaurant restaurantId) {
        this.restaurantId = restaurantId;
    }

    public PaymentWay getPaymentWay() {
        return paymentWay;
    }

    public void setPaymentWay(PaymentWay paymentWay) {
        this.paymentWay = paymentWay;
    }

    public PromoCode getPromoCode() {
        return promoCode;
    }

    public void setPromoCode(PromoCode promoCode) {
        this.promoCode = promoCode;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public DeliveryWay getDeliveryWay() {
        return deliveryWay;
    }

    public void setDeliveryWay(DeliveryWay deliveryWay) {
        this.deliveryWay = deliveryWay;
    }

    public List<OrderItem> getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(List<OrderItem> orderItemId) {
        this.orderItemId = orderItemId;
    }

    public Person getPersonId() {
        return personId;
    }

    public void setPersonId(Person personId) {
        this.personId = personId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }
}
