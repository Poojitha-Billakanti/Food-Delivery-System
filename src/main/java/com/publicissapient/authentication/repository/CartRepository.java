package com.publicissapient.authentication.repository;

import com.publicissapient.authentication.entity.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUserIdAndFoodItemId(String userId, String foodItemId);
    List<Cart> findByUserId(String userId);
}