---
title: ACID Properties in Databases
tags:
  - acid
  - transactions
  - databases
---

- Video Link: [(57) ACID Properties in Databases With Examples](https://www.youtube.com/watch?v=GAe5oB742dw)

## Atomicity

- All or nothing
- Especially useful for transactions that have several parts
- If any part fails, the whole thing gets rolled back like nothing happened
- Implemented using a log

## Consistency

- Preserving database invariants
- Any constraints must be preserved
- Database automatically checks these
- Example rule:
  - Account balance can't go negative
  - If a transaction attempts to modify an account balance to be negative, the database will raise a consistency violation

## Isolation

- In an environment where many transactions are executing at once, the database ensures that any intermediate changes of one transaction don't interfere with others
- It should appear as if each transaction is running completely in isolation
- Highest isolation level is serializable, but can be slow at times
- Violations of isolation
  - Dirty read: A transaction reads data resulting from another transaction that hasn't been committed yet. If the other transaction fails, the read is invalid
  - Non-repeatable read: Two reads showing different values because a transaction committed between them.
  - Phantom Reads: Query has different results because a transaction committed
- There are other levels of isolation, but these can lead to inconsistency
  - Read committed: A transaction can only read data that's been committed
    - Prevents dirty reads
    - Susceptible to non-repeatable reads and phantom reads though
  - Repeatable: Gives each transaction a consistent snapshot of the data
    - Prevents dirty reads, non-repeatable reads
    - Susceptible to phantom reads though

## Durability

- Each committed transaction is permanent, even if the database crashes
- Implemented using write-ahead logging
- In distributed databases, durability also implies replicating data across multiple nodes
