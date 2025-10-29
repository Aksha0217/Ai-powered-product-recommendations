package com.ecommerce.recommendation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_interactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
