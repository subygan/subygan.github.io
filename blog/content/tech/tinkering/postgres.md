---
emoji: 🦤
title: postgres
description: notes from working on postgres
date: 2025-08-10
layout: base
tags: ["tech", "programming"]
---

Often in postgres, there are some unique stuff that is there for postgres which slows stuff down or speeds up the query.

Although 99% of the time I'm using an ORM to interface with the database. having an understanding of what's happening under the hood helps tune it to the requirement.

These are non exhaustive list of things that I've faced, fixed and noted.


## taking a db dump

### download table as csv

not recommended unless you're going to run analytics on a table. use the defaul dump instead.

```sql
COPY (select "id","url","type","promptTemplateId","createdAt", "updatedAt","rank" FROM table_name)  TO 'table_name.csv' 
```

### load csv on table

```sql
copy table_name  FROM '/Users/surya/code/preview_images.csv' WITH (FORMAT CSV);
```


That's a great start for a blog post! Here are 15 more examples of practical PostgreSQL wisdom, focusing on nuanced details and common real-world scenarios:

---

## efficiently counting rows (fast counts)

When you need a quick estimate of the number of rows in a large table, `COUNT(*)` can be slow. For approximate counts, especially if your table is frequently updated, `pg_class` can be much faster.

```sql
-- Slower, accurate count for all rows
SELECT COUNT(*) FROM your_table;

-- Faster, approximate count (useful for large tables)
SELECT reltuples::bigint FROM pg_class WHERE relname = 'your_table';
```

**Nuance:** `reltuples` is updated by `VACUUM`, `ANALYZE`, and DML operations, but it's not always perfectly up-to-date. It's a statistic, not a real-time count. Use it when "close enough" is acceptable.

## understanding `NULL` in `ORDER BY`

The default behavior for `NULL`s in `ORDER BY` clauses can sometimes be surprising.

```sql
-- NULLs appear last by default for ASC
SELECT column_name FROM your_table ORDER BY column_name ASC;

-- NULLs appear first by default for DESC
SELECT column_name FROM your_table ORDER BY column_name DESC;

-- Explicitly place NULLs first (e.g., for ASC order)
SELECT column_name FROM your_table ORDER BY column_name ASC NULLS FIRST;

-- Explicitly place NULLs last (e.g., for DESC order)
SELECT column_name FROM your_table ORDER BY column_name DESC NULLS LAST;
```

**Nuance:** Always be explicit with `NULLS FIRST` or `NULLS LAST` if the precise ordering of `NULL` values matters for your application logic.

## using `EXPLAIN ANALYZE` for query optimization

`EXPLAIN ANALYZE` is your best friend for understanding how a query executes and identifying performance bottlenecks.

```sql
EXPLAIN ANALYZE SELECT * FROM large_table WHERE some_column = 'value';
```

**Nuance:** `EXPLAIN` shows the *planned* execution, while `EXPLAIN ANALYZE` actually *runs* the query and shows actual timings and row counts. Always use `ANALYZE` for real performance insights. Run it on a production-like dataset, but be aware it executes the query. For updates or inserts, consider `EXPLAIN (ANALYZE, VERBOSE, BUFFERS)`.

## adding columns with a default value (without table rewrite)

Adding a new column to a large table can be slow if you specify a `DEFAULT` that requires updating all existing rows.

```sql
-- SLOW for large tables: Adds column and updates all rows with default
ALTER TABLE your_table ADD COLUMN new_column TEXT DEFAULT 'default_value';

-- FAST for large tables: Adds column without default, then sets default, then updates (or not)
ALTER TABLE your_table ADD COLUMN new_column TEXT;
ALTER TABLE your_table ALTER COLUMN new_column SET DEFAULT 'default_value';
-- Optional: Update existing rows in batches later if needed, or leave them NULL
-- UPDATE your_table SET new_column = 'default_value' WHERE new_column IS NULL;
```

**Nuance:** Adding a `NOT NULL` column with a default *always* requires a table rewrite. If you can allow `NULL` temporarily, you can add the column instantly, then set a default, and finally backfill `NULL`s in batches.

## understanding `VACUUM` and `VACUUM FULL`

`VACUUM` reclaims space from dead tuples, but `VACUUM FULL` rewrites the entire table.

```sql
-- Standard VACUUM: Reclaims space, allows other operations during execution
VACUUM your_table;
VACUUM ANALYZE your_table; -- Reclaims space and updates statistics

-- VACUUM FULL: Rewrites table, acquires exclusive lock, much slower
VACUUM FULL your_table;
```

**Nuance:** Rarely use `VACUUM FULL` on production databases. It acquires an exclusive lock, preventing all other operations on the table. Regular `VACUUM` or `autovacuum` is usually sufficient. `VACUUM FULL` is typically reserved for extreme bloat situations or for maintenance on small, non-critical tables.

