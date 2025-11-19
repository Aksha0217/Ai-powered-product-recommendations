package com.ecommerce.recommendation.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class RecommendationDTO {

    private Long id;
    private Long userId;
    private Long productId;
    private String productName;
    private String productImageUrl;
    private BigDecimal productPrice;
    private BigDecimal score;
    private String algorithm;
    private Integer rankPosition;
    private LocalDateTime createdAt;
    private String reason; // Human-readable reason for recommendation

    // Default constructor
    public RecommendationDTO() {}

    // All-args constructor
    public RecommendationDTO(Long id, Long userId, Long productId, String productName, String productImageUrl, BigDecimal productPrice, BigDecimal score, String algorithm, Integer rankPosition, LocalDateTime createdAt, String reason) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.productName = productName;
        this.productImageUrl = productImageUrl;
        this.productPrice = productPrice;
        this.score = score;
        this.algorithm = algorithm;
        this.rankPosition = rankPosition;
        this.createdAt = createdAt;
        this.reason = reason;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getProductImageUrl() { return productImageUrl; }
    public void setProductImageUrl(String productImageUrl) { this.productImageUrl = productImageUrl; }

    public BigDecimal getProductPrice() { return productPrice; }
    public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }

    public BigDecimal getScore() { return score; }
    public void setScore(BigDecimal score) { this.score = score; }

    public String getAlgorithm() { return algorithm; }
    public void setAlgorithm(String algorithm) { this.algorithm = algorithm; }

    public Integer getRankPosition() { return rankPosition; }
    public void setRankPosition(Integer rankPosition) { this.rankPosition = rankPosition; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }
}
