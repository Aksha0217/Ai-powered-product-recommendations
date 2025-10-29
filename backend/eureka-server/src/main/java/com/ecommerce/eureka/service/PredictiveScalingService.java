package com.ecommerce.eureka.service;

import com.ecommerce.eureka.dto.ScalingRecommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class PredictiveScalingService {

    private final Random random = new Random();

    public List<ScalingRecommendation> getScalingRecommendations() {
        // Simulate predictive scaling analysis - in production, use ML algorithms
        return List.of(
            ScalingRecommendation.builder()
                .serviceName("product-service")
                .currentInstances(2)
                .recommendedInstances(4)
                .predictedLoadIncrease(85.0 + random.nextDouble() * 10) // 85% ± 10%
                .timeframe("Next 2 hours")
                .confidenceScore(92.5 + random.nextDouble() * 5) // 92.5% ± 5%
                .costImplication("+$240/month")
                .build(),
            ScalingRecommendation.builder()
                .serviceName("user-service")
                .currentInstances(3)
                .recommendedInstances(3)
                .predictedLoadIncrease(15.0 + random.nextDouble() * 5) // 15% ± 5%
                .timeframe("Next 4 hours")
                .confidenceScore(78.0 + random.nextDouble() * 10) // 78% ± 10%
                .costImplication("No change")
                .build(),
            ScalingRecommendation.builder()
                .serviceName("api-gateway")
                .currentInstances(2)
                .recommendedInstances(3)
                .predictedLoadIncrease(45.0 + random.nextDouble() * 15) // 45% ± 15%
                .timeframe("Next 1 hour")
                .confidenceScore(88.0 + random.nextDouble() * 7) // 88% ± 7%
                .costImplication("+$180/month")
                .build()
        );
    }
}
