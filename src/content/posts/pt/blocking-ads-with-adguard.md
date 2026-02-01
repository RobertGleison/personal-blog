---
title: 'Bloqueando Anúncios com AdGuard'
pubDate: 2026-02-01
description: 'Como se livrar de Ads alterando o DNS server e breve explicação sobre DNS.'
author: 'Robert Gleison'
image:
  url: '/blocking-ads-with-adguard/thumb_ads.png'
  alt: 'A stop sign crashing adds'
tags: ["Tips"]
---

## Índice

- [Overview](#overview)
- [O que é DNS?](#o-que-é-dns)
- [Como o DNS funciona?](#como-o-dns-funciona)
- [O que é AdGuard DNS?](#o-que-é-adguard-dns)
- [Como configurar AdGuard](#como-configurar-adguard)
  - [Configurar em devices](#configurar-em-devices)
  - [Configurar no router](#configurar-no-router)
- [Outras opções](#outras-opções)
- [Referências](#referências)

---

## Overview

Existem diversas maneiras de se livrar de Anúncios (Ads). Entre eles:
- Simplesmente usar a versão paga de um serviço (se existir). Ex: YouTube
- Usar algum browser com AdBlocker incluso como o Brave ou Opera
- Utilizar uma extenão com AdBlockers no browser
- Bloquear Ads pelo DNS


Algumas destas opções não me agradam, pois:
- Não quero pagar pelos serviços
- Não quero mudar meu browser padrão
- As extensões de browser com adblocker que usei foram detectadas pelos serviços e bloqueados com o tempo


Portanto, hoje vou falar sobre a opção que uso atualmente: bloquear Ads pelo DNS usando AdGuard DNS.

## O que é DNS?

DNS (Domain Name System) é um sistema que traduz nomes de domínios para endereços IP (Internet Protocol).

Quando você digita `google.com` no seu browser, seu computador não sabe o que isso significa. Ele precisa de um endereço IP (algo como `142.250.217.110`) para se conectar. O DNS faz essa tradução. O DNS reduz a necessidade dos humanos de memorizar endereços IP complexos (como 192.168.1.1 (no IPv4) ou endereços de IP alfanuméricos mais complexos como 2400:cb00:2048:1::c629:d7a2 (no IPv6).

Pense no DNS como uma lista telefônica da internet. Você sabe o nome da pessoa (domínio), a lista telefônica te diz o número (IP).

## Como o DNS funciona?

Um endereço IP é fornecido para cada dispositivo da internet e é necessário para que o encontremos na rede (como um endereço postal). Quando um usuário digita o domínio de um site como google.com, é preciso que ocorra a tradução deste nome pelo DNS para o IP do servidor host da página.

Existem 4 tipos de servidores DNS envolvidos nesse processo:

- **Recursive DNS Resolver**: O intermediário entre você e os outros servidores DNS. Normalmente é fornecido pelo seu provedor de internet ou por serviços como Google (8.8.8.8) ou Cloudflare (1.1.1.1). Ele recebe sua consulta e faz todo o trabalho de perguntar aos outros servidores.

- **Root DNS Server**: Os servidores raiz da internet. Existem 13 clusters deles no mundo. Eles não sabem o IP do google.com, mas sabem quem cuida dos domínios `.com`, `.org`, `.br`, etc.

- **TLD Name Server**: TLD = Top Level Domain. Esse servidor é responsável por uma extensão específica (`.com`, `.net`, `.org`). O TLD de `.com` sabe quais servidores são responsáveis por cada domínio `.com`.

- **Authoritative DNS Server**: O servidor que realmente sabe o IP do domínio. É configurado pelo dono do site. O authoritative server do Google sabe que `google.com` aponta para `142.250.217.110`.

**Exemplo prático: acessando google.com**

![DNS](/blocking-ads-with-adguard/dns.png)

1. Você digita `google.com` no browser. O browser pergunta ao Recursive Resolver: "Qual o IP de google.com?"
2. O Recursive Resolver não sabe, então pergunta ao Root Server: "Quem cuida dos domínios `.com`?" O Root Server responde com o endereço do TLD Server de `.com`.
3. O Recursive Resolver pergunta ao TLD Server: "Quem cuida do domínio google.com?" O TLD Server responde com o endereço do Authoritative Server do Google (`ns1.google.com`).
4. O Recursive Resolver pergunta ao Authoritative Server: "Qual o IP de google.com?" O Authoritative Server responde: `142.250.217.110`.
5. O Recursive Resolver devolve o IP para o browser, que finalmente se conecta ao servidor.

Todo esse processo acontece em milissegundos. O Recursive Resolver guarda a resposta em cache por um tempo (definido pelo TTL - Time To Live), então na próxima vez que você acessar google.com, ele já sabe o IP sem precisar perguntar de novo.

## O que é AdGuard DNS?

AdGuard DNS é um serviço de DNS que, além de fazer a tradução normal de domínios para IPs, também bloqueia domínios conhecidos de publicidade e rastreamento.

Quando você tenta acessar `ads.google.com` (domínio de um anúncio), por exemplo, o AdGuard DNS responde com um IP inválido ou simplesmente não responde. Resultado: o anúncio não carrega.

A vantagem do AdGuard sobre outras soluções (como extensões de browser) é que ele funciona em nível de rede. Isso significa que:
- Funciona em qualquer aplicativo, não só no browser
- Funciona em dispositivos que não aceitam extensões (smart TVs, celulares, apps)
- Não pode ser detectado por sites que bloqueiam AdBlockers (já que o domínio simplesmente não resolve)


Portanto, se usarmos AdGuard como DNS padrão de nossos devices, domínios de anúncios que não estivem numa pré-lista serão bloqueados.

### Todos os anúncios serão bloqueados?

Não. O bloqueio por DNS só funciona quando o anúncio vem de um domínio diferente do site que você está acessando.

**Exemplo de anúncio que será bloqueado:**
Você acessa `youtube.com` e o site tenta carregar um anúncio de `ads.doubleclick.net`. O AdGuard DNS bloqueia a resolução de `ads.doubleclick.net`, então o anúncio não carrega.

**Exemplo de anúncio que NÃO será bloqueado:**
Alguns sites servem anúncios do próprio domínio. Se `site.com` serve anúncios de `site.com/ads/banner.jpg`, o DNS não consegue distinguir isso do conteúdo normal do site. Bloquear `site.com` bloquearia o site inteiro.

Na prática, a maioria dos anúncios vem de domínios externos (Google Ads, Facebook Ads, redes de publicidade), então o bloqueio por DNS funciona bem para o uso diário. Mas não espere 100% de bloqueio.

## Como configurar AdGuard

### Configurar em devices

**No Android:**
1. Vá em Configurações → Rede e Internet → DNS Privado
2. Selecione "Nome do host do provedor de DNS privado"
3. Digite: `dns.adguard.com`

**No iPhone/iPad:**
1. Baixe o app AdGuard na App Store (a versão gratuita funciona para DNS)
2. Ou configure manualmente em Ajustes → Wi-Fi → selecione sua rede → Configurar DNS → Manual
3. Adicione: `94.140.14.14` e `94.140.15.15` (IP da AdGuard)

**No Windows:**
1. Painel de Controle → Central de Rede → Alterar configurações do adaptador
2. Clique com botão direito na sua conexão → Propriedades
3. Selecione "Protocolo IP Versão 4 (TCP/IPv4)" → Propriedades
4. Selecione "Usar os seguintes endereços de servidor DNS"
5. DNS preferencial: `94.140.14.14`
6. DNS alternativo: `94.140.15.15`

**No Linux:**
Edite `/etc/resolv.conf` ou configure via NetworkManager:
```bash
nameserver 94.140.14.14
nameserver 94.140.15.15
```

### Configurar no router

Configurar no router é a opção mais prática porque todos os dispositivos conectados à sua rede vão usar o AdGuard DNS automaticamente, sem precisar configurar cada um.

O processo varia por modelo de router, mas geralmente:

1. Acesse a interface do router (normalmente `192.168.0.1` ou `192.168.1.1` no browser)
2. Procure por configurações de DHCP ou DNS
3. Substitua os servidores DNS pelos do AdGuard:
   - DNS Primário: `94.140.14.14`
   - DNS Secundário: `94.140.15.15`
4. Salve e reinicie o router

Após isso, todos os dispositivos da casa (celulares, TVs, notebooks) vão bloquear anúncios sem precisar de configuração individual.

## Outras opções

Além do AdGuard DNS, existem outras soluções:

- **Pi-hole**: Um servidor DNS que você hospeda na sua própria rede (geralmente num Raspberry Pi). Mais controle, mas requer manutenção.
- **NextDNS**: Similar ao AdGuard, permite personalizar listas de bloqueio.
- **Cloudflare 1.1.1.1 com filtros**: Oferece filtros de malware e conteúdo adulto, mas não bloqueia ads por padrão.

Para a maioria das pessoas, AdGuard DNS é suficiente. Pi-hole é interessante se você quiser mais controle ou já tem um Raspberry Pi disponível.

---

## Referências

- [AdGuard DNS Official](https://adguard-dns.io/)
- [Pi-hole](https://pi-hole.net/)
- [How DNS Works - Cloudflare](https://www.cloudflare.com/learning/dns/what-is-dns/)
