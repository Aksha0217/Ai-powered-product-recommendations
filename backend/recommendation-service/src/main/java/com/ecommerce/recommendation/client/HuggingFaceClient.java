package com.ecommerce.recommendation.client;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class HuggingFaceClient {

    private final WebClient webClient;

    @Value("${huggingface.api.token}")
    private String apiKey;

    @Value("${huggingface.api.url}")
    private String baseUrl;

    /**
     * Get embeddings for product text using Hugging Face inference API
     */
    public Mono<double[]> getEmbeddings(String text) {
        Map<String, Object> requestBody = Map.of(
            "inputs", text,
            "options", Map.of("wait_for_model", true)
        );

        return webClient.post()
                .uri(baseUrl + "/models/sentence-transformers/all-MiniLM-L6-v2")
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(this::extractEmbeddings)
                .doOnError(error -> log.error("Error calling Hugging Face API: {}", error.getMessage()));
    }

    /**
     * Calculate similarity between two texts using embeddings
     */
    public Mono<Double> calculateSimilarity(String text1, String text2) {
        return Mono.zip(getEmbeddings(text1), getEmbeddings(text2))
                .map(tuple -> cosineSimilarity(tuple.getT1(), tuple.getT2()));
    }

    private double[] extractEmbeddings(JsonNode response) {
        if (response.isArray() && response.size() > 0) {
            JsonNode firstResult = response.get(0);
            if (firstResult.has("data")) {
                // For some models, embeddings are in 'data' field
                JsonNode data = firstResult.get("data");
                double[] embeddings = new double[data.size()];
                for (int i = 0; i < data.size(); i++) {
                    embeddings[i] = data.get(i).asDouble();
                }
                return embeddings;
            } else if (firstResult.isArray()) {
                // Direct array of embeddings
                double[] embeddings = new double[firstResult.size()];
                for (int i = 0; i < firstResult.size(); i++) {
                    embeddings[i] = firstResult.get(i).asDouble();
                }
                return embeddings;
            }
        }
        throw new RuntimeException("Unexpected response format from Hugging Face API");
    }

    private double cosineSimilarity(double[] vectorA, double[] vectorB) {
        if (vectorA.length != vectorB.length) {
            throw new IllegalArgumentException("Vectors must have same length");
        }

        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < vectorA.length; i++) {
            dotProduct += vectorA[i] * vectorB[i];
            normA += Math.pow(vectorA[i], 2);
            normB += Math.pow(vectorB[i], 2);
        }

        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }
}
