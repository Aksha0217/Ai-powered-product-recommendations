package com.ecommerce.recommendation.service;

import com.ecommerce.recommendation.dto.RecommendationDTO;
import com.ecommerce.recommendation.entity.Recommendation;
import com.ecommerce.recommendation.repository.RecommendationRepository;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HybridRecommendationService {

    private final CollaborativeFilteringService collaborativeFilteringService;
    private final ContentBasedFilteringService contentBasedFilteringService;
    private final RecommendationRepository recommendationRepository;

    // Weights for hybrid scoring
    private static final double COLLABORATIVE_WEIGHT = 0.6;
    private static final double CONTENT_BASED_WEIGHT = 0.4;
    private static final double TEMPORAL_DECAY_FACTOR = 0.95;
    private static final double POPULARITY_BOOST = 0.1;

    public HybridRecommendationService(CollaborativeFilteringService collaborativeFilteringService,
                                     ContentBasedFilteringService contentBasedFilteringService,
                                     RecommendationRepository recommendationRepository) {
        this.collaborativeFilteringService = collaborativeFilteringService;
        this.contentBasedFilteringService = contentBasedFilteringService;
        this.recommendationRepository = recommendationRepository;
    }

    /**
     * Generate hybrid recommendations combining collaborative and content-based filtering
     * with advanced scoring algorithm including temporal decay and popularity boost
     */
    @Cacheable(value = "hybridRecommendations", key = "#userId + '_' + #limit")
    public List<RecommendationDTO> getHybridRecommendations(Long userId, int limit) {
        System.out.println("Generating hybrid recommendations for user: " + userId);

        // Get recommendations from both algorithms
        List<Recommendation> collaborativeRecs = collaborativeFilteringService
            .getUserBasedRecommendations(userId, limit * 2);
        List<Recommendation> contentBasedRecs = contentBasedFilteringService
            .getContentBasedRecommendations(userId, limit * 2);

        // Convert to DTOs and combine
        List<RecommendationDTO> collaborativeDTOs = collaborativeRecs.stream()
            .map(rec -> {
                RecommendationDTO dto = new RecommendationDTO();
                dto.setId(rec.getId());
                dto.setUserId(rec.getUserId());
                dto.setProductId(rec.getProductId());
                dto.setScore(rec.getScore());
                dto.setAlgorithm(rec.getAlgorithm());
                dto.setCreatedAt(rec.getCreatedAt());
                return dto;
            })
            .collect(Collectors.toList());

        List<RecommendationDTO> contentBasedDTOs = contentBasedRecs.stream()
            .map(rec -> {
                RecommendationDTO dto = new RecommendationDTO();
                dto.setId(rec.getId());
                dto.setUserId(rec.getUserId());
                dto.setProductId(rec.getProductId());
                dto.setScore(rec.getScore());
                dto.setAlgorithm(rec.getAlgorithm());
                dto.setCreatedAt(rec.getCreatedAt());
                return dto;
            })
            .collect(Collectors.toList());

        // Combine and score recommendations
        Map<Long, HybridScore> productScores = new HashMap<>();

        // Process collaborative filtering recommendations
        for (RecommendationDTO rec : collaborativeDTOs) {
            productScores.computeIfAbsent(rec.getProductId(), k -> new HybridScore())
                .addCollaborativeScore(rec.getScore().doubleValue());
        }

        // Process content-based recommendations
        for (RecommendationDTO rec : contentBasedDTOs) {
            productScores.computeIfAbsent(rec.getProductId(), k -> new HybridScore())
                .addContentBasedScore(rec.getScore().doubleValue());
        }

        // Calculate final hybrid scores and apply advanced algorithms
        List<RecommendationDTO> hybridRecommendations = productScores.entrySet().stream()
            .map(entry -> {
                Long productId = entry.getKey();
                HybridScore score = entry.getValue();

                double hybridScore = calculateHybridScore(score);
                double finalScore = applyAdvancedScoring(hybridScore, productId);

                RecommendationDTO dto = new RecommendationDTO();
                dto.setUserId(userId);
                dto.setProductId(productId);
                dto.setScore(BigDecimal.valueOf(finalScore));
                dto.setAlgorithm("hybrid");
                dto.setCreatedAt(java.time.LocalDateTime.now());
                return dto;
            })
            .sorted((a, b) -> Double.compare(b.getScore().doubleValue(), a.getScore().doubleValue()))
            .limit(limit)
            .collect(Collectors.toList());

        System.out.println("Generated " + hybridRecommendations.size() + " hybrid recommendations for user: " + userId);
        return hybridRecommendations;
    }

    /**
     * Calculate hybrid score using weighted combination
     */
    private double calculateHybridScore(HybridScore score) {
        double collaborativeScore = score.getCollaborativeScore() * COLLABORATIVE_WEIGHT;
        double contentBasedScore = score.getContentBasedScore() * CONTENT_BASED_WEIGHT;

        // Handle cases where one algorithm has no score
        if (score.getCollaborativeScore() == 0) {
            return contentBasedScore * 1.5; // Boost content-based when collaborative is missing
        }
        if (score.getContentBasedScore() == 0) {
            return collaborativeScore * 1.3; // Boost collaborative when content-based is missing
        }

        return collaborativeScore + contentBasedScore;
    }

    /**
     * Apply advanced scoring algorithms including temporal decay and popularity
     */
    private double applyAdvancedScoring(double baseScore, Long productId) {
        double score = baseScore;

        // Apply temporal decay based on recommendation freshness
        score = applyTemporalDecay(score, productId);

        // Apply popularity boost
        score = applyPopularityBoost(score, productId);

        // Apply diversity penalty to avoid over-recommendation
        score = applyDiversityPenalty(score, productId);

        return Math.max(0, Math.min(1, score)); // Normalize to [0,1]
    }

    /**
     * Apply temporal decay - newer recommendations get higher scores
     */
    private double applyTemporalDecay(double score, Long productId) {
        // Get the most recent recommendation for this product
        Optional<Recommendation> recentRec = recommendationRepository
            .findTopByProductIdOrderByCreatedAtDesc(productId);

        if (recentRec.isPresent()) {
            long hoursSinceCreation = java.time.Duration.between(
                recentRec.get().getCreatedAt(),
                java.time.LocalDateTime.now()
            ).toHours();

            // Apply exponential decay
            double decay = Math.pow(TEMPORAL_DECAY_FACTOR, hoursSinceCreation / 24.0);
            return score * decay;
        }

        return score;
    }

    /**
     * Apply popularity boost based on interaction frequency
     */
    private double applyPopularityBoost(double score, Long productId) {
        // Count total interactions for this product
        long interactionCount = recommendationRepository.countByProductId(productId);

        // Apply logarithmic popularity boost
        double popularityBoost = Math.log(interactionCount + 1) * POPULARITY_BOOST;
        return score + popularityBoost;
    }

    /**
     * Apply diversity penalty to encourage exploration
     */
    private double applyDiversityPenalty(double score, Long productId) {
        // Simple diversity mechanism - could be enhanced with category diversity
        // For now, apply small penalty to very high scores to promote exploration
        if (score > 0.8) {
            return score * 0.98; // 2% penalty for very high scores
        }
        return score;
    }

    /**
     * Get real-time recommendation updates for WebSocket
     */
    public List<RecommendationDTO> getRealTimeUpdates(Long userId) {
        List<Recommendation> recentRecs = recommendationRepository
            .findByUserIdOrderByCreatedAtDesc(userId);

        return recentRecs.stream()
            .map(rec -> {
                RecommendationDTO dto = new RecommendationDTO();
                dto.setUserId(rec.getUserId());
                dto.setProductId(rec.getProductId());
                dto.setScore(rec.getScore());
                dto.setAlgorithm(rec.getAlgorithm());
                dto.setCreatedAt(rec.getCreatedAt());
                return dto;
            })
            .collect(Collectors.toList());
    }

    /**
     * Inner class to hold hybrid scoring components
     */
    private static class HybridScore {
        private double collaborativeScore = 0.0;
        private double contentBasedScore = 0.0;
        private int collaborativeCount = 0;
        private int contentBasedCount = 0;

        public void addCollaborativeScore(double score) {
            this.collaborativeScore = (this.collaborativeScore * collaborativeCount + score) / (collaborativeCount + 1);
            collaborativeCount++;
        }

        public void addContentBasedScore(double score) {
            this.contentBasedScore = (this.contentBasedScore * contentBasedCount + score) / (contentBasedCount + 1);
            contentBasedCount++;
        }

        public double getCollaborativeScore() {
            return collaborativeScore;
        }

        public double getContentBasedScore() {
            return contentBasedScore;
        }
    }
}
