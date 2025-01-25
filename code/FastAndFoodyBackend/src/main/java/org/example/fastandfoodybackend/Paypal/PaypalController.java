package org.example.fastandfoodybackend.Paypal;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.example.fastandfoodybackend.DTO.PurchaseRequestDTO;
import org.example.fastandfoodybackend.Service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/paypal")
public class PaypalController {

    @Autowired
    private PaypalService paypalService;
    @Autowired
    private PurchaseService purchaseService;

    @GetMapping("/createPayment/{total}")
    public ResponseEntity<?> createPayment(@PathVariable int total) {
        try {
            String cancelUrl = "http://localhost:3000/order-form";
            String successUrl = "http://localhost:3000/paypal/success";
            Payment payment = paypalService.createPayment(Double.valueOf(total), "EUR", "Paypal",
                    "sale", "Order in Fast&Foody", cancelUrl, successUrl);

            for (Links link : payment.getLinks()) {
                if (link.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(Collections.singletonMap("approval_url", link.getHref()));
                }
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(Collections.singletonMap("error", "Something went wrong"));
    }

    @PostMapping("/success")
    public ResponseEntity<?> success(@RequestParam("paymentId") String paymentId,
                                     @RequestParam("PayerID") String payerId,
                                     @RequestBody PurchaseRequestDTO purchaseRequestDTO) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);

            if (payment.getState().equals("approved")) {
                return ResponseEntity.ok(purchaseService.createPurchase(purchaseRequestDTO));
            }
        } catch (PayPalRESTException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(Collections.singletonMap("error", "Something went wrong"));
    }
}
