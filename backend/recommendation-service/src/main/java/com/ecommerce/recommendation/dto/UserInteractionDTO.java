package com.ecommerce.recommendation.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInteractionDTO {

    private Long id;
    private Long userId;
    private Long productId;
    private String interactionType;
    private Integer rating;
    private LocalDateTime timestamp;
    private String sessionId;
    private Double weight;
}