## using `CTE`s (common table expressions) for readability and recursion

CTEs improve query readability and are essential for recursive queries.

```sql
WITH regional_sales AS (
    SELECT region, SUM(amount) AS total_sales
    FROM orders
    GROUP BY region
), top_regions AS (
    SELECT region
    FROM regional_sales
    WHERE total_sales > (SELECT SUM(total_sales) / 5 FROM regional_sales)
)
SELECT region, product, SUM(quantity) AS product_units
FROM orders
WHERE region IN (SELECT region FROM top_regions)
GROUP BY region, product;
```

**Nuance:** CTEs (the `WITH` clause) in PostgreSQL are generally *optimization fences*—the optimizer materializes their results. This can be good for complex logic but can sometimes prevent optimizations if the CTE output is small and filtered further. For simple, non-recursive subqueries, a subquery might perform better.

## handling timezones (best practices)

Always store timestamps with timezone information.

```sql
-- Correct: Stores timestamp with timezone (recommended)
CREATE TABLE events (
    event_name TEXT,
    event_time TIMESTAMPTZ -- or TIMESTAMP WITH TIME ZONE
);

-- Incorrect (usually): Stores timestamp without timezone
CREATE TABLE events_bad (
    event_name TEXT,
    event_time TIMESTAMP -- or TIMESTAMP WITHOUT TIME ZONE
);

-- Inserting and retrieving
INSERT INTO events (event_name, event_time) VALUES ('Meeting', '2023-10-27 10:00:00 PST');
INSERT INTO events (event_name, event_time) VALUES ('Meeting', '2023-10-27 10:00:00 -08:00');

-- PostgreSQL converts to UTC internally. When retrieved, it converts to session timezone.
SELECT event_name, event_time FROM events;
-- To see in a specific timezone:
SELECT event_name, event_time AT TIME ZONE 'America/Los_Angeles' FROM events;
SELECT event_name, event_time AT TIME ZONE 'UTC' FROM events;
```

**Nuance:** PostgreSQL stores `TIMESTAMPTZ` values in UTC internally. When you select them, they are converted to the current `TIMEZONE` setting of your database session. Always specify the timezone when inserting or ensure your client connection handles it correctly. This avoids ambiguity and simplifies global applications.

## using `pg_stat_statements` for query performance monitoring

Enable `pg_stat_statements` to track query execution statistics.

```sql
-- In postgresql.conf:
-- shared_preload_libraries = 'pg_stat_statements'
-- pg_stat_statements.track = all

-- After enabling and restarting:
CREATE EXTENSION pg_stat_statements;

-- View top queries by total execution time
SELECT query, calls, total_time, mean_time, stddev_time, rows, 
       100.0 * shared_blks_hit / (shared_blks_hit + shared_blks_read + 1) AS hit_percent
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;
```

**Nuance:** `pg_stat_statements` aggregates identical queries (after normalizing parameters), providing invaluable data on which queries are most expensive, how often they run, and their average/total execution times. Regularly monitor this view to identify slow queries.

## choosing the right index type (b-tree vs. others)

B-Tree is the default and most common index type, but others exist.

```sql
-- Default B-Tree index (good for equality and range queries)
CREATE INDEX idx_user_email ON users (email);

-- GIN index (for JSONB, arrays, text search)
CREATE INDEX idx_doc_data ON documents USING GIN (data jsonb_path_ops);

-- BRIN index (for highly ordered data, e.g., timestamp on append-only table)
CREATE INDEX idx_log_time ON logs USING BRIN (timestamp_column);
```

**Nuance:** B-Tree indexes are excellent for most use cases. GIN indexes are crucial for indexing complex data types like `JSONB` or `TEXT` for full-text search. BRIN indexes are block-range indexes, incredibly small and fast for tables where data is physically ordered on disk (e.g., a `created_at` column in an append-only log table).

## partitioning large tables (declarative partitioning)

Partitioning helps manage large tables by splitting them into smaller, more manageable pieces.

```sql
-- Create a partitioned table
CREATE TABLE measurements (
    city_id         int not null,
    logdate         date not null,
    peaktemp        int,
    unitsales       int
) PARTITION BY RANGE (logdate);

-- Create partitions
CREATE TABLE measurements_y2023 PARTITION OF measurements
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE measurements_y2024 PARTITION OF measurements
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- You can also partition by LIST or HASH
-- PARTITION BY LIST (city_id)
-- PARTITION BY HASH (id)
```

**Nuance:** Partitioning can significantly improve performance for queries that only access a subset of the data (partition pruning), and make maintenance tasks like `VACUUM` and backups faster. However, it adds complexity, and queries that span many partitions can sometimes be slower. Choose partitioning keys wisely.

