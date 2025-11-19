package com.ecommerce.recommendation.service;

import com.ecommerce.recommendation.client.HuggingFaceClient;
import com.ecommerce.recommendation.entity.Recommendation;
import com.ecommerce.recommendation.repository.RecommendationRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class ContentBasedFilteringService {

    private static final Logger log = Logger.getLogger(ContentBasedFilteringService.class.getName());

    private final HuggingFaceClient huggingFaceClient;
    private final RecommendationRepository recommendationRepository;

    /**
     * Content-based filtering using semantic similarity
     * Recommends products similar to ones the user has viewed/liked
     */
    public List<Recommendation> getContentBasedRecommendations(Long userId, int limit) {
        log.info("Generating content-based recommendations for user: " + userId);

        // Placeholder implementation - in a real system, this would:
        // 1. Get user's liked/viewed products
        // 2. Get their text descriptions
        // 3. Calculate embeddings using HuggingFace
        // 4. Find similar products

        List<Recommendation> recommendations = new ArrayList<>();

        // Mock recommendations for now
        for (int i = 1; i <= limit; i++) {
            Recommendation rec = new Recommendation();
            rec.setUserId(userId);
            rec.setProductId((long) i);
            rec.setScore(BigDecimal.valueOf(0.8 - (i * 0.1))); // Decreasing scores
            rec.setAlgorithm("CONTENT_BASED");
            rec.setCreatedAt(LocalDateTime.now());
            rec.setExpiresAt(LocalDateTime.now().plusDays(7));
            recommendations.add(rec);
        }

        recommendationRepository.saveAll(recommendations);
        return recommendations;
    }

    /**
     * Get similar products to a given product
     */
    public List<Recommendation> getSimilarProducts(Long productId, int limit) {
        log.info("Getting similar products for product: " + productId);

        List<Recommendation> recommendations = new ArrayList<>();

        // Mock similar products
        for (int i = 1; i <= limit; i++) {
            Recommendation rec = new Recommendation();
            rec.setUserId(null); // Not user-specific
            rec.setProductId(productId + i);
            rec.setScore(BigDecimal.valueOf(0.9 - (i * 0.1)));
            rec.setAlgorithm("SIMILAR_PRODUCTS");
            rec.setCreatedAt(LocalDateTime.now());
            rec.setExpiresAt(LocalDateTime.now().plusDays(7));
            recommendations.add(rec);
        }

        return recommendations;
    }

    /**
     * Get trending/popular products
     */
    public List<Recommendation> getTrendingProducts(int limit) {
        log.info("Getting trending products");

        List<Recommendation> recommendations = new ArrayList<>();

        // Mock trending products based on interaction counts
        for (int i = 1; i <= limit; i++) {
            Recommendation rec = new Recommendation();
            rec.setUserId(null);
            rec.setProductId((long) i);
            rec.setScore(BigDecimal.valueOf(1.0 - (i * 0.05)));
            rec.setAlgorithm("TRENDING");
            rec.setCreatedAt(LocalDateTime.now());
            rec.setExpiresAt(LocalDateTime.now().plusDays(1)); // Trending expires faster
            recommendations.add(rec);
        }

        return recommendations;
    }

    /**
     * Legacy method for backward compatibility
     */
    public Mono<List<Recommendation>> getContentBasedRecommendations(Long userId, List<String> userProductTexts, List<String> candidateProductTexts, int limit) {
        log.info("Generating content-based recommendations for user: " + userId);

        if (userProductTexts.isEmpty() || candidateProductTexts.isEmpty()) {
            return Mono.just(Collections.emptyList());
        }

        // Calculate similarity scores for all combinations
        List<Mono<Map.Entry<Integer, Double>>> similarityMonos = new ArrayList<>();

        for (int i = 0; i < userProductTexts.size(); i++) {
            String userProductText = userProductTexts.get(i);
            for (int j = 0; j < candidateProductTexts.size(); j++) {
                String candidateText = candidateProductTexts.get(j);
                final int candidateIndex = j;

                Mono<Double> similarityMono = huggingFaceClient.calculateSimilarity(userProductText, candidateText);
                Mono<Map.Entry<Integer, Double>> entryMono = similarityMono.map(score ->
                    new AbstractMap.SimpleEntry<>(candidateIndex, score)
                );
                similarityMonos.add(entryMono);
            }
        }

        return Mono.zip(similarityMonos, results -> {
            // Aggregate similarity scores
            Map<Integer, Double> maxSimilarities = new HashMap<>();

            for (Object result : results) {
                @SuppressWarnings("unchecked")
                Map.Entry<Integer, Double> entry = (Map.Entry<Integer, Double>) result;
                Integer candidateIndex = entry.getKey();
                Double score = entry.getValue();

                maxSimilarities.merge(candidateIndex, score, Math::max);
            }

            // Sort by similarity score and create recommendations
            return maxSimilarities.entrySet().stream()
                    .sorted(Map.Entry.<Integer, Double>comparingByValue().reversed())
                    .limit(limit)
                    .map(entry -> {
                        Recommendation rec = new Recommendation();
                        rec.setUserId(userId);
                        rec.setProductId((long) entry.getKey()); // This should be mapped to actual product ID
                        rec.setScore(BigDecimal.valueOf(entry.getValue()));
                        rec.setAlgorithm("CONTENT_BASED");
                        rec.setCreatedAt(LocalDateTime.now());
                        rec.setExpiresAt(LocalDateTime.now().plusDays(7));
                        return rec;
                    })
                    .collect(Collectors.toList());
        }).doOnNext(recommendations -> {
            recommendationRepository.saveAll(recommendations);
            log.info("Generated " + recommendations.size() + " content-based recommendations for user: " + userId);
        });
    }

    /**
     * Hybrid approach combining multiple content features
     */
    public Mono<List<Recommendation>> getHybridContentRecommendations(Long userId, Map<Long, String> productTexts, int limit) {
        // This would combine text similarity with other features like category, tags, etc.
        // For now, delegate to basic content-based filtering
        List<String> texts = new ArrayList<>(productTexts.values());
        return getContentBasedRecommendations(userId, texts, texts, limit);
    }

    /**
     * Get product embeddings for caching and faster similarity calculations
     */
    public Mono<double[]> getProductEmbedding(String productText) {
        return huggingFaceClient.getEmbeddings(productText);
    }

    /**
     * Batch process embeddings for multiple products
     */
    public Mono<Map<Long, double[]>> getProductEmbeddingsBatch(Map<Long, String> productTexts) {
        List<Mono<Map.Entry<Long, double[]>>> embeddingMonos = productTexts.entrySet().stream()
                .map(entry -> huggingFaceClient.getEmbeddings(entry.getValue())
                        .map(embedding -> new AbstractMap.SimpleEntry<>(entry.getKey(), embedding)))
                .collect(Collectors.toList());

        return Mono.zip(embeddingMonos, results -> {
            Map<Long, double[]> embeddings = new HashMap<>();
            for (Object result : results) {
                @SuppressWarnings("unchecked")
                Map.Entry<Long, double[]> entry = (Map.Entry<Long, double[]>) result;
                embeddings.put(entry.getKey(), entry.getValue());
            }
            return embeddings;
        });
    }
}
