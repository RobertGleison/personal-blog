---
title: 'Configurações PostgreSQL que Todo Desenvolvedor Deveria Conhecer'
pubDate: 2026-01-25
description: 'Importantes configurações para melhorar sua experiência com postgreSQL.'
author: 'Robert Gleison'
image:
  url: '/postgres_configurations/thumb.png'
  alt: 'Visualização das configurações do PostgreSQL.'
tags: ["Infrastructure", "Software Engineering"]
---

## Índice

- [Overview](#overview)
- [Configurações de Memória](#configurações-de-memória)
  - [shared_buffers](#shared_buffers)
  - [work_mem](#work_mem)
  - [maintenance_work_mem](#maintenance_work_mem)
- [Configurações de Conexão e Workers](#configurações-de-conexão-e-workers)
  - [max_connections](#max_connections)
  - [max_worker_processes](#max_worker_processes)
  - [max_parallel_workers](#max_parallel_workers)
- [Configurações de WAL e Checkpoint](#configurações-de-wal-e-checkpoint)
  - [wal_level](#wal_level)
  - [max_wal_size](#max_wal_size)
  - [checkpoint_timeout](#checkpoint_timeout)
- [Configurações de Autovacuum](#configurações-de-autovacuum)
  - [autovacuum](#autovacuum)
  - [autovacuum_max_workers](#autovacuum_max_workers)
  - [autovacuum_naptime](#autovacuum_naptime)
- [Configurações de Conexão e Sessão](#configurações-de-conexão-e-sessão)
  - [tcp_keepalives_idle](#tcp_keepalives_idle)
  - [idle_session_timeout](#idle_session_timeout)
- [Extensões Essenciais do PostgreSQL](#extensões-essenciais-do-postgresql)
  - [pg_trgm](#pg_trgm)
  - [pgvector](#pgvector)
  - [pgcrypto](#pgcrypto)
  - [citext](#citext)
  - [uuid-ossp](#uuid-ossp)
  - [pg_cron](#pg_cron)
- [Connection Pooling e Conectividade](#connection-pooling-e-conectividade)
  - [Por que Connection Pooling é Importante](#por-que-connection-pooling-é-importante)
  - [PgBouncer](#pgbouncer)
  - [Pooling em Nível de Aplicação](#pooling-em-nível-de-aplicação)
  - [Dimensionamento do Pool de Conexões](#dimensionamento-do-pool-de-conexões)
- [Referências](#referências)

---

## Overview

É de conhecimento geral que o PostgreSQL é um dos bancos relacionais mais usados no mundo e sabendo disso decidi compilar neste texto algumas configurações importantes para melhorar sua eficiência.

Meu primeiro contato com muitas dessas configurações foi no desafio "[Rinha de Backend](https://github.com/zanfranceschi/rinha-de-backend-2023-q3)" do zanfranceschi, onde os participantes competiam para criar um sistema capaz de suportar inúmeras requisições concorrentes sem gargalos ou falhas. Era um desafio que permitia tudo e muitas pessoas desabilitaram ou modificaram as configurações do Postgres para torná-lo mais eficiente (ainda que menos seguro para ambientes reais).

Na prática, tudo que apresento aqui está na documentação oficial do PostgreSQL (que li pela primeira vez para escrever este texto). Porém, é uma documentação extensa e muitas configurações têm casos de uso específicos, então considero válido sumarizar apenas as mais importantes.

O objetivo aqui não é abordar o que normalmente se aprende sobre bancos relacionais como índices, SQL, constraints e procedures, mas sim falar sobre o que ninguém me ensinou na faculdade: networking, configurações avançadas e extensões.

---

## Sobre o Postgres
O postgreSQL ou postgres nada mais é que um banco relacional. Ele é um banco maduro e muito flexível, podendo até mesmo guardar estruturas aninhadas ou criar data_types complexos. O desempenho do PostgreSQL depende fortemente de uma configuração adequada já que as configurações padrão são conservadoras e projetadas para compatibilidade, não para desempenho.

As configurações podem ficar localizadas em um arquivo `postgresql.conf` como no exemplo abaixo de um servidor de 16GB de RAM:


```conf
# Configurações de Memória
shared_buffers = 4GB                    # 25% da RAM
work_mem = 16MB                         # Memória por operação de ordenação/hash
maintenance_work_mem = 1GB              # Para VACUUM, CREATE INDEX
effective_cache_size = 12GB             # 75% da RAM (dica para o planejador)

# Configurações de Conexão
max_connections = 200                   # Use connection pooling para mais
listen_addresses = '*'                  # Aceitar conexões remotas

# Workers e Paralelismo
max_worker_processes = 20
max_parallel_workers = 12
max_parallel_workers_per_gather = 4

# WAL e Checkpoint
wal_level = replica                     # Para replicação
max_wal_size = 4GB
checkpoint_timeout = 15min
checkpoint_completion_target = 0.9

# Autovacuum
autovacuum = on
autovacuum_max_workers = 4
autovacuum_naptime = 30s

# Conexão e Sessão
tcp_keepalives_idle = 300               # Detectar conexões mortas
idle_session_timeout = 30min            # Fechar sessões ociosas

# Extensões
shared_preload_libraries = 'pg_stat_statements, pg_cron'
```

<br>

Irei abordar algumas destas configurações e o que elas significam. Claro que existem inúmeras outras, mas se fosse para listar todas, é melhor ler a documentação. A ideia é listar as mais importantes para melhorar o desempenho do seu banco.

---

## Configurações de Memória

### shared_buffers

**Descrição:** Cache primário do PostgreSQL. Todos os dados lidos do disco são primeiro carregados nos shared buffers, e as gravações também são preparadas aqui antes de serem salvas no disco.

**Por Que Importa:** Esta é a memória de trabalho do seu banco de dados. Toda operação de leitura verifica este cache primeiro. Se o cache for muito pequeno significa um cache miss alto e I/O constante no disco para buscar as informações. Se o cache for muito grande pode levar a gasto de recursos desnecessários.

**Ponto Ideal:** 15–25% da RAM total é o ideal segundo a literatura, mas claro que pode variar dependendo do use case.


```conf
# Para um servidor com 16GB RAM
shared_buffers = 4GB

# Para um servidor com 64GB RAM
shared_buffers = 16GB
```

<br>

Além de 25% da RAM, você obtém retornos decrescentes porque o PostgreSQL também depende do cache do sistema de arquivos do SO. O SO geralmente é melhor em cache do que o próprio buffer pool do PostgreSQL.


### work_mem

**Descrição:** Memória alocada para operações internas e processamento. Se o workload for pesado demais e atingir este valor, para evitar erros de memória (OOM) o banco começa a processar dados no dico rígido. Lento porém evita erros. Isso é chamado de Disk Spill.

Se este valor for muito alto, o query planner pode ficar maluco e começar a fazer planos não tão eficientes pois pensa que temos muita memória.

**Ponto Ideal:** 4–32MB (dependente do contexto)

**Por Que Importa:** work_mem abaixo do esperado faz com que queries façam spill para o disco e reduz drasticamente a velocidade. work_mem acima do esperado pode ocasionar errosde OOM.

```conf
work_mem = 16MB
```

<br>

Uma única query complexa pode gerar várias operações de ordenação/hash/joins... A fórmula é:

```
Memória Potencial = work_mem × max_connections × operações_por_consulta
```

<br>

Com 100 conexões, 16MB work_mem e consultas com média de 3 operações, você pode consumir 4,8GB.


### maintenance_work_mem

**Descrição:** Memória usada para operações de manutenção como `VACUUM`, `CREATE INDEX`, `ALTER TABLE` e verificações de restrição `FOREIGN KEY`.

**Padrão:** 64MB

**Ponto Ideal:** 256MB – 2GB

**Por Que Importa:** Valores maiores aceleram significativamente a criação de índices, vacuum e outras tarefas de manutenção. Diferente do work_mem, geralmente apenas uma operação de manutenção é executada por vez.

```conf
# Para servidores com 16GB+ RAM
maintenance_work_mem = 1GB

# Para bancos de dados grandes (100GB+)
maintenance_work_mem = 2GB
```

<br>

Isso não afeta o desempenho normal de queries, mas melhora drasticamente a velocidade de operações em massa e manutenção de rotina.



## Configurações de Conexão e Workers

### max_connections

**Descrição:** Número máximo de conexões simultâneas ao banco de dados permitidas. Se uma aplicação encontra gargalos na comunicação entre backend e BD, talvez o problema seja baixo número de conexões simultâneas.

**Padrão:** 100

**Ponto Ideal:** 100–400 (depende muito da carga de trabalho)

**Por Que Importa:** Cada conexão consome memória (vários MB) para overhead de conexão. Muitas conexões criam contenção e esgotamento de recursos.

```conf
# Para aplicações web com connection pooling
max_connections = 200
```

Um número muito alto de connections pode consumir muitos recursos e causar erros de "Too many connections"

Ao invés de ter múltiplas conexões simultâneas, talvez seja o caso de considerar usar connection pooling (PgBouncer, pgpool-II) ao invés de mais conexões. Assim, ao invés de sempre recriar as conexões (que têm overhead), você sempre mantêm as conexões ativas com um tempo de inatividade máximo para se desligar a conexão.


### max_worker_processes

**Descrição:** Número máximo de processos worker em background que o sistema pode suportar. Este é o orçamento total para todos os workers em background.

**Padrão:** 8

**Por Que Importa:** Esta é a base para paralelismo. Queries paralelas, workers de autovacuum, workers de replicação lógica e workers em background todos usam desta pool de workers.

```conf
max_worker_processes = 16
```


### max_parallel_workers

**Descrição:** Número máximo de workers que podem ser usados para execução de queries paralelas em todo o sistema.

**Padrão:** 8

**Ponto Ideal:** 50–75% dos núcleos de CPU

**Por Que Importa:** Permite ao PostgreSQL paralelizar a execução de queries, acelerando significativamente scans grandes e agregações.

```conf
# Para um servidor de 16 núcleos
max_parallel_workers = 12
```

<br>

**Restrição:** Não pode exceder `max_worker_processes`.


## Configurações de WAL e Checkpoint

WAL -> Técnica usada pelo postgres e outros BDs para garantir durabilidade e consistência. Guarda todas mudanças feitas no banco numa lista append only antes da mudança ser aplicada. Assimse garante que uma transação feita tenha seu log gravado. Isto é importante para replicação de mudanças para replicas de banco de dados de leitura (que precisam saber o que acontecer na replica de escrita). Também é importante para disaster recovery.

![WAL](/postgres_configurations/wal.png)

### wal_level

**Descrição:** Determina quanta informação é escrita no Write-Ahead Log (WAL).

**Padrão:** `replica`
**Ponto Ideal:**
- `minimal` para bancos de dados standalone sem replicação (mais rápido)
- `replica` para replicação em streaming
- `logical` para replicação lógica

**Por Que Importa:** Níveis menores significam menos overhead de WAL mas desabilitam recursos de replicação.

```conf
# Para produção com replicação
wal_level = replica

# Para carga em massa (temporariamente)
wal_level = minimal
```

### max_wal_size

**Descrição:** Tamanho máximo de arquivos WAL antes de disparar um checkpoint.

**Padrão:** 1GB

**Ponto Ideal:** 2GB – 16GB (depende do volume de escrita)

**Por Que Importa:** Valores maiores reduzem a frequência de checkpoint, melhorando o desempenho de escrita mas aumentando o tempo de recuperação.

```conf
# Para cargas moderadas de escrita
max_wal_size = 4GB

# Para cargas pesadas de escrita
max_wal_size = 8GB
```

<br>

Valores maiores significam tempo de recuperação de crash mais longo.


### checkpoint_timeout

**Descrição:** Tempo máximo entre checkpoints automáticos do WAL.

**Padrão:** 5 minutos

**Ponto Ideal:** 10–30 minutos

**Por Que Importa:** Checkpoints causam picos de I/O. Checkpoints menos frequentes suavizam o I/O mas aumentam o tempo de recuperação.

```conf
# Para cargas pesadas de escrita
checkpoint_timeout = 15min

# Para cargas muito pesadas de escrita
checkpoint_timeout = 30min
```

## Configurações de Autovacuum

VACUUM -> Se você deletar 10 mil linhas do seu banco, o tamanho de seu BD não muda. O que bancos como postgres fazem é marcar estas linhas como desativadas. Isso acontece pois é melhor ter uma operação de deleção/alteração rápida (deletar/alterar fisicamente pode demorar tempo). Isso é chamado de MVCC (Multi-Version Concurrency Control), onde não se sobrescreve linhas, mas cria uma nova versão a fim de evitar erros de concorrência. O que o VACUUM faz é fisicamente deletar as linhas marcadas como desativadas ou alteradas.

### autovacuum

**Descrição:** Habilita o daemon de autovacuum para manutenção automática do banco de dados. Ou seja, automatiza o VACUUM.

**Padrão:** `on`

**Ponto Ideal:** `on` (sempre)

**Por Que Importa:** Autovacuum previne wraparound de ID de transação, remove tuplas mortas e atualiza estatísticas. Desabilitá-lo quase nunca é recomendado.

```conf
autovacuum = on
```

<br>

Desabilitar o autovacuum pode levar a degradação severa de desempenho e corrupção de banco de dados (wraparound de ID de transação).


### autovacuum_max_workers

**Descrição:** Número máximo de processos de autovacuum que podem executar simultaneamente.

**Padrão:** 3

**Ponto Ideal:** 3–6

**Por Que Importa:** Mais workers podem lidar com vacuum de múltiplas tabelas concorrentemente, importante para bancos de dados com muitas tabelas ativas.

```conf
# Para bancos de dados com muitas tabelas
autovacuum_max_workers = 6
```

<br>

Mais workers consomem mais recursos mas mantêm tabelas mais limpas para casos de muita escrita

### autovacuum_naptime

**Descrição:** Atraso mínimo entre execuções de autovacuum em qualquer banco de dados.

**Padrão:** 1 minuto

**Ponto Ideal:** 30 segundos – 1 minuto

**Por Que Importa:** Controla com que frequência o autovacuum verifica se há trabalho.

```conf
# Para cargas pesadas de escrita
autovacuum_naptime = 30s
```

## Configurações de Conexão e Sessão

### tcp_keepalives_idle

**Descrição:** Tempo antes de enviar um pacote TCP keepalive para detectar conexões mortas.

**Padrão:** 0 (usa padrão do SO, tipicamente 2 horas)

**Ponto Ideal:** 60–600 segundos

**Por Que Importa:** Detecta e fecha conexões mortas mais rapidamente, prevenindo esgotamento de slots de conexão.

```conf
# Detectar conexões mortas em 5 minutos
tcp_keepalives_idle = 300
```

### idle_session_timeout

**Descrição:** Termina automaticamente sessões que estão ociosas pela duração especificada.

**Padrão:** 0 (desabilitado)

**Ponto Ideal:** 10–60 minutos (dependente da aplicação)

**Por Que Importa:** Previne que conexões ociosas consumam slots de conexão indefinidamente.

```conf
# Fechar conexões ociosas por 30 minutos
idle_session_timeout = 30min
```

<br>

Útil quando aplicações não fecham conexões adequadamente.

---

## Extensões PostgreSQL

O sistema de extensões do PostgreSQL permite adicionar funcionalidades sem modificar o núcleo do banco de dados. Extensões são módulos pré-empacotados que podem ser instalados e habilitados por banco de dados.

### Como Instalar e Habilitar Extensões

```sql
-- Verificar extensões disponíveis
SELECT * FROM pg_available_extensions;

-- Habilitar uma extensão
CREATE EXTENSION IF NOT EXISTS nome_extensao;

-- Verificar extensões instaladas
\dx
```

---

## Exemplos de extensões populares
### pg_trgm

**Descrição:** Fornece correspondência de similaridade de texto baseada em trigramas e busca full-text rápida usando índices GIN/GiST.

**Casos de Uso:**
- Busca fuzzy de texto (encontrar strings similares)
- Funcionalidade de autocomplete
- Busca tolerante a erros de digitação
- Consultas LIKE/ILIKE rápidas com correspondência de padrões

**Por Que Importa:** Habilita buscas de similaridade de alto desempenho que de outra forma exigiriam motores de busca externos. Particularmente útil para recursos de busca voltados ao usuário.

```sql
-- Habilitar a extensão
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Criar um índice GIN para buscas de similaridade rápidas
CREATE INDEX idx_users_name_trgm ON users USING GIN (name gin_trgm_ops);

-- Encontrar nomes similares (correspondência fuzzy)
SELECT name, similarity(name, 'John Doe') AS sim
FROM users
WHERE similarity(name, 'John Doe') > 0.3
ORDER BY sim DESC;

-- Correspondência de padrões rápida com suporte a índice
SELECT * FROM users
WHERE name ILIKE '%john%';

-- Encontrar registros com erros de digitação
SELECT * FROM products
WHERE name % 'iPone';  -- Corresponderá a 'iPhone'
```

<br>

**Funções Principais:**
- `similarity(text, text)` - Retorna pontuação de similaridade (0-1)
- `word_similarity(text, text)` - Similaridade baseada em palavras
- `text % text` - Operador de similaridade (limite configurável)


### pgvector

**Descrição:** Adiciona tipos de dados vetoriais e capacidades de busca de similaridade para aplicações de IA/ML, habilitando armazenamento e consulta eficientes de embeddings.

**Casos de Uso:**
- Busca semântica
- Sistemas de recomendação
- Busca de similaridade de imagens
- Aplicações alimentadas por IA usando embeddings do OpenAI, Cohere, etc.

**Por Que Importa:** Essencial para aplicações modernas de IA. Permite armazenar embeddings diretamente no PostgreSQL e realizar buscas eficientes de vizinhos mais próximos sem bancos de dados vetoriais externos.

```sql
-- Habilitar a extensão
CREATE EXTENSION IF NOT EXISTS vector;

-- Criar uma tabela com coluna vetorial
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536)  -- Dimensão de embedding do OpenAI ada-002
);

-- Criar um índice para busca de similaridade rápida
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Ou usar HNSW para melhor desempenho (PostgreSQL 16+)
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- Encontrar documentos similares (similaridade de cosseno)
SELECT id, content,
       1 - (embedding <=> '[0.1, 0.2, ...]'::vector) AS similarity
FROM documents
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 10;

-- Operadores de distância disponíveis:
-- <-> (distância L2)
-- <=> (distância de cosseno)
-- <#> (produto interno)
```


### pgcrypto

**Descrição:** Fornece funções criptográficas para criptografia, hashing e geração de dados aleatórios.

**Casos de Uso:**
- Hashing de senhas
- Criptografia de dados em repouso
- Geração de tokens seguros
- Criptografia/descriptografia PGP

**Por Que Importa:** Habilita armazenamento seguro de dados sem criptografia em nível de aplicação. Funções criptográficas integradas garantem práticas de segurança consistentes.

```sql
-- Habilitar a extensão
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Hash de senhas (bcrypt)
INSERT INTO users (email, password_hash)
VALUES ('user@example.com', crypt('user_password', gen_salt('bf')));

-- Verificar senha
SELECT * FROM users
WHERE email = 'user@example.com'
  AND password_hash = crypt('user_password', password_hash);

-- Gerar UUIDs aleatórios
SELECT gen_random_uuid();

-- Criptografar/descriptografar dados
-- Criptografia simétrica
SELECT pgp_sym_encrypt('dados sensíveis', 'chave_criptografia');
SELECT pgp_sym_decrypt(coluna_criptografada, 'chave_criptografia') FROM nome_tabela;

-- Gerar bytes aleatórios seguros
SELECT gen_random_bytes(32);

-- Funções de hash
SELECT digest('dados', 'sha256');
SELECT encode(digest('dados', 'sha512'), 'hex');
```

### citext

**Descrição:** Tipo de texto case-insensitive que se comporta como texto regular mas com comparações e indexação case-insensitive.

**Casos de Uso:**
- Endereços de email
- Nomes de usuário
- Restrições únicas case-insensitive
- Busca sem penalidade de desempenho do ILIKE

**Por Que Importa:** Simplifica operações case-insensitive sem exigir funções LOWER() em todos os lugares. Mantém o case enquanto compara de forma case-insensitive.

```sql
-- Habilitar a extensão
CREATE EXTENSION IF NOT EXISTS citext;

-- Criar tabela com coluna case-insensitive
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email citext UNIQUE,  -- Unicidade case-insensitive
  username citext NOT NULL
);

-- Estes serão tratados como duplicatas
INSERT INTO users (email, username)
VALUES ('User@Example.com', 'JohnDoe');

-- Isto falhará (email duplicado)
INSERT INTO users (email, username)
VALUES ('user@example.com', 'JaneDoe');

-- Comparações case-insensitive (sem necessidade de ILIKE)
SELECT * FROM users WHERE email = 'USER@EXAMPLE.COM';

-- Índice funciona com buscas case-insensitive
CREATE INDEX idx_users_email ON users(email);
```

<br>

**Benefícios Principais:**
- Preserva o case original no armazenamento
- Comparações automáticas case-insensitive
- Funciona com índices B-tree
- Sem necessidade de índices funcionais em LOWER()


### uuid-ossp

**Descrição:** Gera identificadores universalmente únicos (UUIDs) usando vários algoritmos.

**Casos de Uso:**
- Chaves primárias para sistemas distribuídos
- Identificadores não sequenciais
- IDs voltados ao público (URLs, APIs)
- Identificadores seguros para merge entre bancos de dados

**Por Que Importa:** UUIDs previnem colisão de IDs em sistemas distribuídos e ocultam padrões sequenciais. Essencial para microserviços e implantações multi-região.

```sql
-- Habilitar a extensão
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela com chave primária UUID
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL,
  total DECIMAL(10,2)
);

-- Funções disponíveis de geração de UUID:
SELECT uuid_generate_v1();    -- Baseado em tempo
SELECT uuid_generate_v4();    -- Aleatório (mais comum)

-- Inserir com UUID auto-gerado
INSERT INTO orders (customer_id, total)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 99.99);
```

<br>

**Versões de UUID:**
- `v1` - Baseado em tempo (inclui endereço MAC, potencial preocupação de privacidade)
- `v4` - Aleatório (recomendado para a maioria dos casos de uso)

**Trade-offs:**
- **Prós:** Globalmente único, não sequencial, seguro para merge
- **Contras:** 16 bytes vs 4-8 bytes para inteiros, índices ligeiramente mais lentos

### pg_cron

**Descrição:** Agendador de tarefas baseado em cron simples que executa dentro do PostgreSQL.

**Casos de Uso:**
- Limpeza periódica de dados
- Agregações agendadas
- Tarefas de manutenção automatizadas
- Geração recorrente de relatórios

**Por Que Importa:** Elimina necessidade de agendadores externos para tarefas centradas em banco de dados. Tarefas executam com garantias em nível de banco de dados e podem usar SQL diretamente.

```sql
-- Habilitar a extensão (requer superusuário)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Agendar uma tarefa (limpeza diária às 3 AM)
SELECT cron.schedule(
  'cleanup-old-logs',
  '0 3 * * *',
  'DELETE FROM logs WHERE created_at < NOW() - INTERVAL ''90 days'''
);

-- Agendar agregação a cada 15 minutos
SELECT cron.schedule(
  'update-stats',
  '*/15 * * * *',
  'REFRESH MATERIALIZED VIEW CONCURRENTLY user_stats'
);

-- Visualizar tarefas agendadas
SELECT * FROM cron.job;

-- Visualizar histórico de execução de tarefas
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;

-- Desagendar uma tarefa
SELECT cron.unschedule('cleanup-old-logs');
```

<br>

**Configuração:**
Adicione ao `postgresql.conf`:
```conf
shared_preload_libraries = 'pg_cron'
cron.database_name = 'seu_banco_dados'
```

<br>

**Sintaxe Cron:**
```
┌───────────── minuto (0 - 59)
│ ┌───────────── hora (0 - 23)
│ │ ┌───────────── dia do mês (1 - 31)
│ │ │ ┌───────────── mês (1 - 12)
│ │ │ │ ┌───────────── dia da semana (0 - 6) (Domingo a Sábado)
│ │ │ │ │
│ │ │ │ │
* * * * *
```

<br>

---

## Connection Pooling e Conectividade

### Por que Connection Pooling é Importante

PostgreSQL cria um novo processo de servidor para cada conexão, que consome memória significativa e recursos. Sem connection pooling, aplicações podem rapidamente esgotar conexões disponíveis, levando a erros de "too many connections" e degradação de desempenho.

**O Problema:**
```
Exemplo: Cada conexão = ~10MB RAM + overhead de CPU
100 conexões = ~1GB RAM mínimo
1000 conexões = Degradação do sistema
```

<br>

**A Solução:** Connection pooling mantém um pool menor de conexões de banco de dados que são compartilhadas entre muitas conexões de aplicação sem que seja necessário a criação de uma nova conexão para uma nova transação.

### PgBouncer

**Descrição:** Connection pool leve para PostgreSQL. A solução mais popular e amplamente usada.

**Por Que Importa:** PgBouncer pode lidar com milhares de conexões de cliente enquanto mantém um pool pequeno de conexões reduzindo o overhead do banco de dados.

**Modos de Pooling:**

1. **Session Pooling**: Conexão atribuída ao cliente por toda sessão

2. **Transaction Pooling** (Recomendado): Conexão retornada ao pool após cada transação


**Exemplo de configuração** (`/etc/pgbouncer/pgbouncer.ini`):

```ini
[databases]
mydb = host=localhost port=5432 dbname=mydb

[pgbouncer]
listen_addr = 127.0.0.1
listen_port = 6432
auth_type = md5
auth_file = /etc/pgbouncer/userlist.txt

# Configurações do pool de conexões
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 25
reserve_pool_size = 5
reserve_pool_timeout = 3

# Ajuste de desempenho
server_idle_timeout = 600
query_timeout = 60
```

### Pooling em Nível de Aplicação

Muitos frameworks e bibliotecas de acesso a banco de dados oferecem pooling integrado. Esta abordagem é mais simples de configurar mas menos flexível que soluções dedicadas como PgBouncer.

**Node.js (pg-pool):**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'mydb',
  user: 'usuario',
  password: 'senha',
  max: 20,                    // Máximo de conexões no pool
  idleTimeoutMillis: 30000,   // Tempo antes de fechar conexão ociosa
  connectionTimeoutMillis: 2000,
});

// Uso
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
```

<br>

**Java (HikariCP):**
```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
config.setUsername("usuario");
config.setPassword("senha");
config.setMaximumPoolSize(20);
config.setMinimumIdle(5);
config.setIdleTimeout(300000);
config.setConnectionTimeout(20000);

HikariDataSource dataSource = new HikariDataSource(config);
```

<br>

**Python (SQLAlchemy):**
```python
from sqlalchemy import create_engine

engine = create_engine(
    "postgresql://usuario:senha@localhost/mydb",
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    pool_recycle=1800,
)
```

<br>

**Quando usar pooling de aplicação vs PgBouncer:**
- **Pooling de aplicação:** Aplicações simples, monolíticas, menos overhead operacional
- **PgBouncer:** Múltiplas aplicações, microserviços, necessidade de controle centralizado


**Sinais de pool mal dimensionado:**
- **Pool muito pequeno:** Timeouts de conexão, alta latência, filas de espera
- **Pool muito grande:** Alto uso de memória, contenção de CPU, muitas conexões ociosas

---

## Referências

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/current/)
- [OpenAI - Scaling PostgreSQL to power 800 million ChatGPT users](https://openai.com/index/scaling-postgresql/)
- [Rinha de Backend](https://github.com/zanfranceschi/rinha-de-backend-2023-q3)