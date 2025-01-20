package org.example.fastandfoodybackend.DTO;

import java.util.List;

public class PurchaseRequestDTO {

    private int restaurantId;

    private String wish;

    private String paymentWay;

    private String deliveryWay;

    private Integer personId;

    private List<OrderItemDTO> items;

    private String address;

    private String email;

    private int total;

    public PurchaseRequestDTO() {
    }

    public PurchaseRequestDTO(int restaurantId, String wish, String paymentWay, String deliveryWay, Integer personId,
                              List<OrderItemDTO> items, String address, int total) {
        this.restaurantId = restaurantId;
        this.wish = wish;
        this.paymentWay = paymentWay;
        this.deliveryWay = deliveryWay;
        this.personId = personId;
        this.items = items;
        this.address = address;
        this.total = total;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getWish() {
        return wish;
    }

    public void setWish(String wish) {
        this.wish = wish;
    }

    public String getPaymentWay() {
        return paymentWay;
    }

    public void setPaymentWay(String paymentWay) {
        this.paymentWay = paymentWay;
    }

    public String getDeliveryWay() {
        return deliveryWay;
    }

    public void setDeliveryWay(String deliveryWay) {
        this.deliveryWay = deliveryWay;
    }

    public Integer getPersonId() {
        return personId;
    }

    public void setPersonId(Integer personId) {
        this.personId = personId;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