## using `LISTEN`/`NOTIFY` for asynchronous messaging

PostgreSQL can act as a lightweight message broker.

```sql
-- Session 1: Listen for notifications
LISTEN my_channel;
-- After this, it will block until a notification is received.
-- In a client application, you'd usually poll for notifications.

-- Session 2: Send a notification
NOTIFY my_channel, '{"user_id": 123, "action": "created_post"}';
```

**Nuance:** `LISTEN`/`NOTIFY` is great for simple, low-volume, in-database eventing (e.g., invalidating a cache, triggering a background job). It's not a replacement for full-featured message queues (like RabbitMQ or Kafka) due to its synchronous nature (client must be connected and listening) and lack of persistence for unreceived messages.

## creating a read-only user

A critical security measure is to create users with minimal necessary privileges.

```sql
-- Create a new user
CREATE USER readonly_user WITH PASSWORD 'strongpassword';

-- Grant connection privilege
GRANT CONNECT ON DATABASE your_database TO readonly_user;

-- Grant usage on schema (e.g., public schema)
GRANT USAGE ON SCHEMA public TO readonly_user;

-- Grant select on all current tables in the schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;

-- Grant select on any future tables created in the schema
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readonly_user;
```

**Nuance:** Always apply the principle of least privilege. Use `REVOKE` to remove unnecessary permissions. For `ALTER DEFAULT PRIVILEGES`, remember it only applies to objects created *after* the command is issued. You'll need to grant permissions on existing objects separately.

## using `UPSERT` (insert ... on conflict)

Efficiently insert or update rows based on a unique constraint.

```sql
-- Insert a new user, or update if email already exists
INSERT INTO users (email, username, password_hash)
VALUES ('test@example.com', 'testuser', 'hashed_pass')
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    password_hash = EXCLUDED.password_hash,
    updated_at = NOW();

-- Insert a new user, or do nothing if email already exists
INSERT INTO users (email, username, password_hash)
VALUES ('another@example.com', 'anotheruser', 'hashed_pass_2')
ON CONFLICT (email) DO NOTHING;
```

**Nuance:** `ON CONFLICT` requires a unique constraint (or primary key) to detect the conflict. `EXCLUDED` refers to the row that *would have been inserted* if there were no conflict, allowing you to use its values in the `DO UPDATE SET` clause. This is atomic and prevents race conditions that separate `SELECT` then `INSERT/UPDATE` logic might have.

## skipping locked rows (`SKIP LOCKED`)

For worker queues, this allows multiple workers to process items concurrently without deadlocks.

```sql
-- Worker 1:
BEGIN;
SELECT * FROM job_queue WHERE status = 'pending' FOR UPDATE SKIP LOCKED LIMIT 1;
-- Process job...
UPDATE job_queue SET status = 'processing' WHERE id = <job_id>;
COMMIT;

-- Worker 2: Simultaneously...
BEGIN;
SELECT * FROM job_queue WHERE status = 'pending' FOR UPDATE SKIP LOCKED LIMIT 1;
-- If Worker 1 got the only pending job, Worker 2's SELECT will return no rows.
COMMIT;
```

**Nuance:** `SKIP LOCKED` is fantastic for scenarios where you have multiple consumers trying to grab items from a queue. It makes the `FOR UPDATE` (or `FOR SHARE`) non-blocking for rows that are already locked by other transactions. This avoids workers waiting for each other and potentially deadlocking.

## using `WITH RECURSIVE` for hierarchical data

Navigating tree-like structures (org charts, categories, comments with replies) is a perfect use case.

```sql
WITH RECURSIVE subordinates AS (
    SELECT id, name, manager_id
    FROM employees
    WHERE id = 123 -- Start with a specific employee
  UNION ALL
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;
```

**Nuance:** `WITH RECURSIVE` requires a `UNION` or `UNION ALL`. The first part (the "anchor member") provides the initial rows. The second part (the "recursive member") refers to the CTE itself to generate subsequent rows until no new rows are produced. Be careful to avoid infinite loops in your join conditions.

## using `pg_dump` and `pg_restore` with `--jobs` for parallel dumps/restores

Speed up large database operations.

```bash
# Parallel dump (using 4 jobs)
pg_dump -Fc -j 4 -f my_database.dump my_database

# Parallel restore (using 4 jobs)
pg_restore -j 4 -d my_database my_database.dump
```

**Nuance:** The `--jobs` (or `-j`) option allows `pg_dump` and `pg_restore` to use multiple concurrent jobs (processes) to dump or restore data. This can significantly reduce the time for large databases, especially when dealing with many tables or a powerful server. Ensure you have enough CPU cores and I/O bandwidth to benefit from parallelism.