package com.ecommerce.eureka.controller;

import com.ecommerce.eureka.dto.AIPerformance;
import com.ecommerce.eureka.dto.BusinessMetrics;
import com.ecommerce.eureka.dto.ScalingRecommendation;
import com.ecommerce.eureka.service.AIPerformanceService;
import com.ecommerce.eureka.service.BusinessMetricsService;
import com.ecommerce.eureka.service.PredictiveScalingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class EurekaDashboardController {

    private final BusinessMetricsService businessMetricsService;
    private final AIPerformanceService aiPerformanceService;
    private final PredictiveScalingService predictiveScalingService;

    @GetMapping("/business-metrics")
    public ResponseEntity<BusinessMetrics> getBusinessMetrics() {
        log.info("Fetching business metrics for dashboard");
        BusinessMetrics metrics = businessMetricsService.getLiveMetrics();
        return ResponseEntity.ok(metrics);
    }

    @GetMapping("/ai-performance")
    public ResponseEntity<AIPerformance> getAIPerformance() {
        log.info("Fetching AI performance metrics");
        AIPerformance performance = aiPerformanceService.getPerformance();
        return ResponseEntity.ok(performance);
    }

    @GetMapping("/scaling-recommendations")
    public ResponseEntity<List<ScalingRecommendation>> getScalingRecommendations() {
        log.info("Fetching predictive scaling recommendations");
        List<ScalingRecommendation> recommendations = predictiveScalingService.getScalingRecommendations();
        return ResponseEntity.ok(recommendations);
    }
}
