package com.publicissapient.authentication.controller;

import com.publicissapient.authentication.config.JavaConstant;
import com.publicissapient.authentication.config.ResourceBO;
import com.publicissapient.authentication.entity.Cart;
import com.publicissapient.authentication.service.CartService;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController {
//    @Autowired
    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<Cart> getCartByUserId(@PathVariable String userId) {
        return cartService.getCartByUserId(userId);

    }

    @DeleteMapping("/{userId}/remove/{cartItemId}")
    public String removeFromCart(@PathVariable String userId, @PathVariable String cartItemId) {
        try {
            cartService.removeItemFromCart(userId, cartItemId);
            return ResourceBO.getKey(JavaConstant.REMOVE_CART);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @PostMapping("/add/{userId}")
    public String addToCart(@PathVariable String userId, @RequestBody Cart cartItem) {
        try {
            cartService.addItemToCart(userId, cartItem);
            return ResourceBO.getKey(JavaConstant.ADD_CART);
        } catch (Exception e) {
            return e.getMessage();
        }
    }
}