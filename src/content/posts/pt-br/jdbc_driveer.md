JDBC, DRIVERS & DATA CONNECTIVITY — STUDY SUMMARY
====================================================


1. WHAT IS A DRIVER?
--------------------
A driver is a translator. It sits between your application and a specific
system (database, hardware, cloud storage) and translates between two worlds:

  - Left side: a standard interface your app always talks to (e.g. JDBC)
  - Right side: the private protocol of the specific system (e.g. Postgres wire protocol)

Without a driver, your app has no idea how to open a connection, authenticate,
send queries, or parse responses from a database.

The same concept applies beyond databases:
  - GPU drivers translate OS calls to GPU hardware instructions
  - Cloud storage drivers (s3a, gs) translate file system calls to S3/GCS APIs
  - Printer drivers translate print jobs to printer-specific commands


2. WHAT IS JDBC?
----------------
JDBC (Java Database Connectivity) is a standard interface introduced in 1997
for Java/JVM applications to connect to databases.

It is NOT a driver itself — it is a specification. It defines what methods
your app can call (getConnection, executeQuery, etc.) without caring which
database is underneath.

Every major database ships a JDBC driver: a .jar file that implements the
JDBC standard on one side and speaks that database's wire protocol on the other.

The JDBC connection string format:
  jdbc:<database>://<host>:<port>/<dbname>

Examples:
  jdbc:postgresql://localhost:5432/mydb
  jdbc:mysql://localhost:3306/mydb
  jdbc:starrocks://host:9030/mydb

The prefix (postgresql, mysql, starrocks) tells the JDBC framework which
driver to load — the same idea as a URL scheme.


3. THE POSTGRESQL JDBC DRIVER (.jar FILE)
-----------------------------------------
The driver is a single .jar file (e.g. org.postgresql.Driver) that:
  - Implements the JDBC standard interface (left side)
  - Knows the Postgres wire protocol, auth handshake, binary format (right side)

You saw this in DBeaver's "Edit Driver" screen:
  - Class Name:    org.postgresql.Driver       <- the Java class inside the .jar
  - URL Template:  jdbc:postgresql://{host}:{port}/{database}  <- the connection string template
  - Default Port:  5432
  - Website:       https://jdbc.postgresql.org <- where the .jar comes from

When you connect DBeaver to a Docker Compose Postgres, you are using JDBC.
You just never noticed because DBeaver builds the connection string for you
from the form fields you fill in.


4. JDBC vs JPA vs HIBERNATE
----------------------------
These are different layers stacked on top of each other:

  Your app code
       ↓
  JPA (Java Persistence API)      <- specification only, no real code
       ↓
  Hibernate                       <- implements JPA, translates objects to SQL
       ↓
  JDBC                            <- sends raw SQL over the wire
       ↓
  JDBC driver (.jar)              <- speaks the database wire protocol
       ↓
  Database

JDBC is always at the bottom. JPA and Hibernate are convenience layers on top
that spare you from writing raw SQL and managing connections manually.
In data engineering (Spark, Kafka, bulk ETL) you work closer to raw JDBC.
In backend application development you typically use JPA + Hibernate.


5. JDBC vs OTHER DRIVER STANDARDS
-----------------------------------
JDBC is not the only standard. Each ecosystem has its own:

  Ecosystem       Standard          Example driver
  -----------     --------          --------------
  Java / JVM      JDBC              org.postgresql.Driver
  Python          DB-API 2.0        psycopg2 (Postgres), pymysql (MySQL)
  .NET / C#       ADO.NET           Npgsql
  Go              database/sql      lib/pq, pgx
  Node.js         (no formal std)   pg, mysql2
  OS-level        ODBC              various

SQLAlchemy (Python) is an abstraction layer on top of DB-API drivers,
the same way JPA sits on top of JDBC.


6. JDBC vs ODBC
----------------
JDBC and ODBC solve the same problem but for different ecosystems:

  JDBC:
    - JVM / Java world
    - Used by Spark, Kafka, DBeaver, Airflow, CloudBeaver
    - Dominant in the modern data engineering stack

  ODBC:
    - OS-level, historically Windows-heavy
    - Used by Excel, Tableau, Power BI, legacy enterprise tools
    - Broader reach into legacy and mainframe systems

Neither is "better" — each belongs in its native ecosystem.
ODBC is not inherently slower. It feels slower only when Java apps
use a JDBC-ODBC Bridge (extra translation layer), which is why
Sun deprecated that bridge in Java 8.


7. WHEN NOT TO USE JDBC
------------------------
JDBC is wrong when:

  Scenario                        Use instead
  --------                        -----------
  Real-time event streaming       Kafka Consumer API, Flink sources
  SaaS / REST API sources         HTTP client, Airbyte connector
  Bulk loading into warehouse     Native bulk load (StarRocks Stream Load,
                                  Snowflake COPY INTO, BigQuery Storage Write)
  Document databases (MongoDB)    Native MongoDB driver
  Graph databases (Neo4j)         Cypher / Gremlin native drivers
  Non-JVM stack                   DB-API (Python), ADO.NET (.NET), database/sql (Go)

