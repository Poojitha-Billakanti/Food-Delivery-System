package com.publicissapient.authentication.controller;
import com.publicissapient.authentication.entity.Order;
import com.publicissapient.authentication.entity.Payment;
import com.publicissapient.authentication.service.OrderService;
import com.publicissapient.authentication.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/api/order")
public class OrderController {
//    @Autowired
    private final OrderService orderService;

//    @Autowired
    private final PaymentService paymentService;

    public OrderController(OrderService orderService, PaymentService paymentService) {
        this.orderService = orderService;
        this.paymentService = paymentService;
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<Order> placeOrder(@RequestBody String userId) {
        Order order = orderService.placeOrder(userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    @PostMapping("/{orderId}/processPayment")
    public ResponseEntity<Order> processPayment(@PathVariable String orderId, @RequestBody double amount) {
        Payment processedPayment = paymentService.processPayment(orderId, amount);
        Order updatedOrder = orderService.updateOrderStatus(orderId, "PAID");

        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId,
                                                   @RequestParam String newStatus) {
        Order updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(updatedOrder);
    }

    @DeleteMapping("/order/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable("orderId") String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}
