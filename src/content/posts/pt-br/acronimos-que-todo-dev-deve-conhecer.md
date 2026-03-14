---
title: 'Siglas que todo desenvolvedor deve conhecer'
pubDate: 2026-03-14
description: 'Um guia rápido sobre as siglas mais usadas no dia a dia de desenvolvimento de software.'
author: 'Robert Gleison'
image:
  url: '/acronimos-que-todo-dev-deve-conhecer/thumb_acronyms.png'
  alt: 'Diversas siglas técnicas de desenvolvimento de software organizadas em grupos.'
tags: ["Tips", "Software Engineering"]
---

## Índice

- [Overview](#overview)
- [Negócios & Produto](#negócios--produto)
  - [MRR e ARR](#mrr-e-arr)
  - [KPI e OKR](#kpi-e-okr)
  - [ROI](#roi)
  - [SLA, SLO e SLI](#sla-slo-e-sli)
  - [MVP e POC](#mvp-e-poc)
- [Metodologias de Desenvolvimento](#metodologias-de-desenvolvimento)
  - [SCRUM e KANBAN](#scrum-e-kanban)
  - [TDD](#tdd)
  - [BDD](#bdd)
  - [DDD](#ddd)
  - [CI/CD](#cicd)
- [Princípios de Design de Código](#princípios-de-design-de-código)
  - [SOLID](#solid)
  - [DRY](#dry)
  - [KISS](#kiss)
  - [YAGNI](#yagni)
- [Banco de Dados & APIs](#banco-de-dados--apis)
  - [CRUD](#crud)
  - [REST](#rest)
  - [ORM e ODM](#orm-e-odm)
  - [ETL e ELT](#etl-e-elt)
  - [ACID](#acid)
  - [BASE](#base)
  - [CAP e PACELC](#cap-e-pacelc)
  - [ERD](#erd)
- [Arquitetura](#arquitetura)
  - [MVC](#mvc)
  - [ADR](#adr)
  - [BFF](#bff)
- [Frontend](#frontend)
  - [SPA](#spa)
  - [SSR](#ssr)
  - [SEO](#seo)
- [Infraestrutura & Cloud](#infraestrutura--cloud)
  - [SaaS, PaaS e IaaS](#saas-paas-e-iaas)
- [Referências](#referências)

---

## Overview

Constantemente eu sou bombardeado de siglas nos perfis tech de rede social. Coisas como MRR, KPI, ROI parecem cada vez mais próximos dos desenvolvedores, principalmente pela última onda de criar SaaS (outra sigla) e gerar dinheiro extra. Além disso, siglas como TDD, DDD, SOLID sempre estiveram nos meus estudos mas que as vezes tenho que revisar, afinal, quem nunca esqueceu o que significa o L de SOLID. Baseado nisso, criei esse artigo que reúne as principais terminologias num mesmo lugar organizado por contexto.

Este artigo não aprofunda nos assuntos, mas apenas os toca superficialmente. Sabendo da existência deles, existem fontes melhores de pesquisa.

<br>

---

## Negócios & Produto

Desenvolvedores não ficam só no código, principalmente na era dos agentes de IA. Em algum momento você vai estar em uma reunião com produto, CEO ou investidores, e essas siglas vão aparecer.

### MRR e ARR

**MRR (Monthly Recurring Revenue)** é a receita recorrente mensal, quanto o produto fatura todo mês de forma previsível (assinaturas, contratos mensais, etc).

**ARR (Annual Recurring Revenue)** é o MRR anualizado.


> MRR = soma de todas as receitas recorrentes no mês
>
> ARR = MRR × 12

<br>
Se um SaaS tem 500 clientes pagando R$100/mês, o MRR é R$50.000 e o ARR é R$600.000.


### KPI e OKR

**KPI (Key Performance Indicator)** é uma métrica usada para medir o desempenho de algo em relação a um objetivo. Baseado dos KPIs é que sabemos se
uma empresa está em boas condições, se os usuários estão felizes. É uma maneira também de guiar os próximos passos de uma empresa

Exemplo:
- número de usuários pagantes
- tempo de solução de bugs
- taxa de churn
- nível de satisfação

**OKR (Objectives and Key Results)** é um framework de definição de metas. Normalmente é associado a um período de tempo. Na maioria das empresas
que trabalhei, os OKRs eram por quarter (3 em 3 meses), mas também podem ser mensais, semestrais e anuais. Uma empresa trabalha para atingir os OKRs
estabelecidos.

Exemplo:
- Para o próximo quarter, queremos diminuir o tempo de onboard de um novo cliente
- Para o próximo semestre, queremos aumentar o número de empresas parceiras de 5 para 10
- Para o próximo ano, queremos crescer o time de vendas em 50% e aumentar a receita em 10%

KPIs e OKRs podem estar ligados. Para saber se um OKR foi completo se precisa de KPIs, afinal, como saber se a subiu 10% sem um KPI que nos mostra a receita
da empresa?


### ROI

**ROI (Return on Investment)** — retorno sobre investimento. Simples na teoria:

> ROI = (Ganho - Custo) / Custo × 100%

<br>
Um engenheiro gastou 2 semanas otimizando uma query que rodava 10.000 vezes por dia e custava $200/mês em banco de dados. Após a otimização, o custo caiu para $20/mês. Em 3 meses, economizou $540. O ROI daquele trabalho foi positivo.

Desenvolvedores raramente calculam ROI formalmente, mas pensar nesses termos ajuda a priorizar: "Vale a pena refatorar isso agora ou o impacto é pequeno demais?"

### SLA, SLO e SLI

Essas três sempre aparecem juntas e causam confusão.

**SLI (Service Level Indicator)** é a métrica de um serviço em si, o que você está medindo. Ex: latência de uma API, disponibilidade de um banco de dados, taxa de erros de uma pipeline, etc...

**SLO (Service Level Objective)** é o objetivo interno para esse SLI. Ex: "99,9% de disponibilidade por mês" ou "p95 de latência abaixo de 150ms".

**SLA (Service Level Agreement)** é o contrato com o cliente. Se o SLO não for atingido, pode haver penalidade (desconto, créditos, etc).

Em resumo, um SLI é o que se mede em um serviço, SLO é uma meta interna e SLA é um acordo com o cliente.

Um exemplo de SLA seria:

> "O serviço terá disponibilidade de 99,9% ao mês. Caso esse objetivo não seja atingido, o cliente receberá créditos equivalentes a 10% do valor da fatura por cada hora de indisponibilidade adicional."

### MVP e POC

**MVP (Minimum Viable Product)** é a versão mínima de um produto com funcionalidade suficiente para ser usado por clientes reais. Não é um produto incompleto ou uma ideia, é um produto que atende as necessidades do cliente e que futuramente receberá updates.

Aqui cabe destacar uma opinião minha sobre: se caso seu objetivo é criar um SaaS como fonte de renda, não aguarde até o produto estar perfeito para o lançamento, mas lance um MVP e vá fazendo updates pois o seu MVP já pode ter assinaturas para alguém interessado, mesmo sem as futuras features.

**POC (Proof of Concept)** é uma demonstração técnica para validar se algo é viável. Não precisa ter dados reais, ser bonito ou ter testes. O objetivo é responder: "isso funciona?". Um POC ajuda a explicar conceitos ou ter um guia de implementação.

A diferença: POC valida viabilidade técnica, MVP valida mercado. Um POC nunca vai para produção (ou não deveria). Um MVP sim.

<br>

---

## Metodologias de Desenvolvimento

### SCRUM e KANBAN

**SCRUM** é um framework ágil baseado em sprints  ciclos curtos e fixos (geralmente 1-2 semanas) com cerimônias definidas: planning (reuniões de planejamento), daily (reuniões diárias para atualizações e retirar dúvidas), reviews, retrospectivas. Tem papéis bem definidos: Product Owner, Scrum Master, Dev Team.

**KANBAN** é um sistema de gestão de fluxo de trabalho visual com um board de colunas como: To Do, Done, In Progress, QA. Baseado nessas colunas, os desenvolvedores gerenciam seus trabalhos. To Do seria suas tarefas não iniciadas, In Progress as que estão em desenvolvimento, QA as que estão sendo validadas e Done as que estão finalizadas. Podem existir colunas personalizadas.

Na prática, muitos times usam um híbrido chamado **Scrumban** — sprints do SCRUM com o board visual e WIP limits do KANBAN.

### TDD

**TDD (Test-Driven Development)** é uma prática de desenvolvimento onde você escreve o teste **antes** do código.
Exemplo:
```python
# 1. Cria um teste com o retorno expectável
def test_calcular_desconto():
    assert calcular_desconto(100, 10) == 90
    assert calcular_desconto(200, 50) == 100
    assert calcular_desconto(100, 0) == 100

# 2. Implementa o código após o teste
def calcular_desconto(preco: float, percentual: float) -> float:
    return preco - (preco * percentual / 100)

# 3. Altera o código com a cobertura do teste
def calcular_desconto(preco: float, percentual: float) -> float:
    if not 0 <= percentual <= 100:
        raise ValueError("Percentual deve estar entre 0 e 100")
    return preco * (1 - percentual / 100)
```
<br>
O TDD não é sobre ter testes, é sobre deixar os testes guiarem o design do código. Quando você escreve o teste primeiro, pensa no objetivo antes da implementação.
<br>
Um exemplo prático no mundo da engenharia de dados: antes de criar uma query SQL complexa, criar um teste com o resultado esperado. Assim se evita erros de código, macros e joins em tabelas críticas.



### BDD

**BDD (Behavior-Driven Development)** é uma extensão do TDD com foco no comportamento do sistema do ponto de vista do usuário. Usa linguagem natural (Given/When/Then) para descrever cenários.

```gherkin
# Cenário escrito em Gherkin (linguagem do BDD)
Feature: Desconto para clientes premium

  Scenario: Cliente premium recebe 20% de desconto
    Given um cliente com plano premium
    When ele adiciona um produto de R$100 ao carrinho
    Then o total deve ser R$80

  Scenario: Cliente regular não recebe desconto
    Given um cliente sem plano premium
    When ele adiciona um produto de R$100 ao carrinho
    Then o total deve ser R$100
```
<br>
O grande valor do BDD é que product managers e stakeholders conseguem ler e validar os cenários sem entender código. Frameworks como Cucumber (Java/Ruby), Behave (Python) ou SpecFlow (.NET) transformam esses cenários em testes executáveis.

Ou seja, BDD seria escrever testes em linguagem humana baseada no comportamento de um ser humano.

### DDD

**DDD (Domain-Driven Design)** é uma abordagem de design de software que organiza o código em torno do domínio do negócio  não em torno da tecnologia.
É um conceito difícil de explicar e caberia um artigo apenas para DDD (portanto não aprofundarei aqui). Mesmo após ler os livros referência, ainda me senti confuso, mas de maneira superficial:

Os conceitos centrais:

- **Ubiquitous Language:** uma linguagem comum compartilhada por desenvolvedores e especialistas do domínio. O código usa os mesmos termos que o negócio usa. Se o negócio chama de uma venda de "pedido", o código precisa nomear esse recurso de "pedido" e não algo como "transaction" ou "request". Isso é uma maneira de uniformizar a linguagem técnica para todas as pessoas da empresa. Assim, um desenvolvedor e uma pessoa de vendas saberiam o que é um pedido e assim eles podem trocar informações entre eles sem que a linguagem técnica seja um blocker. Além disso, um dicionário de termos centralizado é uma idea conjunta.
- **Bounded Context:** um limite onde um modelo específico é válido. "usuário" no contexto de autenticação é diferente de "usuário" no contexto de faturamento. Portanto, cada termo tem um contexto anexo e se deve tomar cuidado com isso.
- **Aggregate:** uma maneira de juntar diferentes entidades relacionadas como uma unidade. Um `Pedido` pode agregar `ItemDePedido`, `Endereço`, etc.
- **Entity vs Value Object:** Entities são objetos identificáveis como um ID (um `Cliente` com ID único). Já Value Objects são definidos pelos seus atributos sem o uso de um ID (`Dinheiro { valor: 100, moeda: "BRL" }`).


DDD brilha em sistemas complexos com muita regra de negócio. Para CRUD simples e projetos simples, pode ser over-engineering. Uma das principais críticas ao DDD é justamente o over-engineering.

### CI/CD

**CI (Continuous Integration)** é a prática de integrar código frequentemente no repositório principal, com validação automática (testes, linting, análise estática). O objetivo é detectar problemas cedo. Na prática, quando um dev faz um código e sobe ele para um repositório, ele vai passar por uma fase de CI onde será testado. Se todos os testes passarem, o código é seguro para ir para produção.


**CD (Continuous Deployment)** Após o CI nos dizer se o código é seguro, o CD faz o deploy do código para produção. coisas como: adicionar o código a uma máquina virtual, atualizar a imagem de containers, criar infraestrutura necessária e etc.

---

## Princípios de Design de Código

### SOLID

**SOLID** é um acrônimo para cinco princípios de design orientado a objetos:

**S — Single Responsibility Principle (SRP):** Uma classe ou função deve ter uma responsabilidade única.

```python
# Ruim: UserService faz tudo
class UserService:
    def create_user(self, data): ...
    def send_welcome_email(self, user): ...  # responsabilidade de email aqui?
    def save_to_database(self, user): ...    # e persistência?

# Bom: cada classe tem uma responsabilidade
class UserService:
    def create_user(self, data): ...

class EmailService:
    def send_welcome_email(self, user): ...

class UserRepository:
    def save(self, user): ...
```
<br>

**O — Open/Closed Principle (OCP):** um código deve ser aberto para extensão, fechado para modificação.

```python
# Ruim: para adicionar novo tipo de desconto, modifica a classe existente
class CalculadoraDesconto:
    def calcular(self, tipo, valor):
        if tipo == "premium":
            return valor * 0.8
        elif tipo == "vip":
            return valor * 0.7
        # sempre precisa modificar aqui para novo tipo

# Bom: extensível sem modificar o existente
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

**L — Liskov Substitution Principle (LSP):** subclasses devem ser substituíveis por suas classes base sem quebrar o comportamento. Na prática, uma subclasse deve ser sua classe mãe. Se pegarmos o código acima, "DescontoPremium" deve ser um "EstrategiaDesconto"

**I — Interface Segregation Principle (ISP):** interfaces específicas são melhores que uma interface genérica. Clientes não devem ser forçados a implementar métodos que não usam.

**D — Dependency Inversion Principle (DIP):** módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.

```python
# Ruim: UserService depende diretamente do PostgreSQL
class UserService:
    def __init__(self):
        self.db = PostgreSQLConnection()  # acoplado

# Bom: depende da abstração
class UserService:
    def __init__(self, repository: UserRepository):  # injeção de dependência
        self.repository = repository
```

### DRY

**DRY (Don't Repeat Yourself):** cada pedaço de conhecimento deve ter uma representação única no sistema. Se você se pega copiando e colando código, algo está errado.

O antônimo é **WET (Write Everything Twice / We Enjoy Typing)**  código duplicado que quando precisa mudar, precisa mudar em vários lugares.

Cuidado: DRY não significa "abstraia qualquer coisa que parece igual". Às vezes duas coisas parecem iguais por acidente mas evoluem de forma diferente. Abstrair cedo demais pode criar acoplamento desnecessário.

### KISS

**KISS (Keep It Simple, Stupid):** a solução mais simples que resolve o problema é a certa. Complexidade desnecessária é o inimigo da manutenibilidade.

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

**YAGNI (You Aren't Gonna Need It):** não construa funcionalidades que você não precisa agora baseado no que *acha* que vai precisar no futuro.

É um dos princípios mais difíceis de seguir porque devs gostam de se preparar para o futuro. Mas sistemas com features não usadas têm mais complexidade, mais bugs potenciais e mais custo de manutenção.


<br>

---

## Banco de Dados & APIs

### CRUD

**CRUD (Create, Read, Update, Delete)** são as quatro operações básicas de persistência de dados. Mapeiam diretamente para verbos HTTP em APIs REST. O que fazem é autoexplicativo: Create -> cria algum recurso, Read -> lê/seleciona algum recurso, Update -> modifica um recurso, Delete -> deletar um recurso.

| CRUD | HTTP | SQL |
|---|---|---|
| Create | POST | INSERT |
| Read | GET | SELECT |
| Update | PUT/PATCH | UPDATE |
| Delete | DELETE | DELETE |

```python
# CRUD em uma API REST com FastAPI
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

**REST (Representational State Transfer)** é um estilo arquitetural para APIs. Uma API é "RESTful" quando segue seus princípios:

- **Stateless (sem estado):** cada requisição deve conter todas as informações necessárias para ser processada. O servidor não guarda contexto entre chamadas — sem sessões no servidor.
- **Interface uniforme:** os endpoints seguem convenções consistentes. Recursos são substantivos (`/users`, `/orders`), não verbos (`/getUser`, `/createOrder`).
- **Recursos identificados por URLs:** cada recurso tem um endereço único. `/users/42` identifica um usuário específico; `/users/42/orders` identifica os pedidos desse usuário.
- **Uso correto dos verbos HTTP:** `GET` para leitura, `POST` para criação, `PUT`/`PATCH` para atualização, `DELETE` para remoção. O verbo indica a intenção, não a URL.

```http
GET    /users       → lista usuários
POST   /users       → cria um usuário
GET    /users/42    → retorna o usuário 42
PATCH  /users/42    → atualiza parcialmente o usuário 42
DELETE /users/42    → remove o usuário 42
```



### ORM e ODM

**ORM (Object-Relational Mapper)** é uma camada que mapeia objetos de código para tabelas relacionais. Exemplos: SQLAlchemy (Python), Hibernate (Java), ActiveRecord (Ruby), Prisma (TypeScript).

**ODM (Object-Document Mapper)** é o equivalente para bancos de documentos (NoSQL). Exemplo: Mongoose para MongoDB.

```python
# Sem ORM
cursor.execute("SELECT * FROM users WHERE id = %s AND active = true", (user_id,))
row = cursor.fetchone()
user = User(id=row[0], name=row[1], email=row[2])

# Com ORM (SQLAlchemy)
user = session.query(User).filter(User.id == user_id, User.active == True).first()
```
<br>

ORMs aumentam produtividade mas podem gerar queries ineficientes. Em sistemas com queries complexas ou alta carga, SQL puro ou query builders (como Knex) podem ser melhores escolhas.

### ETL e ELT

**ETL (Extract, Transform, Load)** é um processo de pipeline de dados:
1. **Extract:** extrai dados da fonte (banco, API, arquivo)
2. **Transform:** limpa, normaliza, enriquece os dados
3. **Load:** entrega os dados no destino (data warehouse, banco analítico)

**ELT** inverte a ordem: entrega os dados brutos primeiro e transforma depois do load.  Possível com data warehouses modernos como BigQuery e Snowflake que têm poder computacional para transformar grandes volumes.

### ACID

**ACID** são as propriedades que garantem a confiabilidade de transações em banco de dados:

- **Atomicity:** a transação é tudo ou nada. Se uma parte falha, tudo reverte.
- **Consistency:** a transação leva o banco de um estado válido para outro estado válido.
- **Isolation:** transações concorrentes não interferem entre si.
- **Durability:** uma vez commitada, a transação persiste mesmo em caso de falha.

### BASE

**BASE** é o contraponto ao ACID, adotado por bancos NoSQL e sistemas distribuídos que priorizam disponibilidade em vez de consistência estrita:

- **Basically Available:** o sistema garante disponibilidade, mas pode retornar dados desatualizados ou parciais.
- **Soft state:** o estado do sistema não é garantido como permanente — réplicas diferentes podem ter valores diferentes por um período. Diferente do ACID, onde o estado é sempre definitivo após um commit, no BASE o sistema aceita que nós distintos estejam temporariamente fora de sincronia. Exemplo: um usuário atualiza seu nome no perfil; por alguns milissegundos, o nó da América do Sul retorna "João Silva" enquanto o da Europa ainda retorna "João". Nenhum dos dois está "errado" — o sistema está em soft state até a replicação concluir.
- **Eventually consistent:** o sistema ficará consistente em algum momento — não imediatamente, mas eventualmente.

Bancos como DynamoDB, Cassandra e CouchDB seguem o modelo BASE. A troca é clara: você abre mão de consistência imediata em favor de alta disponibilidade e escalabilidade horizontal.

### CAP e PACELC

**CAP (Consistency, Availability, Partition Tolerance)** é um teorema que afirma: um sistema distribuído só consegue garantir **dois dos três** atributos ao mesmo tempo:

- **Consistency (C):** todos os nós veem os mesmos dados ao mesmo tempo.
- **Availability (A):** toda requisição recebe uma resposta (mas pode ser dado desatualizado).
- **Partition Tolerance (P):** o sistema continua operando mesmo se a rede entre nós falhar.

Como partições de rede são inevitáveis em sistemas distribuídos, a escolha real é sempre entre **CP** ou **AP**:

| Tipo | Exemplos | Trade-off |
|------|----------|-----------|
| CP | HBase, Zookeeper, etcd | Consistente, mas pode ficar indisponível em falha de rede |
| AP | Cassandra, DynamoDB, CouchDB | Disponível, mas pode retornar dados desatualizados |

**PACELC** é uma extensão do CAP criada por Daniel Abadi. Além de capturar o trade-off de partição, ele adiciona o que acontece no caso **normal** (sem partição):

> Se há Partição (P): escolha entre Availability (A) e Consistency (C).
> Else (E), sem partição: escolha entre Latency (L) e Consistency (C).

Cassandra, por exemplo, é **PA/EL** — favorece disponibilidade em partições e baixa latência em operação normal.

### ERD

**ERD (Entity-Relationship Diagram)** é um diagrama que representa as entidades de um sistema, seus atributos e os relacionamentos entre elas. É a principal ferramenta de modelagem de banco de dados relacional.

Os três tipos de relacionamento:

- **1:1** — um usuário tem um perfil.
- **1:N** — um usuário tem vários pedidos.
- **N:N** — vários usuários podem estar em vários projetos (precisam de tabela intermediária).

ERDs são criados antes de escrever qualquer SQL — ferramentas como dbdiagram.io, Lucidchart ou draw.io são comuns para isso.

<br>

---

## Arquitetura

### MVC

**MVC (Model-View-Controller)** é um padrão arquitetural que separa a aplicação em três camadas com responsabilidades distintas:

- **Model:** contém a lógica de negócio e acesso a dados. Não sabe nada sobre apresentação.
- **View:** responsável pela apresentação ao usuário. Não contém lógica de negócio.
- **Controller:** intermediário entre Model e View. Recebe input do usuário, aciona o Model e decide qual View exibir.

MVC é o padrão base de frameworks como Django, Ruby on Rails, Laravel e ASP.NET. Variações como **MVP** e **MVVM** são adaptações para contextos específicos (mobile, frontend reativo).

### ADR

**ADR (Architecture Decision Record)** é um documento curto que registra uma decisão arquitetural significativa — junto com o contexto que levou a ela e as consequências esperadas.

Estrutura típica de um ADR:

```markdown
# ADR 0012: Usar PostgreSQL como banco principal

## Status
Aceito

## Contexto
Precisamos de transações ACID, suporte a JSON e bom ecossistema de ferramentas.
MongoDB foi considerado, mas a consistência eventual não atende nossos requisitos.

## Decisão
Adotaremos PostgreSQL como banco relacional principal.

## Consequências
- Time precisa conhecer SQL e modelagem relacional.
- Escalabilidade horizontal é mais complexa que em NoSQL.
- Ganhamos consistência forte e suporte nativo a JSONB.
```

ADRs são versionados junto ao código (pasta `docs/adr/`) e respondem a pergunta que todo dev já fez: **"por que isso foi feito assim?"**. Sem ADRs, esse conhecimento fica na cabeça de quem saiu da empresa.

### BFF

**BFF (Backend for Frontend)** é um padrão arquitetural onde cada tipo de cliente (web, mobile, TV) tem seu próprio backend dedicado, otimizado para as necessidades específicas daquele canal.

```
         ┌──────────────┐
         │   Web App    │──→ BFF Web  ─┐
         └──────────────┘              │
                                       ├──→ Serviços internos
         ┌──────────────┐              │    (Users, Orders, etc.)
         │  Mobile App  │──→ BFF Mobile┘
         └──────────────┘
```

O problema que resolve: uma API genérica tende a servir mal todos os clientes — mobile precisa de respostas menores e offline-first, web precisa de mais dados por requisição. Com BFF, cada cliente recebe exatamente o que precisa, sem over-fetching ou under-fetching.

É comum em arquiteturas com GraphQL ou quando o time de frontend tem autonomia para evoluir o BFF independentemente dos serviços de domínio.

<br>

---

## Frontend

### SPA

**SPA (Single Page Application)** é uma aplicação web que carrega uma única página HTML e atualiza o conteúdo dinamicamente via JavaScript, sem recarregar a página inteira a cada navegação.

Frameworks como React, Vue e Angular são usados para construir SPAs. A vantagem é a experiência de usuário mais fluida (sem flashes de página). A desvantagem é que o bundle inicial pode ser grande e o SEO fica comprometido sem SSR.

### SSR

**SSR (Server-Side Rendering)** é uma técnica onde o HTML é gerado no servidor antes de ser enviado ao cliente — diferente do CSR (Client-Side Rendering) onde o JavaScript monta o HTML no browser.

| | SSR | CSR (SPA) |
|---|---|---|
| HTML inicial | Completo | Esqueleto vazio |
| SEO | Excelente | Problemático |
| First Contentful Paint | Mais rápido | Mais lento |
| Interatividade | Após hydration | Após bundle carregar |
| Carga no servidor | Maior | Menor |

Frameworks como **Next.js** (React) e **Nuxt** (Vue) combinam SSR com hidratação no cliente, entregando o melhor dos dois mundos: HTML indexável pelo Google + SPA após o carregamento.

### SEO

**SEO (Search Engine Optimization)** é o conjunto de técnicas para melhorar o posicionamento de uma página nos resultados orgânicos de mecanismos de busca como Google.

Para desenvolvedores, SEO é técnico — não apenas sobre palavras-chave:

- **HTML semântico:** usar `<h1>`, `<nav>`, `<article>`, `<main>` corretamente em vez de `<div>` para tudo.
- **Meta tags:** `<title>` e `<meta name="description">` únicos por página.
- **Open Graph:** tags que controlam como a página aparece ao ser compartilhada em redes sociais.
- **Core Web Vitals:** métricas do Google que avaliam performance (LCP, FID, CLS).
- **SSR vs CSR:** páginas renderizadas no servidor são mais fáceis de indexar pelo Googlebot.
- **Sitemap e robots.txt:** orientam os crawlers sobre o que indexar.

```html
<head>
  <title>Guia de SEO para Devs | Blog</title>
  <meta name="description" content="Técnicas de SEO focadas em desenvolvimento web." />
  <meta property="og:title" content="Guia de SEO para Devs" />
  <meta property="og:image" content="/og-seo.png" />
</head>
```

<br>

---

## Infraestrutura & Cloud

### SaaS, PaaS e IaaS

Os três modelos de cloud computing, diferenciados por quanto de responsabilidade o provedor assume:

| | IaaS | PaaS | SaaS |
|---|---|---|---|
| O que é | Infraestrutura como serviço | Plataforma como serviço | Software como serviço |
| Você gerencia | SO, runtime, app, dados | App e dados | Nada |
| Provedor gerencia | Hardware, rede, virtualização | + SO, runtime, middleware | Tudo |
| Exemplos | EC2, Azure VMs, GCE | Heroku, Render, Railway | Gmail, Slack, Notion |


## Referências

- [Martin Fowler - Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Martin Fowler - YAGNI](https://martinfowler.com/bliki/Yagni.html)
- [SOLID Principles - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html)
- [BDD - Dan North (criador do BDD)](https://dannorth.net/introducing-bdd/)
