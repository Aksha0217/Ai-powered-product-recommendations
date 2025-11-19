package com.ecommerce.recommendation.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "recommendations")
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

    // Default constructor
    public Recommendation() {}

    // All-args constructor
    public Recommendation(Long id, Long userId, Long productId, BigDecimal score, String algorithm, Integer rankPosition, LocalDateTime createdAt, LocalDateTime expiresAt, String context) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.score = score;
        this.algorithm = algorithm;
        this.rankPosition = rankPosition;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.context = context;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public BigDecimal getScore() { return score; }
    public void setScore(BigDecimal score) { this.score = score; }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public Integer getRankPosition() { return rankPosition; }
    public void setRankPosition(Integer rankPosition) { this.rankPosition = rankPosition; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }
}
