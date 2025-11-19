package com.ecommerce.recommendation.service;

import com.ecommerce.recommendation.entity.Recommendation;
import com.ecommerce.recommendation.entity.UserInteraction;
import com.ecommerce.recommendation.repository.RecommendationRepository;
import com.ecommerce.recommendation.repository.UserInteractionRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CollaborativeFilteringService {

    private static final Logger log = Logger.getLogger(CollaborativeFilteringService.class.getName());

    private final UserInteractionRepository interactionRepository;
    private final RecommendationRepository recommendationRepository;

    /**
     * User-based collaborative filtering
     * Finds similar users and recommends products they liked
     */
    public List<Recommendation> getUserBasedRecommendations(Long userId, int limit) {
        log.info("Generating user-based collaborative filtering recommendations for user: " + userId);

        // Get user's interaction history
        List<UserInteraction> userInteractions = interactionRepository.findByUserIdOrderByTimestampDesc(userId);
        if (userInteractions.isEmpty()) {
            log.info("No interactions found for user: " + userId);
            return Collections.emptyList();
        }

        // Find similar users based on interaction patterns
        Map<Long, Double> similarUsers = findSimilarUsers(userId, userInteractions);

        // Get products liked by similar users that user hasn't interacted with
        Set<Long> userInteractedProducts = userInteractions.stream()
                .map(UserInteraction::getProductId)
                .collect(Collectors.toSet());

        Map<Long, Double> productScores = new HashMap<>();
        for (Map.Entry<Long, Double> entry : similarUsers.entrySet()) {
            Long similarUserId = entry.getKey();
            Double similarityScore = entry.getValue();

            List<UserInteraction> similarUserInteractions = interactionRepository
                    .findByUserIdAndInteractionType(similarUserId, "PURCHASE");

            for (UserInteraction interaction : similarUserInteractions) {
                Long productId = interaction.getProductId();
                if (!userInteractedProducts.contains(productId)) {
                    productScores.merge(productId, similarityScore, Double::sum);
                }
            }
        }

        return createRecommendations(userId, productScores, "USER_BASED_CF", limit);
    }

    /**
     * Item-based collaborative filtering
     * Finds products similar to ones the user has liked
     */
    public List<Recommendation> getItemBasedRecommendations(Long userId, int limit) {
        log.info("Generating item-based collaborative filtering recommendations for user: " + userId);

        // Get products user has positively interacted with
        List<UserInteraction> positiveInteractions = interactionRepository
                .findByUserIdAndInteractionType(userId, "PURCHASE");

        if (positiveInteractions.isEmpty()) {
            return Collections.emptyList();
        }

        Set<Long> likedProductIds = positiveInteractions.stream()
                .map(UserInteraction::getProductId)
                .collect(Collectors.toSet());

        // Find users who liked the same products
        Map<Long, Double> productScores = new HashMap<>();
        for (Long likedProductId : likedProductIds) {
            List<Long> usersWhoLikedProduct = interactionRepository
                    .findUsersWhoInteractedWithProduct(likedProductId);

            // For each user who liked this product, find other products they liked
            for (Long otherUserId : usersWhoLikedProduct) {
                if (!otherUserId.equals(userId)) {
                    List<Long> otherUserProducts = interactionRepository
                            .findProductsInteractedByUser(otherUserId);

                    for (Long otherProductId : otherUserProducts) {
                        if (!likedProductIds.contains(otherProductId)) {
                            // Calculate similarity score based on co-occurrence
                            double score = calculateItemSimilarity(likedProductId, otherProductId);
                            productScores.merge(otherProductId, score, Double::sum);
                        }
                    }
                }
            }
        }

        return createRecommendations(userId, productScores, "ITEM_BASED_CF", limit);
    }

    private Map<Long, Double> findSimilarUsers(Long userId, List<UserInteraction> userInteractions) {
        Map<Long, Double> similarUsers = new HashMap<>();

        // Get all users who interacted with the same products
        Set<Long> userProductIds = userInteractions.stream()
                .map(UserInteraction::getProductId)
                .collect(Collectors.toSet());

        for (Long productId : userProductIds) {
            List<Long> usersForProduct = interactionRepository.findUsersWhoInteractedWithProduct(productId);

            for (Long otherUserId : usersForProduct) {
                if (!otherUserId.equals(userId)) {
                    similarUsers.merge(otherUserId, 1.0, Double::sum);
                }
            }
        }

        // Normalize similarity scores
        int maxInteractions = userProductIds.size();
        similarUsers.replaceAll((k, v) -> v / maxInteractions);

        return similarUsers;
    }

    private double calculateItemSimilarity(Long productId1, Long productId2) {
        // Jaccard similarity: intersection / union
        List<Long> users1 = interactionRepository.findUsersWhoInteractedWithProduct(productId1);
        List<Long> users2 = interactionRepository.findUsersWhoInteractedWithProduct(productId2);

        Set<Long> union = new HashSet<>(users1);
        union.addAll(users2);

        Set<Long> intersection = new HashSet<>(users1);
        intersection.retainAll(users2);

        return union.isEmpty() ? 0.0 : (double) intersection.size() / union.size();
    }

    private List<Recommendation> createRecommendations(Long userId, Map<Long, Double> productScores, String algorithm, int limit) {
        List<Recommendation> recommendations = new ArrayList<>();

        // Sort products by score descending
        productScores.entrySet().stream()
                .sorted(Map.Entry.<Long, Double>comparingByValue().reversed())
                .limit(limit)
                .forEach(entry -> {
                    Recommendation rec = new Recommendation();
                    rec.setUserId(userId);
                    rec.setProductId(entry.getKey());
                    rec.setScore(BigDecimal.valueOf(entry.getValue()));
                    rec.setAlgorithm(algorithm);
                    rec.setCreatedAt(LocalDateTime.now());
                    rec.setExpiresAt(LocalDateTime.now().plusDays(7)); // Recommendations expire in 7 days
                    recommendations.add(rec);
                });

        // Save recommendations
        recommendationRepository.saveAll(recommendations);

        return recommendations;
    }
}
