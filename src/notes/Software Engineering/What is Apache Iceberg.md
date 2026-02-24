---
tags:
  - apache-iceberg
  - table-format
  - elt
  - etl
  - catalog
  - streaming
  - acid
  - data-lakes
  - data-warehouses
---
#apache-iceberg #table-format #elt #etl #catalog #streaming #acid #data-lakes #data-warehouses 

- Video Link: [(52) Apache Iceberg: What It Is and Why Everyone’s Talking About It.](https://www.youtube.com/watch?v=TsmhRZElPvM)

## Emergence
- Data warehouses with ETL batch processing. This had problems with scale though, and then gave rise to something called a data lake.
- A data lake is a distributed file system. The main difference between this and a data warehouse is that we transform later in data lakes. We kinda just take data from relational databases and "dump" it into the lake (ELT).
	- S3 buckets these days
- Enforcing a schema, people thought, would lead to scalability issues. But, removing a schema would still be problematic as you wouldn't be able to run queries effectively.
- The three things people were looking for that ultimately lead to the creation of iceberg
	- Schema
	- Consistency
	- ACID
- Some of these things were lost when going from data warehouses to data lakes, and iceberg emerged as a way of rectifying this.

## Iceberg's Architecture
- Iceberg at its core is an open table format
- Four layers of abstraction
	- **The data layer:** A bunch of parquet files. Some batch ingest process would just dump the data into these files. 
	- **The metadata layer**: A manifest file describing the parquet files in the data layer. Can and does often include information about the data contained within the parquet files, so that it's easier to run queries on it. We also maintain a manifest list that has a list of manifests. Each manifest list represents one table.
		- Metadata file: Has a notion of snapshots. Each snapshot points to a manifest list which points to manifests which points to the actual parquet files. This idea of snapshotting is useful for dealing with schema migrations. This addresses the *consistency* portion of the requirements.
		- In each metadata file or manifest list file, you can information about the *schema*, so that part is addressed here.
	- **Catalog**: Maps table names to metadata files

## Iceberg's Infra
- Iceberg is more so a specification, infra is up to you and Iceberg-compatible providers
- Can query with libraries
