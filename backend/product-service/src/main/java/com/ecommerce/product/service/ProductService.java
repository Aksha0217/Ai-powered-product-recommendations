package com.ecommerce.product.service;

import com.ecommerce.product.dto.ProductDTO;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Create a new product
    public ProductDTO createProduct(ProductDTO productDTO) {
        if (productRepository.existsByName(productDTO.getName())) {
            throw new IllegalArgumentException("Product with name '" + productDTO.getName() + "' already exists");
        }

        Product product = convertToEntity(productDTO);
        Product savedProduct = productRepository.save(product);
        return convertToDTO(savedProduct);
    }

    // Get all products with pagination
    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable).map(this::convertToDTO);
    }

    // Get product by ID
    @Transactional(readOnly = true)
    public Optional<ProductDTO> getProductById(Long id) {
        return productRepository.findById(id).map(this::convertToDTO);
    }

    // Update product
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + id));

        // Check if name is being changed and if it conflicts
        if (!existingProduct.getName().equals(productDTO.getName()) &&
            productRepository.existsByName(productDTO.getName())) {
            throw new IllegalArgumentException("Product with name '" + productDTO.getName() + "' already exists");
        }

        updateEntityFromDTO(existingProduct, productDTO);
        Product updatedProduct = productRepository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }

    // Delete product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // Search products
    @Transactional(readOnly = true)
    public List<ProductDTO> searchProducts(String query) {
        return productRepository.searchByNameOrDescription(query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get products by category
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get products by price range
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productRepository.findByPriceBetween(minPrice, maxPrice)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get products by tag
    @Transactional(readOnly = true)
    public List<ProductDTO> getProductsByTag(String tag) {
        return productRepository.findByTag(tag)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get recommended products (simple implementation - can be enhanced with AI)
    @Transactional(readOnly = true)
    public List<ProductDTO> getRecommendedProducts(String category, int limit) {
        return productRepository.findTopByCategoryOrderByCreatedAtDesc(category)
                .stream()
                .limit(limit)
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Helper methods for conversion
    private ProductDTO convertToDTO(Product product) {
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getCategory(),
                product.getTags(),
                product.getImageUrl(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }

    private Product convertToEntity(ProductDTO productDTO) {
        Product product = new Product();
        updateEntityFromDTO(product, productDTO);
        return product;
    }

    private void updateEntityFromDTO(Product product, ProductDTO productDTO) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setTags(productDTO.getTags());
        product.setImageUrl(productDTO.getImageUrl());
    }
}
