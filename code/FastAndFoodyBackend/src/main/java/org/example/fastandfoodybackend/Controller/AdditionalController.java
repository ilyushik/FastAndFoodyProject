package org.example.fastandfoodybackend.Controller;

import org.example.fastandfoodybackend.Repository.CityRepository;
import org.example.fastandfoodybackend.Repository.DeliveryWayRepository;
import org.example.fastandfoodybackend.Repository.PaymentWayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/additional")
public class AdditionalController {

    @Autowired
    private DeliveryWayRepository deliveryWayRepository;
    @Autowired
    private PaymentWayRepository paymentWayRepository;
    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/delivery-way")
    public ResponseEntity<?> allDeliveryWays() {
        return ResponseEntity.ok(deliveryWayRepository.findAll());
    }

    @GetMapping("/payment-way")
    public ResponseEntity<?> allPaymentWays() {
        return ResponseEntity.ok(paymentWayRepository.findAll());
    }

    @GetMapping("/city")
    public ResponseEntity<?> allCities(@RequestParam(value = "city", required = false) String city) {
        if (city != null) {
            return ResponseEntity.ok(cityRepository.findByName(city));
        }

        return ResponseEntity.ok(cityRepository.findAll());
    }
}
