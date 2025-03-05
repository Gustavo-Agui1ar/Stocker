package com.manager.Stocker.Repository;

import com.manager.Stocker.Model.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Integer> {

    @Query("SELECT COUNT(p) FROM Product AS p")
    long countLines();

    Optional<Product> findByNameAndCategory(String name, String category);

    @Query("SELECT p.name, p.category  FROM Product AS p")
    List<Object> findAllNames();
}
