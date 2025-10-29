package com.ecommerce.eureka.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardUpdate {
    private Instant timestamp;
    private List<String> services;
    private BusinessMetrics businessMetrics;
    private AIPerformance aiPerformance;
    private List<String> alerts;
}
