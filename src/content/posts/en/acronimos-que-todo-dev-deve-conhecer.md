---
title: 'Acronyms every developer should know'
pubDate: 2026-03-14
description: 'A quick guide to the most commonly used acronyms in day-to-day software development.'
author: 'Robert Gleison'
image:
  url: '/acronimos-que-todo-dev-deve-conhecer/thumb_acronyms.png'
  alt: 'Diversas siglas técnicas de desenvolvimento de software organizadas em grupos.'
tags: ["Tips", "Software Engineering"]
---

## Table of Contents

- [Overview](#overview)
- [Business & Product](#business--product)
  - [MRR and ARR](#mrr-and-arr)
  - [KPI and OKR](#kpi-and-okr)
  - [ROI](#roi)
  - [SLA, SLO and SLI](#sla-slo-and-sli)
  - [MVP and POC](#mvp-and-poc)
- [Development Methodologies](#development-methodologies)
  - [SCRUM and KANBAN](#scrum-and-kanban)
  - [TDD](#tdd)
  - [BDD](#bdd)
  - [DDD](#ddd)
  - [CI/CD](#cicd)
- [Code Design Principles](#code-design-principles)
  - [SOLID](#solid)
  - [DRY](#dry)
  - [KISS](#kiss)
  - [YAGNI](#yagni)
- [Databases & APIs](#databases--apis)
  - [CRUD](#crud)
  - [REST](#rest)
  - [ORM and ODM](#orm-and-odm)
  - [ETL and ELT](#etl-and-elt)
  - [ACID](#acid)
  - [BASE](#base)
  - [CAP and PACELC](#cap-and-pacelc)
  - [ERD](#erd)
- [Architecture](#architecture)
  - [MVC](#mvc)
  - [ADR](#adr)
  - [BFF](#bff)
- [Frontend](#frontend)
  - [SPA](#spa)
  - [SSR](#ssr)
  - [SEO](#seo)
- [Infrastructure & Cloud](#infrastructure--cloud)
  - [SaaS, PaaS and IaaS](#saas-paas-and-iaas)
- [References](#references)

---

## Overview

I'm constantly bombarded with acronyms on tech social media profiles. Things like MRR, KPI, ROI seem increasingly close to developers, especially with the latest wave of building SaaS (another acronym) and generating extra income. On top of that, acronyms like TDD, DDD, SOLID have always been part of my studies but I sometimes need to review them — after all, who hasn't forgotten what the L in SOLID stands for. Based on that, I created this article that brings together the main terminologies in one place, organized by context.

This article do not enter in dept on each topic but once you heard of them you can read about in other places.

<br>

---

## Business & Product

Developers don't just stay in the code, especially in the age of AI agents. At some point you'll be in a meeting with product, the CEO, or investors, and these acronyms will come up.

### MRR and ARR

**MRR (Monthly Recurring Revenue)** is the monthly recurring revenue — how much the product predictably generates every month (subscriptions, monthly contracts, etc).

**ARR (Annual Recurring Revenue)** is the annualized MRR.


> MRR = sum of all recurring revenues in the month
>
> ARR = MRR × 12

<br>
If a SaaS has 500 customers paying $100/month, the MRR is $50,000 and the ARR is $600,000.


### KPI and OKR

**KPI (Key Performance Indicator)** is a metric used to measure the performance of something against a goal. KPIs are how we know whether a company is in good shape, whether users are happy. They're also a way to guide a company's next steps.

Examples:
- number of paying users
- bug resolution time
- churn rate
- satisfaction score

**OKR (Objectives and Key Results)** is a goal-setting framework. It's usually tied to a time period. In most companies I've worked at, OKRs were quarterly (every 3 months), but they can also be monthly, semi-annual, or annual. A company works toward achieving its established OKRs.

Examples:
- For next quarter, we want to reduce the onboarding time for new customers
- For next semester, we want to grow the number of partner companies from 5 to 10
- For next year, we want to grow the sales team by 50% and increase revenue by 10%

KPIs and OKRs can be linked. To know if an OKR was completed, you need KPIs — after all, how do you know if revenue grew by 10% without a KPI tracking it?


### ROI

**ROI (Return on Investment)** — simple in theory:

> ROI = (Gain - Cost) / Cost × 100%

<br>
An engineer spent 2 weeks optimizing a query that ran 10,000 times per day and cost $200/month in database expenses. After the optimization, the cost dropped to $20/month. In 3 months, it saved $540. The ROI of that work was positive.

Developers rarely calculate ROI formally, but thinking in these terms helps with prioritization: "Is it worth refactoring this now or is the impact too small?"

### SLA, SLO and SLI

These three always come up together and cause confusion.

**SLI (Service Level Indicator)** is the metric of the service itself — what you're measuring. E.g.: API latency, database availability, pipeline error rate, etc.

**SLO (Service Level Objective)** is the internal target for that SLI. E.g.: "99.9% availability per month" or "p95 latency below 150ms".

**SLA (Service Level Agreement)** is the contract with the customer. If the SLO isn't met, there can be penalties (discounts, credits, etc).

In short, an SLI is what you measure in a service, an SLO is an internal target, and an SLA is an agreement with the customer.

An example SLA:

> "The service will have 99.9% availability per month. If this target is not met, the customer will receive credits equivalent to 10% of the invoice value for each additional hour of downtime."

### MVP and POC

**MVP (Minimum Viable Product)** is the minimum version of a product with enough functionality to be used by real customers. It's not an incomplete product or just an idea — it's a product that meets customer needs and will receive updates in the future.

Worth sharing my opinion here: if your goal is to build a SaaS as a revenue stream, don't wait until the product is perfect to launch. Ship an MVP and keep iterating — your MVP can already have paying subscribers even without future planned features.

**POC (Proof of Concept)** is a technical demonstration to validate whether something is feasible. It doesn't need real data, to look good, or to have tests. The goal is to answer: "does this work?". A POC helps explain concepts or provides an implementation guide.

The difference: a POC validates technical feasibility, an MVP validates the market. A POC never goes to production (or shouldn't). An MVP does.

<br>

---

## Development Methodologies

### SCRUM and KANBAN

**SCRUM** is an agile framework based on sprints — short, fixed cycles (usually 1-2 weeks) with defined ceremonies: planning meetings, daily standups (for updates and unblocking questions), reviews, and retrospectives. It has well-defined roles: Product Owner, Scrum Master, Dev Team.

**KANBAN** is a visual workflow management system with a board of columns such as: To Do, Done, In Progress, QA. Based on these columns, developers manage their work. To Do is your not-yet-started tasks, In Progress is what's being developed, QA is what's being validated, and Done is what's finished. Custom columns can exist too.

In practice, many teams use a hybrid called **Scrumban** — SCRUM's sprints combined with KANBAN's visual board and WIP limits.

### TDD

**TDD (Test-Driven Development)** is a development practice where you write the test **before** the code.
Example:
```python
# 1. Create a test with the expected return value
def test_calcular_desconto():
    assert calcular_desconto(100, 10) == 90
    assert calcular_desconto(200, 50) == 100
    assert calcular_desconto(100, 0) == 100

# 2. Implement the code after the test
def calcular_desconto(preco: float, percentual: float) -> float:
    return preco - (preco * percentual / 100)

# 3. Refactor the code with test coverage in place
def calcular_desconto(preco: float, percentual: float) -> float:
    if not 0 <= percentual <= 100:
        raise ValueError("Percentual deve estar entre 0 e 100")
    return preco * (1 - percentual / 100)
```
<br>
TDD isn't about having tests — it's about letting tests drive the design of the code. When you write the test first, you think about the goal before the implementation.
<br>
A practical example in the data engineering world: before writing a complex SQL query, create a test with the expected result. This way you avoid bugs in code, macros, and joins on critical tables.



### BDD

**BDD (Behavior-Driven Development)** is an extension of TDD focused on the behavior of the system from the user's perspective. It uses natural language (Given/When/Then) to describe scenarios.

```gherkin
# Scenario written in Gherkin (BDD language)
Feature: Discount for premium customers

  Scenario: Premium customer receives 20% discount
    Given a customer with a premium plan
    When they add a $100 product to the cart
    Then the total should be $80

  Scenario: Regular customer receives no discount
    Given a customer without a premium plan
    When they add a $100 product to the cart
    Then the total should be $100
```
<br>
The big value of BDD is that product managers and stakeholders can read and validate the scenarios without understanding code. Frameworks like Cucumber (Java/Ruby), Behave (Python), or SpecFlow (.NET) turn these scenarios into executable tests.

In other words, BDD means writing tests in human language based on how a human behaves.

### DDD

**DDD (Domain-Driven Design)** is a software design approach that organizes code around the business domain — not around the technology.
It's a difficult concept to explain and could easily fill its own article (so I won't go deep here). Even after reading the reference books, I still felt a bit confused, but at a high level:

The core concepts:

- **Ubiquitous Language:** a common language shared by developers and domain experts. The code uses the same terms the business uses. If the business calls a sale an "order", the code needs to name that resource "order" — not something like "transaction" or "request". This is a way to standardize technical language across everyone in the company. A developer and a salesperson would both know what an "order" is and could exchange information without technical jargon getting in the way. A shared, centralized glossary is a joint effort.
- **Bounded Context:** a boundary where a specific model is valid. A "user" in the authentication context is different from a "user" in the billing context. So each term has an attached context, and you need to be careful about that.
- **Aggregate:** a way of grouping related entities together as a unit. An `Order` can aggregate `OrderItem`, `Address`, etc.
- **Entity vs Value Object:** Entities are identifiable objects via an ID (a `Customer` with a unique ID). Value Objects are defined by their attributes without an ID (`Money { amount: 100, currency: "USD" }`).


DDD shines in complex systems with lots of business rules. For simple CRUDs and simple projects, it can be over-engineering. One of the main criticisms of DDD is exactly that — over-engineering.

### CI/CD

**CI (Continuous Integration)** is the practice of frequently integrating code into the main repository, with automatic validation (tests, linting, static analysis). The goal is to catch issues early. In practice, when a dev writes code and pushes it to a repository, it goes through a CI phase where it gets tested. If all tests pass, the code is safe to go to production.


**CD (Continuous Deployment)** Once CI tells us the code is safe, CD deploys the code to production — things like: adding the code to a virtual machine, updating container images, provisioning necessary infrastructure, etc.

---

## Code Design Principles

### SOLID

**SOLID** is an acronym for five object-oriented design principles:

**S — Single Responsibility Principle (SRP):** A class or function should have a single responsibility.

```python
# Bad: UserService does everything
class UserService:
    def create_user(self, data): ...
    def send_welcome_email(self, user): ...  # email responsibility here?
    def save_to_database(self, user): ...    # and persistence?

# Good: each class has one responsibility
class UserService:
    def create_user(self, data): ...

class EmailService:
    def send_welcome_email(self, user): ...

class UserRepository:
    def save(self, user): ...
```
<br>

**O — Open/Closed Principle (OCP):** code should be open for extension, closed for modification.

```python
# Bad: to add a new discount type, you modify the existing class
class CalculadoraDesconto:
    def calcular(self, tipo, valor):
        if tipo == "premium":
            return valor * 0.8
        elif tipo == "vip":
            return valor * 0.7
        # always need to modify here for a new type

# Good: extensible without modifying the existing code
from abc import ABC, abstractmethod

class EstrategiaDesconto(ABC):
    @abstractmethod
    def calcular(self, valor: float) -> float: ...

class DescontoPremium(EstrategiaDesconto):
    def calcular(self, valor: float) -> float:
        return valor * 0.8

class DescontoVIP(EstrategiaDesconto):
    def calcular(self, valor: float) -> float:
        return valor * 0.7
```
<br>

**L — Liskov Substitution Principle (LSP):** subclasses should be substitutable for their base classes without breaking behavior. In practice, a subclass should truly be its parent class. Taking the code above, `DescontoPremium` should be a `EstrategiaDesconto`.

**I — Interface Segregation Principle (ISP):** specific interfaces are better than a single generic one. Clients should not be forced to implement methods they don't use.

**D — Dependency Inversion Principle (DIP):** high-level modules should not depend on low-level modules. Both should depend on abstractions.

```python
# Bad: UserService depends directly on PostgreSQL
class UserService:
    def __init__(self):
        self.db = PostgreSQLConnection()  # tightly coupled

# Good: depends on the abstraction
class UserService:
    def __init__(self, repository: UserRepository):  # dependency injection
        self.repository = repository
```

### DRY

**DRY (Don't Repeat Yourself):** every piece of knowledge should have a single, unambiguous representation in the system. If you find yourself copying and pasting code, something is wrong.

The opposite is **WET (Write Everything Twice / We Enjoy Typing)** — duplicated code that, when it needs to change, needs to change in multiple places.

Heads up: DRY doesn't mean "abstract anything that looks the same". Sometimes two things look alike by coincidence but evolve differently. Abstracting too early can create unnecessary coupling.

### KISS

**KISS (Keep It Simple, Stupid):** the simplest solution that solves the problem is the right one. Unnecessary complexity is the enemy of maintainability.

```python
# Over-engineered
class SaudacaoFactory:
    def criar_saudacao(self, estrategia: str) -> "Saudacao":
        if estrategia == "formal":
            return SaudacaoFormal()
        return SaudacaoInformal()

# KISS
def saudar(nome: str, formal: bool = False) -> str:
    return f"Bom dia, {nome}." if formal else f"Oi, {nome}!"
```

### YAGNI

**YAGNI (You Aren't Gonna Need It):** don't build features you don't need now based on what you *think* you'll need in the future.

It's one of the hardest principles to follow because devs love preparing for the future. But systems with unused features have more complexity, more potential bugs, and higher maintenance costs.


<br>

---

## Databases & APIs

### CRUD

**CRUD (Create, Read, Update, Delete)** are the four basic data persistence operations. They map directly to HTTP verbs in REST APIs. What each one does is self-explanatory: Create → creates a resource, Read → reads/selects a resource, Update → modifies a resource, Delete → removes a resource.

| CRUD | HTTP | SQL |
|---|---|---|
| Create | POST | INSERT |
| Read | GET | SELECT |
| Update | PUT/PATCH | UPDATE |
| Delete | DELETE | DELETE |

```python
# CRUD in a REST API with FastAPI
@app.post("/users", status_code=201)
def create_user(user: UserCreate) -> UserResponse: ...

@app.get("/users/{user_id}")
def read_user(user_id: int) -> UserResponse: ...

@app.patch("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate) -> UserResponse: ...

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int) -> None: ...
```

### REST

**REST (Representational State Transfer)** is an architectural style for APIs. An API is "RESTful" when it follows its principles:

- **Stateless:** each request must contain all the information needed to be processed. The server doesn't store context between calls — no server-side sessions.
- **Uniform interface:** endpoints follow consistent conventions. Resources are nouns (`/users`, `/orders`), not verbs (`/getUser`, `/createOrder`).
- **Resources identified by URLs:** each resource has a unique address. `/users/42` identifies a specific user; `/users/42/orders` identifies that user's orders.
- **Correct use of HTTP verbs:** `GET` for reading, `POST` for creating, `PUT`/`PATCH` for updating, `DELETE` for removing. The verb indicates the intent, not the URL.

```http
GET    /users       → list users
POST   /users       → create a user
GET    /users/42    → return user 42
PATCH  /users/42    → partially update user 42
DELETE /users/42    → remove user 42
```



### ORM and ODM

**ORM (Object-Relational Mapper)** is a layer that maps code objects to relational tables. Examples: SQLAlchemy (Python), Hibernate (Java), ActiveRecord (Ruby), Prisma (TypeScript).

**ODM (Object-Document Mapper)** is the equivalent for document databases (NoSQL). Example: Mongoose for MongoDB.

```python
# Without ORM
cursor.execute("SELECT * FROM users WHERE id = %s AND active = true", (user_id,))
row = cursor.fetchone()
user = User(id=row[0], name=row[1], email=row[2])

# With ORM (SQLAlchemy)
user = session.query(User).filter(User.id == user_id, User.active == True).first()
```
<br>

ORMs increase productivity but can generate inefficient queries. In systems with complex queries or high load, raw SQL or query builders (like Knex) can be better choices.

### ETL and ELT

**ETL (Extract, Transform, Load)** is a data pipeline process:
1. **Extract:** pulls data from the source (database, API, file)
2. **Transform:** cleans, normalizes, enriches the data
3. **Load:** delivers the data to the destination (data warehouse, analytics database)

**ELT** reverses the order: it delivers the raw data first and transforms after the load. Made possible by modern data warehouses like BigQuery and Snowflake that have the computational power to transform large volumes.

### ACID

**ACID** are the properties that guarantee the reliability of database transactions:

- **Atomicity:** the transaction is all or nothing. If one part fails, everything rolls back.
- **Consistency:** the transaction takes the database from one valid state to another valid state.
- **Isolation:** concurrent transactions don't interfere with each other.
- **Durability:** once committed, the transaction persists even in case of failure.

### BASE

**BASE** is the counterpoint to ACID, adopted by NoSQL databases and distributed systems that prioritize availability over strict consistency:

- **Basically Available:** the system guarantees availability, but may return outdated or partial data.
- **Soft state:** the state of the system is not guaranteed to be permanent — different replicas may have different values for a period. Unlike ACID, where state is always definitive after a commit, in BASE the system accepts that distinct nodes may be temporarily out of sync. Example: a user updates their name in their profile; for a few milliseconds, the South America node returns "John Smith" while the Europe node still returns "John". Neither is "wrong" — the system is in a soft state until replication finishes.
- **Eventually consistent:** the system will become consistent at some point — not immediately, but eventually.

Databases like DynamoDB, Cassandra, and CouchDB follow the BASE model. The trade-off is clear: you give up immediate consistency in favor of high availability and horizontal scalability.

### CAP and PACELC

**CAP (Consistency, Availability, Partition Tolerance)** is a theorem stating that a distributed system can only guarantee **two of the three** attributes at the same time:

- **Consistency (C):** all nodes see the same data at the same time.
- **Availability (A):** every request gets a response (but it may be stale data).
- **Partition Tolerance (P):** the system keeps operating even if the network between nodes fails.

Since network partitions are inevitable in distributed systems, the real choice is always between **CP** or **AP**:

| Type | Examples | Trade-off |
|------|----------|-----------|
| CP | HBase, Zookeeper, etcd | Consistent, but may become unavailable during network failure |
| AP | Cassandra, DynamoDB, CouchDB | Available, but may return stale data |

**PACELC** is an extension of CAP created by Daniel Abadi. In addition to capturing the partition trade-off, it adds what happens in the **normal** case (no partition):

> If there's a Partition (P): choose between Availability (A) and Consistency (C).
> Else (E), no partition: choose between Latency (L) and Consistency (C).

Cassandra, for example, is **PA/EL** — it favors availability during partitions and low latency during normal operation.

### ERD

**ERD (Entity-Relationship Diagram)** is a diagram that represents the entities of a system, their attributes, and the relationships between them. It's the main tool for relational database modeling.

The three types of relationships:

- **1:1** — a user has one profile.
- **1:N** — a user has many orders.
- **N:N** — many users can be in many projects (requires a junction table).

ERDs are created before writing any SQL — tools like dbdiagram.io, Lucidchart, or draw.io are common for this.

<br>

---

## Architecture

### MVC

**MVC (Model-View-Controller)** is an architectural pattern that separates the application into three layers with distinct responsibilities:

- **Model:** contains the business logic and data access. Knows nothing about presentation.
- **View:** responsible for presenting data to the user. Contains no business logic.
- **Controller:** intermediary between Model and View. Receives user input, triggers the Model, and decides which View to display.

MVC is the base pattern for frameworks like Django, Ruby on Rails, Laravel, and ASP.NET. Variations like **MVP** and **MVVM** are adaptations for specific contexts (mobile, reactive frontend).

### ADR

**ADR (Architecture Decision Record)** is a short document that records a significant architectural decision — along with the context that led to it and the expected consequences.

Typical ADR structure:

```markdown
# ADR 0012: Use PostgreSQL as the primary database

## Status
Accepted

## Context
We need ACID transactions, JSON support, and a good tooling ecosystem.
MongoDB was considered, but eventual consistency doesn't meet our requirements.

## Decision
We will adopt PostgreSQL as the primary relational database.

## Consequences
- The team needs to know SQL and relational modeling.
- Horizontal scalability is more complex than with NoSQL.
- We gain strong consistency and native JSONB support.
```

ADRs are versioned alongside the code (in a `docs/adr/` folder) and answer the question every dev has asked: **"why was this done this way?"**. Without ADRs, that knowledge stays in the head of whoever left the company.

### BFF

**BFF (Backend for Frontend)** is an architectural pattern where each type of client (web, mobile, TV) has its own dedicated backend, optimized for the specific needs of that channel.

```
         ┌──────────────┐
         │   Web App    │──→ BFF Web  ─┐
         └──────────────┘              │
                                       ├──→ Internal services
         ┌──────────────┐              │    (Users, Orders, etc.)
         │  Mobile App  │──→ BFF Mobile┘
         └──────────────┘
```

The problem it solves: a generic API tends to serve all clients poorly — mobile needs smaller responses and offline-first support, web needs more data per request. With BFF, each client gets exactly what it needs, with no over-fetching or under-fetching.

It's common in architectures using GraphQL or when the frontend team has autonomy to evolve the BFF independently from the domain services.

<br>

---

## Frontend

### SPA

**SPA (Single Page Application)** is a web application that loads a single HTML page and dynamically updates content via JavaScript, without reloading the entire page on every navigation.

Frameworks like React, Vue, and Angular are used to build SPAs. The advantage is a smoother user experience (no page flashes). The downside is that the initial bundle can be large and SEO suffers without SSR.

### SSR

**SSR (Server-Side Rendering)** is a technique where HTML is generated on the server before being sent to the client — unlike CSR (Client-Side Rendering) where JavaScript builds the HTML in the browser.

| | SSR | CSR (SPA) |
|---|---|---|
| Initial HTML | Complete | Empty skeleton |
| SEO | Excellent | Problematic |
| First Contentful Paint | Faster | Slower |
| Interactivity | After hydration | After bundle loads |
| Server load | Higher | Lower |

Frameworks like **Next.js** (React) and **Nuxt** (Vue) combine SSR with client-side hydration, delivering the best of both worlds: Google-indexable HTML + SPA after load.

### SEO

**SEO (Search Engine Optimization)** is the set of techniques for improving a page's ranking in organic search engine results like Google.

For developers, SEO is technical — not just about keywords:

- **Semantic HTML:** using `<h1>`, `<nav>`, `<article>`, `<main>` correctly instead of `<div>` for everything.
- **Meta tags:** unique `<title>` and `<meta name="description">` per page.
- **Open Graph:** tags that control how the page appears when shared on social networks.
- **Core Web Vitals:** Google metrics that evaluate performance (LCP, FID, CLS).
- **SSR vs CSR:** server-rendered pages are easier for Googlebot to index.
- **Sitemap and robots.txt:** guide crawlers on what to index.

```html
<head>
  <title>SEO Guide for Devs | Blog</title>
  <meta name="description" content="SEO techniques focused on web development." />
  <meta property="og:title" content="SEO Guide for Devs" />
  <meta property="og:image" content="/og-seo.png" />
</head>
```

<br>

---

## Infrastructure & Cloud

### SaaS, PaaS and IaaS

The three cloud computing models, differentiated by how much responsibility the provider takes on:

| | IaaS | PaaS | SaaS |
|---|---|---|---|
| What it is | Infrastructure as a Service | Platform as a Service | Software as a Service |
| You manage | OS, runtime, app, data | App and data | Nothing |
| Provider manages | Hardware, network, virtualization | + OS, runtime, middleware | Everything |
| Examples | EC2, Azure VMs, GCE | Heroku, Render, Railway | Gmail, Slack, Notion |


## References

- [Martin Fowler - Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Martin Fowler - YAGNI](https://martinfowler.com/bliki/Yagni.html)
- [SOLID Principles - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [BDD - Dan North (BDD creator)](https://dannorth.net/introducing-bdd/)
