package org.example.fastandfoodybackend.DTO;

import java.time.LocalDateTime;

public class PurchaseDTO {
    private int id;

    private String wish;

    private int restaurantId;

    private String paymentMethod;

    private String promoCode;

    private String status;

    private String deliveryWay;

    private int personId;

    private String address;

    private LocalDateTime date;

    private int sum;

    public PurchaseDTO() {}

    public PurchaseDTO(int id, String wish, int restaurantId, String paymentMethod, String promoCode, String status,
                       String deliveryWay, int personId, String address, LocalDateTime date, int sum) {
        this.id = id;
        this.wish = wish;
        this.restaurantId = restaurantId;
        this.paymentMethod = paymentMethod;
        this.promoCode = promoCode;
        this.status = status;
        this.deliveryWay = deliveryWay;
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

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPromoCode() {
        return promoCode;
    }

    public void setPromoCode(String promoCode) {
        this.promoCode = promoCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliveryWay() {
        return deliveryWay;
    }

    public void setDeliveryWay(String deliveryWay) {
        this.deliveryWay = deliveryWay;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
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
