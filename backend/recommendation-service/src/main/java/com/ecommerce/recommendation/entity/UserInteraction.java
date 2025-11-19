package com.ecommerce.recommendation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_interactions")
public class UserInteraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(name = "interaction_type", nullable = false)
    private String interactionType; // VIEW, PURCHASE, LIKE, CART_ADD, etc.

    @Column(name = "rating")
    private Integer rating; // 1-5 scale for explicit ratings

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "session_id")
    private String sessionId;

    @Column(name = "weight")
    private Double weight; // Calculated weight for recommendation algorithms

    // Default constructor
    public UserInteraction() {}

    // All-args constructor
    public UserInteraction(Long id, Long userId, Long productId, String interactionType, Integer rating, LocalDateTime timestamp, String sessionId, Double weight) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.interactionType = interactionType;
        this.rating = rating;
        this.timestamp = timestamp;
        this.sessionId = sessionId;
        this.weight = weight;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public String getInteractionType() { return interactionType; }
    public void setInteractionType(String interactionType) { this.interactionType = interactionType; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
}
