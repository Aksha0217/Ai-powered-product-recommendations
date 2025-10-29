package com.ecommerce.eureka.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScalingRecommendation {
    private String serviceName;
    private Integer currentInstances;
    private Integer recommendedInstances;
    private Double predictedLoadIncrease; // percentage
    private String timeframe;
    private Double confidenceScore; // percentage
    private String costImplication;
}
