package com.publicissapient.authentication.repository;

import com.publicissapient.authentication.entity.Catalog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CatalogRepository extends MongoRepository<Catalog, String> {
        List<Catalog> findByFoodName(String name);
        List<Catalog> findByRestaurantName(String restaurantName);
        List<Catalog> findByLocation(String location);

}
