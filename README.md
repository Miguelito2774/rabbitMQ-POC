# Instructions for Setup and Execution

## Prerequisites
Before running the application, make sure you have the following installed:
- Node.js
- RabbitMQ
- amqplib (Node.js library)

## 1. Install and Start RabbitMQ
1. Download and install RabbitMQ from the official [RabbitMQ website](https://www.rabbitmq.com/download.html).
2. Start RabbitMQ using Docker (recommended):
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```
   Alternatively, start the RabbitMQ server directly:
   ```bash
   rabbitmq-server
   ```

## 2. Run the Application Components
Execute the following components in order:
1. Start the RabbitMQ message broker:
   ```bash
   node rabbit.js
   ```
2. Launch the admin service:
   ```bash
   node admin.js
   ```
3. Start the camera owner service:
   ```bash
   node camOwner.js
   ```
4. Initialize the pet owner service:
   ```bash
   node petOwner.js
   ```

# RabbitMQ vs Kafka: Event-Driven System Comparison for Petfinder Project

In this section, we'll compare **RabbitMQ** and **Kafka**, focusing on their performance in event-driven microservices, JavaScript integration, and ease of implementation.

## 1. RabbitMQ

RabbitMQ is a message queue system implementing **AMQP (Advanced Message Queuing Protocol)**, designed for simple to moderately complex event-handling applications.

### Pros:
- **Ease of Use**: Intuitive interface and a gentle learning curve.
- **JavaScript Support**: Well-documented libraries like `amqplib` or `rascal` for Node.js.
- **Flexible Queues**: Offers durable or transient queues based on use case.
- **Advanced Routing**: Exchanges enable efficient event filtering.
- **Moderate Scalability**: Suitable for small to medium workloads.
- **Automatic Retries**: Supports retry mechanisms for failed deliveries.

### Cons:
- **Limited Scalability**: Struggles with large-scale, high-throughput systems.
- **Message Ordering**: No strict guarantee of message ordering across consumers.

### When to Use:
- Small to medium workloads (e.g., camera events).
- Quick setup and integration with Node.js.
- Scenarios requiring sophisticated message routing.

## 2. Apache Kafka

Kafka is a distributed streaming platform ideal for real-time, large-scale data pipelines.

### Pros:
- **High Scalability**: Handles millions of events per second.
- **Message Retention**: Retains messages for specified durations, supporting replayability.
- **Guaranteed Ordering**: Delivers events in order within a partition.
- **Real-Time Streaming**: Suitable for data analytics and processing.
- **Enterprise-Grade**: Widely adopted in large-scale systems.

### Cons:
- **Steeper Learning Curve**: Complex to configure and operate.
- **Challenging JS Integration**: Libraries like `kafkajs` exist but require more effort than RabbitMQ.
- **Resource Overhead**: Overkill for smaller projects.

### When to Use:
- Anticipated growth in event volume and system scale.
- Requirements for event history storage.
- High-performance real-time data streaming.

## 3. Other Options

### NATS
- Lightweight and simple for microservices.
- Fast with basic message brokering.
- Limited in advanced features like message persistence.

### Amazon SNS/SQS
- Native to AWS ecosystems.
- Scalable and straightforward cloud messaging services.
- Ideal for cloud-based architectures.

## Direct Comparison Table

| Feature | RabbitMQ | Kafka | NATS |
|---------|----------|-------|------|
| **Ease of Use** | Easier, quick setup | Steeper learning curve | Simple, lightweight |
| **Scalability** | Moderate (for medium apps) | High (massive systems) | Very high (lightweight events) |
| **JavaScript Integration** | Well-supported (`amqplib`, `rascal`) | `kafkajs`, but more complex | Basic integration |
| **Message Ordering** | Not guaranteed | Guaranteed | Not guaranteed |
| **Message Retention** | Limited (queue-based) | Yes (log retention) | No event retention |
| **Learning Curve** | High for beginners | Complex (steeper curve) | High |

## Recommendation: RabbitMQ for our POC

Given its ease of use, excellent integration with JavaScript, and capability to handle events in medium-sized applications, **RabbitMQ** is the most suitable option for our POC.