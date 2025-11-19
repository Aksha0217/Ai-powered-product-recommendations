

# 🚀 Advanced E-commerce Platform with AI-Powered Recommendations

[![Java](https://img.shields.io/badge/Java-17+-orange)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

> An enterprise-grade e-commerce platform powered by **AI product recommendations**, real-time updates, scalable microservices, and a modern frontend design.



---

# ✨ Key Features

## 🤖 AI Recommendation Engine

* Smart suggestions powered by **Hugging Face**
* Collaborative filtering
* Content-based filtering
* Hybrid AI recommendations
* Real-time updates via WebSocket

## ⚡ Real-Time Capabilities

* Live recommendation updates
* Instant product availability tracking
* Real-time user activity stream
* Live search

## 🏢 Enterprise Architecture

* Microservices using Spring Cloud
* JWT + OAuth2 authentication
* API Gateway + rate limiting
* Centralized Config Server
* Full analytics dashboard

---

# 🛠️ Tech Stack

## Frontend

* React 18 + TypeScript
* Tailwind CSS + shadcn/ui
* Vite build tool
* Responsive UI

## Backend

* Java 17
* Spring Boot 3.x
* Spring Cloud
* WebSocket
* PostgreSQL + Redis

## AI / ML

* Hugging Face API
* TensorFlow Java
* Collaborative filtering algorithms

## DevOps

* Docker + Docker Compose
* GitHub Actions CI/CD
* Grafana + Prometheus

---

# 🚀 Quick Start

## Prerequisites

* Java 17+
* Node.js 16+
* Docker + Docker Compose
* Maven 3.6+

---

## 1️⃣ Clone & Setup

```bash
git clone https://github.com/Aksha0217/Ai-powered-product-recommendations.git
cd Ai-powered-product-recommendations

docker-compose up -d postgres redis

cd backend
mvn clean install
mvn spring-boot:run
```

---

## 2️⃣ Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 3️⃣ Access URLs

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Gateway:** [http://localhost:8080](http://localhost:8080)
* **Eureka:** [http://localhost:8761](http://localhost:8761)
* **Swagger Docs:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

# 🏗️ Project Structure

### Backend

```
backend/
├── api-gateway/
├── user-service/
├── product-service/
├── recommendation-service/
├── eureka-server/
└── config-server/
```

### Frontend

```
frontend/
├── components/
├── pages/
├── hooks/
└── utils/
```

### Infrastructure

```
database/
└── postgresql/schema.sql
docker-compose.yml
```

---

# 📊 Architecture Overview

```
Frontend (React)
      │
      ▼
API Gateway (Spring Cloud)
      │
 ┌────┼──────────┬─────────┐
 │    │          │         │
 ▼    ▼          ▼         ▼
User Service  Product   Recommendation
                Service     Service (AI)
      └──────────┬───────────┘
                 ▼
            PostgreSQL & Redis
```

---

# 🔧 Configuration

## Environment Variables

```bash
POSTGRES_DB=ecommerce_db
POSTGRES_USER=ecommerce_user
POSTGRES_PASSWORD=ecommerce_pass

REDIS_HOST=localhost
REDIS_PORT=6379

HUGGINGFACE_API_KEY=your_api_key_here
JWT_SECRET=your_jwt_secret_here
```

---

# 🧪 Testing

## Backend

```bash
mvn test
```

## Frontend

```bash
npm test
```

## Integration Testing

```bash
docker-compose up -d
mvn verify -P integration-test
```

---

# 📈 Performance & Scalability

* Redis caching
* CDN optimizations
* Horizontal scaling support
* Prometheus metrics
* Grafana dashboards
* Circuit breakers with Resilience4j

---

# 🔒 Security

* JWT-based authentication
* OAuth2 login
* XSS/CSRF protection
* HSTS + CSP security headers

---

# 🤝 Contributing

1. Fork
2. Create feature branch
3. Commit
4. Push
5. Open PR

---

# 📝 License

Licensed under the **MIT License**.

