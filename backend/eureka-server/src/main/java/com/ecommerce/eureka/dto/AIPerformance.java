package com.ecommerce.eureka.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIPerformance {
    private String modelName;
    private Long inferenceSpeed; // in milliseconds
    private Double accuracy; // percentage
    private Integer usersPersonalized;
    private Double revenueImpact; // percentage increase
}
