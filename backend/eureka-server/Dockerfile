# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY pom.xml .
COPY src ./src

# Install Maven
RUN apt-get update && apt-get install -y maven

# Build the application
RUN mvn clean package -DskipTests

# Expose the port the app runs on
EXPOSE 8761

# Run the application
CMD ["java", "-jar", "target/eureka-server-1.0.0.jar"]
