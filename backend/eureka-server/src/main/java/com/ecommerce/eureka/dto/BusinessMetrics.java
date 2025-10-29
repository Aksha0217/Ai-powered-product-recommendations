package com.ecommerce.eureka.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessMetrics {
    private Instant timestamp;
    private int activeUsers;
    private double revenueRate; // Revenue per minute
    private double conversionRate; // Percentage
    private double aiRecommendationAccuracy; // Percentage
    private double systemHealthScore; // 0-100
    private String businessStatus; // EXCELLENT, GOOD, WARNING, CRITICAL
}
