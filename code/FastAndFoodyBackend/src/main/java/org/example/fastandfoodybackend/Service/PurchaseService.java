package org.example.fastandfoodybackend.Service;

import org.example.fastandfoodybackend.DTO.AddPurchaseResponseDTO;
import org.example.fastandfoodybackend.DTO.OrderItemDTO;
import org.example.fastandfoodybackend.DTO.PurchaseDTO;
import org.example.fastandfoodybackend.DTO.PurchaseRequestDTO;
import org.example.fastandfoodybackend.Model.Person;
import org.example.fastandfoodybackend.Model.Purchase;
import org.example.fastandfoodybackend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;
    @Autowired
    private DeliveryWayRepository deliveryWayRepository;
    @Autowired
    private PaymentWayRepository paymentWayRepository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private RestaurantRepository restaurantRepository;
    @Autowired
    private OrderItemService orderItemService;
    @Autowired
    private StatusRepository statusRepository;

    public AddPurchaseResponseDTO createPurchase(PurchaseRequestDTO purchaseDTO) {
        AddPurchaseResponseDTO addPurchaseResponseDTO = new AddPurchaseResponseDTO();

        Purchase purchase = new Purchase();
        if (purchaseDTO.getAddress() == null) {
            purchase.setAddress(null);
        } else {
            purchase.setAddress(purchaseDTO.getAddress());
        }
        purchase.setDeliveryWay(deliveryWayRepository.findByWay(purchaseDTO.getDeliveryWay()));
        purchase.setPaymentWay(paymentWayRepository.findByWay(purchaseDTO.getPaymentWay()));
        if (purchaseDTO.getPersonId() != null) {
            purchase.setPersonId(personRepository.findById(purchaseDTO.getPersonId()).orElse(null));
        } else {
            purchase.setPersonId(null);
        }
        purchase.setEmail(purchaseDTO.getEmail());
        purchase.setRestaurantId(restaurantRepository.findById(purchaseDTO.getRestaurantId()).orElse(null));
        purchase.setSum(purchaseDTO.getTotal());
        purchase.setDate(LocalDateTime.now());
        purchase.setStatus(statusRepository.findByStatus("In progress"));

        Purchase newPurchase = purchaseRepository.save(purchase);

        for (OrderItemDTO orderItemDTO : purchaseDTO.getItems()) {
            orderItemService.save(orderItemDTO, purchase);
        }

        addPurchaseResponseDTO.setMessage("Successfully created a new purchase");

        if (purchaseDTO.getEmail() != null) {
            Person personByEmail = personRepository.findByEmail(purchaseDTO.getEmail());
            if (personByEmail != null) {
                addPurchaseResponseDTO.setPurchaseId(newPurchase.getId());
                return addPurchaseResponseDTO;
            }
        }

        addPurchaseResponseDTO.setPurchaseId(null);

        return addPurchaseResponseDTO;
    }

    public String setPersonToPurchase(int purchaseId) {
        Purchase purchase = purchaseRepository.findById(purchaseId).orElse(null);
        assert purchase != null;
        purchase.setPersonId(personRepository.findByEmail(purchase.getEmail()));
        purchaseRepository.save(purchase);
        return "success";
    }
}
