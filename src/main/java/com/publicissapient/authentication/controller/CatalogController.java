package com.publicissapient.authentication.controller;
import com.publicissapient.authentication.entity.Catalog;
import com.publicissapient.authentication.service.CatalogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/catalog")
public class CatalogController {
//    @Autowired
    private final CatalogService catalogService;

    public CatalogController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<Catalog>> getAllFoodItems() {
        return ResponseEntity.ok(catalogService.getAllFoodItems());
    }
    @PostMapping("/items")
    public ResponseEntity<Catalog> addFoodItem(@RequestBody Catalog newFoodItem) {
        Catalog addedFoodItem = catalogService.addFoodItem(newFoodItem);
        return ResponseEntity.ok(addedFoodItem);
    }

    @GetMapping("/items/{itemId}")
    public ResponseEntity<Catalog> getFoodItemById(@PathVariable String itemId) {
        Catalog foodItem = catalogService.getFoodItemById(itemId);
        return ResponseEntity.ok(foodItem);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<Catalog> updateFoodItem(@PathVariable String itemId, @RequestBody Catalog updatedFoodItem) {
        Catalog foodItem = catalogService.updateFoodItem(itemId, updatedFoodItem);
        return ResponseEntity.ok(foodItem);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable String itemId) {
        catalogService.deleteFoodItem(itemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/items/search")
    public ResponseEntity<List<Catalog>> searchFoodItems(@RequestParam String foodName) {
        return ResponseEntity.ok(catalogService.searchFoodItems(foodName));
    }

    @GetMapping("/items/searchByRestaurant")
    public ResponseEntity<List<Catalog>> searchByRestaurantName(@RequestParam String restaurantName) {
        return ResponseEntity.ok(catalogService.searchByRestaurantName(restaurantName));
    }

    @GetMapping("/items/searchByLocation")
    public ResponseEntity<List<Catalog>> searchByLocation(@RequestParam String location) {
        return ResponseEntity.ok(catalogService.searchByLocation(location));
    }
}
