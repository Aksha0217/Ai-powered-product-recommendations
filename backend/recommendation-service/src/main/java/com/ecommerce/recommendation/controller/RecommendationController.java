package com.ecommerce.recommendation.controller;

import com.ecommerce.recommendation.dto.RecommendationDTO;
import com.ecommerce.recommendation.dto.UserInteractionDTO;
import com.ecommerce.recommendation.service.CollaborativeFilteringService;
import com.ecommerce.recommendation.service.ContentBasedFilteringService;
import com.ecommerce.recommendation.service.HybridRecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final CollaborativeFilteringService collaborativeFilteringService;
    private final ContentBasedFilteringService contentBasedFilteringService;
    private final HybridRecommendationService hybridRecommendationService;

    public RecommendationController(CollaborativeFilteringService collaborativeFilteringService,
                                   ContentBasedFilteringService contentBasedFilteringService,
                                   HybridRecommendationService hybridRecommendationService) {
        this.collaborativeFilteringService = collaborativeFilteringService;
        this.contentBasedFilteringService = contentBasedFilteringService;
        this.hybridRecommendationService = hybridRecommendationService;
    }

    /**
     * Get personalized recommendations for a user
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecommendationDTO>> getUserRecommendations(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "HYBRID") String algorithm) {

        System.out.println("Getting recommendations for user: " + userId + " with algorithm: " + algorithm);

        List<RecommendationDTO> recommendations;

        switch (algorithm.toUpperCase()) {
            case "USER_BASED":
                recommendations = collaborativeFilteringService.getUserBasedRecommendations(userId, limit)
                        .stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                break;
            case "ITEM_BASED":
                recommendations = collaborativeFilteringService.getItemBasedRecommendations(userId, limit)
                        .stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                break;
            case "CONTENT_BASED":
                recommendations = contentBasedFilteringService.getContentBasedRecommendations(userId, limit)
                        .stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
                break;
            case "HYBRID":
            default:
                // Use the new hybrid service
                recommendations = hybridRecommendationService.getHybridRecommendations(userId, limit);
                break;
        }

        return ResponseEntity.ok(recommendations);
    }

    /**
     * Get similar products to a given product
     */
    @GetMapping("/product/{productId}/similar")
    public ResponseEntity<List<RecommendationDTO>> getSimilarProducts(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "10") int limit) {

        System.out.println("Getting similar products for product: " + productId);

        List<RecommendationDTO> recommendations = contentBasedFilteringService
                .getSimilarProducts(productId, limit)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recommendations);
    }

    /**
     * Record user interaction for learning
     */
    @PostMapping("/interaction")
    public ResponseEntity<Void> recordInteraction(@RequestBody UserInteractionDTO interactionDTO) {
        System.out.println("Recording interaction: " + interactionDTO);

        // This would typically call a service to save the interaction
        // For now, we'll just log it
        // interactionService.saveInteraction(interactionDTO);

        return ResponseEntity.ok().build();
    }

    /**
     * Get trending/popular products
     */
    @GetMapping("/trending")
    public ResponseEntity<List<RecommendationDTO>> getTrendingProducts(
            @RequestParam(defaultValue = "10") int limit) {

        System.out.println("Getting trending products");

        List<RecommendationDTO> recommendations = contentBasedFilteringService
                .getTrendingProducts(limit)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(recommendations);
    }

    /**
     * Get real-time recommendation updates
     */
    @GetMapping("/user/{userId}/realtime")
    public ResponseEntity<List<RecommendationDTO>> getRealTimeUpdates(@PathVariable Long userId) {
        System.out.println("Getting real-time updates for user: " + userId);

        List<RecommendationDTO> updates = hybridRecommendationService.getRealTimeUpdates(userId);
        return ResponseEntity.ok(updates);
    }

    private RecommendationDTO convertToDTO(com.ecommerce.recommendation.entity.Recommendation recommendation) {
        RecommendationDTO dto = new RecommendationDTO();
        dto.setId(recommendation.getId());
        dto.setUserId(recommendation.getUserId());
        dto.setProductId(recommendation.getProductId());
        dto.setScore(recommendation.getScore());
        dto.setAlgorithm(recommendation.getAlgorithm());
        dto.setRankPosition(recommendation.getRankPosition());
        dto.setCreatedAt(recommendation.getCreatedAt());
        return dto;
    }
}
