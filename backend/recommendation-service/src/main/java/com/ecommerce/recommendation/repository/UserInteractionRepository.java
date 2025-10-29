package com.ecommerce.recommendation.repository;

import com.ecommerce.recommendation.entity.UserInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserInteractionRepository extends JpaRepository<UserInteraction, Long> {

    List<UserInteraction> findByUserIdOrderByTimestampDesc(Long userId);

    List<UserInteraction> findByProductIdOrderByTimestampDesc(Long productId);

    List<UserInteraction> findByUserIdAndInteractionType(Long userId, String interactionType);

    @Query("SELECT ui FROM UserInteraction ui WHERE ui.userId = :userId AND ui.timestamp >= :since")
    List<UserInteraction> findRecentInteractions(@Param("userId") Long userId, @Param("since") LocalDateTime since);

    @Query("SELECT DISTINCT ui.userId FROM UserInteraction ui WHERE ui.productId = :productId")
    List<Long> findUsersWhoInteractedWithProduct(@Param("productId") Long productId);

    @Query("SELECT DISTINCT ui.productId FROM UserInteraction ui WHERE ui.userId = :userId")
    List<Long> findProductsInteractedByUser(@Param("userId") Long userId);

    @Query("SELECT COUNT(ui) FROM UserInteraction ui WHERE ui.userId = :userId AND ui.productId = :productId")
    Long countInteractionsBetweenUserAndProduct(@Param("userId") Long userId, @Param("productId") Long productId);

    @Query("SELECT AVG(ui.rating) FROM UserInteraction ui WHERE ui.productId = :productId AND ui.rating IS NOT NULL")
    Double findAverageRatingForProduct(@Param("productId") Long productId);
}
