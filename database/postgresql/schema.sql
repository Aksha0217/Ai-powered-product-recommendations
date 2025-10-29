-- Ecommerce Database Schema
-- This script creates all necessary tables for the microservices architecture

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS ecommerce_db;
\c ecommerce_db;

-- Users table (for user-service)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Products table (for product-service)
CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100),
    brand VARCHAR(100),
    image_url VARCHAR(500),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- User interactions table (for recommendation-service)
CREATE TABLE IF NOT EXISTS user_interactions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    interaction_type VARCHAR(50) NOT NULL, -- 'view', 'click', 'purchase', 'add_to_cart', 'like', 'dislike'
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    weight DECIMAL(3,2) DEFAULT 1.0, -- Weight for recommendation algorithms
    session_id VARCHAR(255),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    context JSONB -- Additional context like page, referrer, etc.
);

-- Recommendations table (for recommendation-service)
CREATE TABLE IF NOT EXISTS recommendations (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    score DECIMAL(5,4) NOT NULL,
    algorithm VARCHAR(100) NOT NULL, -- 'collaborative', 'content_based', 'hybrid'
    rank_position INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '24 hours'),
    context JSONB -- Algorithm-specific context
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_product_id ON user_interactions(product_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_user_interactions_timestamp ON user_interactions(timestamp);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_score ON recommendations(score DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_expires_at ON recommendations(expires_at);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data for testing
INSERT INTO users (email, password, first_name, last_name, preferences) VALUES
('user1@example.com', '$2a$10$example.hash', 'John', 'Doe', '{"categories": ["electronics", "books"]}'),
('user2@example.com', '$2a$10$example.hash', 'Jane', 'Smith', '{"categories": ["clothing", "home"]}'),
('user3@example.com', '$2a$10$example.hash', 'Bob', 'Johnson', '{"categories": ["sports", "electronics"]}');

INSERT INTO products (name, description, price, category, brand, stock_quantity) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 'electronics', 'AudioTech', 50),
('Smartphone Case', 'Protective case for smartphones', 29.99, 'electronics', 'CasePro', 100),
('Running Shoes', 'Comfortable running shoes for athletes', 129.99, 'sports', 'SportFit', 30),
('Coffee Maker', 'Automatic coffee maker with timer', 89.99, 'home', 'BrewMaster', 20),
('Programming Book', 'Comprehensive guide to Java programming', 49.99, 'books', 'TechBooks', 75);

-- Sample interactions
INSERT INTO user_interactions (user_id, product_id, interaction_type, rating, weight) VALUES
(1, 1, 'view', NULL, 0.5),
(1, 1, 'purchase', 5, 1.0),
(1, 2, 'add_to_cart', NULL, 0.8),
(2, 3, 'view', NULL, 0.5),
(2, 4, 'like', 4, 0.9),
(3, 1, 'view', NULL, 0.5),
(3, 5, 'purchase', 5, 1.0);
