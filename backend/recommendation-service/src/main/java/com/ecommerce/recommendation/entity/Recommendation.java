package com.ecommerce.recommendation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "score", precision = 3, scale = 2)
    private BigDecimal score; // Recommendation score 0.00-1.00

    @Column(name = "algorithm", nullable = false)
    private String algorithm; // COLLABORATIVE_FILTERING, CONTENT_BASED, HYBRID

    @Column(name = "rank_position")
    private Integer rankPosition; // Position in recommendation list

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt; // When recommendation expires

    @Column(name = "context")
    private String context; // Additional context (e.g., "similar_users", "viewed_products")
}
