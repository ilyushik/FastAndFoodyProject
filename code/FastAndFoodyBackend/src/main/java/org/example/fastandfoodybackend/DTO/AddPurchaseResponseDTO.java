package org.example.fastandfoodybackend.DTO;

public class AddPurchaseResponseDTO {
    private String message;

    private Integer purchaseId;

    public AddPurchaseResponseDTO() {
    }

    public AddPurchaseResponseDTO(String message, Integer purchaseId) {
        this.message = message;
        this.purchaseId = purchaseId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(Integer purchaseId) {
        this.purchaseId = purchaseId;
    }
}
