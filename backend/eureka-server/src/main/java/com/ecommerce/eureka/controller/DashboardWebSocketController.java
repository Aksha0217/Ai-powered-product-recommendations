package com.ecommerce.eureka.controller;

import com.ecommerce.eureka.dto.DashboardUpdate;
import com.ecommerce.eureka.service.AIPerformanceService;
import com.ecommerce.eureka.service.BusinessMetricsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.Instant;
import java.util.Collections;

@Slf4j
@Controller
@RequiredArgsConstructor
public class DashboardWebSocketController {

    private final DiscoveryClient discoveryClient;
    private final BusinessMetricsService businessMetricsService;
    private final AIPerformanceService aiPerformanceService;

    @MessageMapping("/dashboard.updates")
    @SendTo("/topic/dashboard")
    public DashboardUpdate sendRealTimeUpdates() {
        log.info("Sending real-time dashboard update via WebSocket");

        return DashboardUpdate.builder()
            .timestamp(Instant.now())
            .services(discoveryClient.getServices())
            .businessMetrics(businessMetricsService.getLiveMetrics())
            .aiPerformance(aiPerformanceService.getPerformance())
            .alerts(Collections.emptyList()) // In production, integrate with alerting system
            .build();
    }
}
