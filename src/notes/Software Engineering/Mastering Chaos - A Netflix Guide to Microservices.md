---
title: Mastering Chaos - A Netflix Guide to Microservices
tags:
  - microservices
  - architecture
---

[Video Link](https://www.youtube.com/watch?v=CZ3wIuvmHeM)

## Problems with Monolithic Architecture

- Difficult debugging - hard to track down which changes cause problems
- Outages in one place affect the _whole_ system
- Microservices emerged as a response to this

## Qualities of Microservices

- Provide excellent separation of concerns, encapsulation, and abstraction
- Scale well; each service can scale independently
- Netflix is almost entirely on AWS 🤯
- As a microservice grows, it becomes an abstraction for:
  - Some storage solution
  - The main logic for that service
  - Caching
  - Interaction with the service via client libraries (Netflix does this)
- This stems from complexity requirements. Depending on the product, a service might need to rely on storage/caching solutions to fulfill its responsibilities. It's important to recognize this underlying structure of many microservices, as it's still a fundamental part of the microservice itself.

## Intra-Service Communication

- Intra-service calls are inherently risky, as they can impact the request a given service is trying to fulfill
- Cascading failures are a reality too. The dependencies of a failing service can fail too if proper safeguards are introduced.
- Netflix's strategy to handle failing services:
  - Developed a framework called **Hystrix**
  - Manages retries, timeouts, fallbacks, etc.
  - "Fail Fast"
- Fault Injection Testing
  - Like the name implies, purposefully inject a fault into the system and see how it reacts
  - Can put it under load too
  - Try different call paths, mock out dependencies
- Critical Microservices
  - Yearly downtime compounds with the number of services
  - Important to identify that the core services of the app can run without their dependencies
  - Reduces the amount of testing needed, less permutations to try
- Why client libraries for microservices?
  - Avoid repeated code
  - Main problems: More dependencies (the ones needed to make the client library itself), heap consumption/garbage collection

## Persistence

- CAP Theorem!!
- Netflix adopted eventual consistency with Cassandra. Eventual consistency makes sense here because, at Netflix, there's not a ubiquitous need for a particular user's data to be read from all the way across the world (unlike social platforms). What's important is that a user can see the changes they've immediately made.
  - You can use a combination of IP/Geo hashing + caching to ensure users can see any writes they've made, even if those aren't fully reflected in all databases

## Scale

### Stateless Services

- No persistent data storage, barring accessing basic metadata
- Don't have to worry about losing deployed nodes, recovery is generally pretty fast
- Auto-scaling!!

### Stateful Services

- Databases & caches
- Loss of nodes is more significant here, as you lose the state associated with those nodes
- Redundancy is key here
- Uses a sharded cache strategy where multiple copies of data are written out to mulitple nodes (EVCache)
  - Stored across availability zones too, resilience against availability zones going down

### Hybrid Service

- Netflix's subscriber service has excessive load and leaned on EVCache too much
- Some problems though:
  - Cache was being hit multiple times throughout the course of a single request. **Solution**: Request-level caching
  - Batch and real-time were using the same set of caches. **Solution**: separate caches for real-time and batch
  - Secure token fallback: Embed some token within a request to the subscriber service containing enough information to work with in case the subscriber service goes down (pretty clever)
    - Relates to Netflix's whole idea of failing fast and having good fallbacks

## Variance

- Refers to the idea of variety within a company's architecture

### Operational Drift

- Unintentional drift
- Refers to handling failing services, deteriorating throughput
- Implementing best practices across microservices - works initially but over time can be hard to adopt consistently
- **Netflix's solution**: Continuous learning and automation
  - The learning aspect of this is learning from some sort of problem, developing a solution, analyzing the problem, and preventing it in the future. This results in a new "best practice"
  - The automation aspect is ensuring these best practices are easy to implement/validate in a given microservice. Netflix has tools for this internally.

### Polyglot

- Intentional choices to introduce new technologies
- Netflix's API service was overloaded in the sense that it was solely responsible for a large number of endpoints
  - Pretty much led to another monolith
  - Netflix resolved by creating smaller NodeJS containers and had those route into the main API gateway
  - Goal was separation of concerns
- Main downsides
  - Node management is more difficult
  - Productivity tooling
  - Learning curve
- Netflix is built with Java, and all centralized/critical services were designed with JVM support in mind. With the introduction of Node/docker in their architecture, the teams maintaining centralized services have a decision to make regarding how much support they provide the non-JVM services. Netflix came to the following conclusion:
  - Emphasize costs, reusability
  - Limit support of centralized services
  - Prioritize by impact too

## Velocity with Confidence

- Integrate best practices automatically. Serves to combat operational drift and ensures every deployment adheres to best practices
- Some tests Netflix runs automatically
  - Conformity checks
    - Red/black pipelines.
    - Automated canaries
    - Staged deployments (SWECC uses this for zero downtime deployment)
    - Squeeze tests: another form of stress testing a service.

**Conway's Law**: The design of the systems of organizations reflect the internal structure of those organizations

**Red-Black Deployment**: A strategy for deployment in which new changes are deployed to a black environment that isn't live yet. After testing in the black environment, you switch traffic from red to black via a load balancer.

**Canaries**: Roll changes out to a small set of users to scan for any potential issues. Route a small portion to the canary, collect logs

## Summary

- Think about microservices as complex and organic
- Handling dependencies:
  - Circuit breakers, fallbacks, chaos
  - Simple clients
  - Eventual consistency
  - Multi-region failover
- Scale
  - Auto-scaling
  - Redundancy
  - Partitioned workloads
  - Failure-driven design (need to look more into)
  - Chaos under load
- Variance
  - Embrace automation in eng ops
  - Understand the cost of variance
  - Prioritize support by impact
- Change
  - Automated deployment and integration of best practices
- Be solutions oriented
