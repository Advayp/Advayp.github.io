---
title: How the Apache Arrow Format Accelerates Query Result Transfer
tags:
  - arrow
  - serialization
  - columnar
  - zero-copy
  - streaming
  - performance
---
[Link to article](https://arrow.apache.org/blog/2025/01/10/arrow-result-transfer/)

A possible bottleneck in a system involving query results is the protocol used to transfer the results of a query. For larger queries, it's been shown that result transfer time accounts for a majority of the execution time of a query.

Three main steps to transfer the result of a query:
1. Serialize
2. Transmit over a network
3. Deserialize
Transmission used to be a bottleneck, but in modern times ser/de takes most of the time.

So, how does Arrow speed up ser/de?

## Arrow is columnar
- Values for each column are stored contagiously in memory, as opposed to the values of each row
- Most storage systems store data in columns as opposed to rows (as this is more beneficial for analysis), so Arrow respects this by having the data sent via columnar architecture anyway.
- Destinations are also typically columnar, so it makes sense to have everything be in a columnar format
- This avoids transposing the data from column to row format when serializing and back when deserializing.

## Arrow is self-describing and type-safe
- Data's structure is sent with the data itself. Allows receiver to properly deserialize.
- Format also enforces type safety, so the receiving end doesn't have to verify the types of the data (which can be an expensive operation)

## Arrow enables zero-copy
- **Zero-copy**: Transfer data over a network without creating any temporary copies
	- Implies that data looks the same on disk and while being transmitted
- Arrow uses columnar structures called record batches
- These can be held in memory, sent over a network, and remain on disk, which makes arrow more versatile
- No serialization/deserialization necessary if you have an existing arrow record in memory or on disk. You can just send it directly over the network.

## Arrow enables streaming
- Little chunks can be read/transmitted without waiting for the whole dataset.
- Arrow sends one or more record batches at a time

## Arrow is universal
- Has libraries in pretty much every language

## Performance Gains
- Apache Doris: 20-100x faster
- Google Big Query: 31x faster
- Dremio: 10x faster
- DuckDB: 38x faster
- Snowflake: 10x faster