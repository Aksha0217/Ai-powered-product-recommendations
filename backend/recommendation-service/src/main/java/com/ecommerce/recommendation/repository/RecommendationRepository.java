package com.ecommerce.recommendation.repository;

import com.ecommerce.recommendation.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Long> {

    List<Recommendation> findByUserIdOrderByScoreDesc(Long userId);

    List<Recommendation> findByUserIdAndAlgorithmOrderByScoreDesc(Long userId, String algorithm);

    @Query("SELECT r FROM Recommendation r WHERE r.userId = :userId AND r.expiresAt > :now ORDER BY r.score DESC")
    List<Recommendation> findActiveRecommendations(@Param("userId") Long userId, @Param("now") LocalDateTime now);

    @Query("SELECT r FROM Recommendation r WHERE r.userId = :userId AND r.createdAt >= :since ORDER BY r.score DESC")
    List<Recommendation> findRecentRecommendations(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    void deleteByUserIdAndExpiresAtBefore(Long userId, LocalDateTime before);

    @Query("SELECT COUNT(r) FROM Recommendation r WHERE r.algorithm = :algorithm")
    Long countByAlgorithm(@Param("algorithm") String algorithm);

    @Query("SELECT AVG(r.score) FROM Recommendation r WHERE r.algorithm = :algorithm")
    Double findAverageScoreByAlgorithm(@Param("algorithm") String algorithm);

    // Additional methods for hybrid recommendations
    List<Recommendation> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT r FROM Recommendation r WHERE r.productId = :productId ORDER BY r.createdAt DESC LIMIT 1")
    Optional<Recommendation> findTopByProductIdOrderByCreatedAtDesc(@Param("productId") Long productId);

    @Query("SELECT COUNT(r) FROM Recommendation r WHERE r.productId = :productId")
    Long countByProductId(@Param("productId") Long productId);
}
