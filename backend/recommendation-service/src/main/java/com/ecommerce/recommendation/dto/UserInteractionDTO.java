package com.ecommerce.recommendation.dto;

import java.time.LocalDateTime;

public class UserInteractionDTO {

    private Long id;
    private Long userId;
    private Long productId;
    private String interactionType;
    private Integer rating;
    private LocalDateTime timestamp;
    private String sessionId;
    private Double weight;

    // Default constructor
    public UserInteractionDTO() {}

    // All-args constructor
    public UserInteractionDTO(Long id, Long userId, Long productId, String interactionType, Integer rating, LocalDateTime timestamp, String sessionId, Double weight) {
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