Key rule: use JDBC for extracting data from relational databases in the JVM
stack. Use native protocols for bulk loading at scale.


8. CLOUD STORAGE DRIVERS
--------------------------
The same driver concept applies to cloud object storage.
Spark and other JVM tools use storage drivers identified by path prefix:

  s3a://bucket/file.parquet    -> hadoop-aws .jar  -> AWS S3 REST API
  gs://bucket/file.parquet     -> gcs-connector .jar -> GCS REST API
  wasbs://bucket/file.parquet  -> hadoop-azure .jar -> Azure Blob REST API
  hdfs://namenode/file         -> HDFS driver       -> Hadoop HDFS protocol

Your Spark code stays identical — only the prefix and driver change.
The driver also handles auth (IAM roles, service accounts), multipart
uploads, retry logic, and consistency guarantees.


9. DRIVER PERFORMANCE & TUNING
--------------------------------
The driver sits in the critical path of every query — every byte in and
out goes through it. Driver choice and configuration are real performance levers.

Key performance factors:

  a) FETCH SIZE
     How many rows the driver pulls per network roundtrip.
     Default in Postgres JDBC: 0 (loads everything at once — dangerous).
     Tuned: 5,000–10,000 rows per fetch.

     // requires autoCommit=false in Postgres for true streaming
     conn.setAutoCommit(false);
     stmt.setFetchSize(10000);

     OOM risk: fetch size too large loads too much into JVM heap.
     Safe range: 1,000–10,000 for raw JDBC, 10,000–50,000 per executor in Spark.

  b) CONNECTION POOLING
     Opening a raw JDBC connection costs ~100–200ms (TCP handshake + auth).
     A pool (HikariCP is the standard) keeps connections warm: ~1ms reuse.
     Never use raw DriverManager.getConnection() in production.

  c) BINARY vs TEXT PROTOCOL
     Text mode: integer 123456789 travels as the string "123456789" (9 bytes).
     Binary mode: same integer travels as 4 bytes.
     Postgres JDBC uses binary automatically for prepared statements.

  d) SSL OVERHEAD
     Encryption adds CPU cost. Inside a trusted cluster you can disable it.
     Controlled via connection string: ?sslmode=disable

  e) DRIVER VERSION
     Newer driver versions have better memory management, prepared statement
     caching, and result set parsing. Upgrading the .jar is a free performance win.

  f) SPARK-SPECIFIC: PARTITIONING
     Spark JDBC reads are single-partition by default (one executor reads everything).
     Fix: partition by a numeric column across multiple executors.

     df = spark.read.jdbc(
         url=url,
         table="orders",
         column="id",
         lowerBound=1,
         upperBound=10000000,
         numPartitions=20,
         properties={"fetchsize": "10000", "driver": "org.postgresql.Driver"}
     )


10. THE PARTNER PROFILE CONTEXT (PROMPTLY)
-------------------------------------------
For the on-prem / partner-managed cloud profile:

  Infrastructure stack:
    - On-prem or partner-managed cloud   <- partner owns the hardware
    - Kubernetes via Talos OS + Omni     <- hardened, API-managed cluster
    - StarRocks (already deployed)       <- analytical MPP database
    - Source database (JDBC-reachable)   <- existing operational DB (Postgres, MySQL, etc.)
    - Promptly                           <- deployed into the cluster, connects to both DBs

  Responsibility split for JDBC connectivity:

    SRE / Infra team:
      - Open network port from Promptly pods to source DB
      - Configure NetworkPolicy / firewall rules
      - Create read-only DB user for Promptly
      - Store JDBC URL + credentials as a Kubernetes Secret

    App / Data platform team:
      - JDBC driver is bundled inside Promptly's container image
      - Configure the connection string
      - Write query logic and ingestion pipelines
      - Pull from source DB via JDBC, push to StarRocks for analytics

  For bulk loads INTO StarRocks: use StarRocks Stream Load API, not JDBC inserts.
  JDBC is for extracting from the source. Native protocol is for loading at scale.


KEY MENTAL MODEL
----------------
Standard interface  →  driver  →  specific system

  JDBC              →  .jar    →  Postgres wire protocol
  JDBC              →  .jar    →  StarRocks protocol
  DB-API            →  psycopg2 -> Postgres wire protocol
  s3a://            →  .jar    →  AWS S3 REST API
  OS file API       →  driver  →  NTFS on disk
  OS network API    →  driver  →  WiFi card hardware

A driver is any translator between a standard interface and a specific
private implementation. Database drivers are just the most common example
you encounter as a data engineer.