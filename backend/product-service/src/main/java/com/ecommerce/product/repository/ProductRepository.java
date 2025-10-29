package com.ecommerce.product.repository;

import com.ecommerce.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by category
    List<Product> findByCategory(String category);

    // Find products by name containing (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products by price range
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

    // Find products by tags containing
    @Query("SELECT p FROM Product p WHERE :tag MEMBER OF p.tags")
    List<Product> findByTag(@Param("tag") String tag);

    // Find products by category and price range
    List<Product> findByCategoryAndPriceBetween(String category, BigDecimal minPrice, BigDecimal maxPrice);

    // Find top products by category (for recommendations)
    @Query("SELECT p FROM Product p WHERE p.category = :category ORDER BY p.createdAt DESC")
    List<Product> findTopByCategoryOrderByCreatedAtDesc(@Param("category") String category);

    // Search products by name or description
    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Product> searchByNameOrDescription(@Param("query") String query);

    // Count products by category
    long countByCategory(String category);

    // Check if product exists by name
    boolean existsByName(String name);
}
