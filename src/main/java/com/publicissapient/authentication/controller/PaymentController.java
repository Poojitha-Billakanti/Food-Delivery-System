package com.publicissapient.authentication.controller;

import com.publicissapient.authentication.entity.Payment;
import com.publicissapient.authentication.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
//    @Autowired
    private final PaymentService paymentService;
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/processPayment")
    public ResponseEntity<Payment> processPayment(@RequestBody Payment payment) {
        Payment processedPayment = paymentService.processPayment(payment.getOrderId(), payment.getAmount());
        return ResponseEntity.status(HttpStatus.CREATED).body(processedPayment);
    }
}
