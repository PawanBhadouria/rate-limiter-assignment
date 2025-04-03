# Rate Limiter with Kafka and Redis

## Introduction
This project implements a **rate limiter** using Redis and Kafka for logging excessive API requests. It is fully containerized using Docker and Docker Compose. The objective is to efficiently control API request rates and log violations for monitoring.

---

## Getting Started
### Installation Process
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd Rate-Limiter
   ```
2. Start the services (Node.js, Redis, Kafka, Zookeeper):
   ```sh
   docker-compose up -d
   ```

### Software Dependencies
- **Node.js** (v18+)
- **Docker & Docker Compose**
- **Redis** (for caching requests)
- **Kafka & Zookeeper** (for logging excessive requests)

### Latest Releases
- **v1.0.0**: Initial release with Redis-based rate limiter and Kafka logging.

### API Reference
#### **1️⃣ API Endpoint**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/e-commerce/api/v1/login` | Generate Token  |
| GET | `/e-commerce/api/v1/items/list` | Getting List of items (Rate-limited) |

#### **2️⃣ Example Request**

```sh
curl --location 'http://localhost:3000/e-commerce/api/v1/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: connect.sid=s%3AFxjjphvgmUT4sYf11u8kBu3Le2mG_nZP.dcCHEamBIUUjmjSyBkGFPV9SwKzd4mmH%2BxFWca%2FP0YI' \
--data '{
    "username":"Pawan.bhadouria",
    "requestId":"12345"
}'
```

```sh
curl --location 'http://localhost:3000/e-commerce/api/v1/items/list' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhd2FuLmJoYWRvdXJpYSIsInJlcXVlc3RJZCI6IjEyMzQ1IiwiaWF0IjoxNzQzNjgzMDg0LCJleHAiOjE3NDM3Njk0ODR9.grykp7zcYrBPsbZmCtPqhErOmp_EGgsRxj94C_sUinGvzJMRtEbJ3WUat4tWYBmse2LDOhXaPrkPsvXH2QgN83XC1G0zRAjGB3vAAzZQJJZ-ATsMLfHW6-B1eAwbmBTaa-MdC_fomHUEQPHtox9ph2z8x3XNTZ9kSRMH0IVahg--oEGJe12OpguthhKvr9x6XDZA02FJnZOxkhX_LHTOXjRgY15FfcP46n0G2NhJmsJ0mVY4utEYJki8kKxZIgvBNHMKZYAlBbE7ISUDdIBZOnrRYL9JGgb9EwW9S_8ve0d7XyLUXnOgNVyxSbp5qgQym-ndRun57ZbXDzR5UHg4gA' \
--header 'Cookie: connect.sid=s%3AFxjjphvgmUT4sYf11u8kBu3Le2mG_nZP.dcCHEamBIUUjmjSyBkGFPV9SwKzd4mmH%2BxFWca%2FP0YI''
```


#### **3️⃣ Response (If within limit)**
```json
{"status":200,"message":"Success","data":{"itemsList":["item1","item2","item3"]}}
```
#### **4️⃣ Response (If rate limit exceeded)**
```json
{"status":429,"message":"Too Many Request","error":{}}
```

---

## Build and Test
### **Building the Project**
To build the project, use:
```sh
docker-compose up -d --build
```

### **Running the Tests**
Currently, testing is done manually using **cURL** or **Postman**.
.

### **Checking Kafka Logs**
To monitor rate limit violations logged to Kafka:
```sh
docker exec -it kafka_broker bash -c "kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic rate-limiter-logs --from-beginning"
```

---

## Stopping the Services
To stop and remove containers:
```sh
docker-compose down
```

---

### **Enjoy coding! 🚀**
