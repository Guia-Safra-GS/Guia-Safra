# Guia Safra - Mobile App

Aplicativo mobile do projeto **Guia Safra**, desenvolvido para a Global Solution 2026/1 (FIAP). O app é a interface central para o produtor rural monitorar suas culturas, visualizar previsões climáticas derivadas de satélite e gerenciar a irrigação de forma inteligente.

O aplicativo integra-se de forma híbrida com dois backends:
- **API .NET (Cadastro):** Responsável pela gestão de espécies e lotes (Slots).
- **API Java (Operação):** Responsável por leituras de sensores, alertas, previsões e histórico de regas.

---

## Integrantes (Grupo)

- `Orlando Gonçalves` — **rm561584**
- `Gabriel Lourenço Martins` — **rm562194**
- `Matheus Roque Arantes` — **rm561959**
- `Giovane Amato dos Santos` — **rm561336**
- `André Emygdio Ferreira` — **rm565592**

---
## Links
- [Repositório do Projeto](https://github.com/Guia-Safra-GS/Guia-Safra)
- [Link do video de demonstração]()
- [Documentação da API .NET](https://github.com/Guia-Safra-GS/.Net-Sprint-1)
- [Documentação da API Java](https://github.com/Guia-Safra-GS/Java-GS)

---

## Funcionalidades

- **Dashboard Inteligente:** Visualização rápida da umidade do solo, alertas recentes e resumo da previsão do tempo.
- **Gestão de Lotes (Áreas de Plantio):** 
    - Cadastro de novas áreas vinculadas a sensores IoT.
    - Edição de limites de rega (umidade mínima/máxima) por espécie.
    - Exclusão lógica de lotes.
- **Monitoramento em Tempo Real:** Gráficos e indicadores de umidade e temperatura.
- **Previsão do Tempo:** Exibição de dados climáticos e probabilidade de chuva para os próximos dias.
- **Histórico de Irrigação:** Registro de todas as regas (manuais e automáticas) realizadas em cada lote.

---

## Tecnologias Utilizadas

- **React Native** com **Expo** (SDK 54)
- **TypeScript** para tipagem estática.
- **NativeWind (Tailwind CSS)** para estilização moderna e responsiva.
- **React Navigation** (Stack e Bottom Tabs) para fluidez na navegação.
- **Axios** para consumo de APIs REST.
- **Lucide React Native** para ícones.
- **Async Storage** para persistência de preferências locais.

---

## Como Executar

### Pré-requisitos
- Node.js instalado.
- Expo Go instalado no seu dispositivo móvel (Android/iOS).
- Backends (.NET e Java) rodando localmente ou em deploy.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [link-do-repositorio]
   cd Guia-Safra
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as APIs:**
   Abra o arquivo `src/config.ts` e ajuste os endereços das APIs.
   > **Nota:** Se estiver usando celular físico, substitua `localhost` pelo seu IP local.

4. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

5. **Escaneie o QR Code:**
   Use o app **Expo Go** no seu celular para abrir o projeto.

---

## Integração com APIs

O aplicativo consome dados de duas fontes distintas para garantir a especialização de domínios:

### Domínio de Cadastro (.NET)
- `GET /api/Species`: Lista as culturas disponíveis.
- `POST /api/Slot`: Cadastra uma nova área de plantio.
- `PUT /api/Species/{id}`: Atualiza parâmetros agronômicos (rega).
- `DELETE /api/Slot/{id}`: Desativa um lote.

### Domínio de Operação (Java)
- `GET /leituras`: Busca dados em tempo real dos sensores.
- `GET /previsoes`: Sincroniza dados climáticos globais.
- `GET /alertas`: Notifica o usuário sobre riscos de geada ou seca.
- `POST /regas`: Registra acionamentos manuais da bomba d'água.

---

## 1. Banco de dados — Oracle PL/SQL

É a fundação e o "cérebro" da automação. Um único script (`gs_agromonitor.sql`) roda do
início ao fim: limpeza, DDL, procedures, carga de dados, automação, blocos analíticos,
relatórios e um exemplo NoSQL.

**Modelo (9 tabelas):**

| Tabela | Domínio | Papel |
|---|---|---|
| `TB_CAD_SPECIES` | Cadastro | Espécies de planta; guarda a regra (umidade ideal, volume de rega, limite de geada) |
| `TB_CAD_SLOT` | Cadastro | Vagas de plantio; 1:N com espécie |
| `TB_CAD_USER` | Operação | Produtores/operadores |
| `TB_MON_CLIMATE_FORECAST` | Operação | Previsão climática derivada de satélite |
| `TB_MON_READING` | Operação | Leituras dos sensores; chave composta (slot + instante) |
| `TB_MON_WATERING_EVENT` | Operação | Regas (manuais e automáticas) |
| `TB_MON_ALERT` | Operação | Alertas de umidade crítica e risco de geada |
| `TB_MON_ERROR_LOG` | Operação | Log das exceções tratadas nas procedures |
| `TB_MON_RAW_TELEMETRY` | NoSQL | Pacote bruto (JSON) do ESP32 e da API de clima |

**A inteligência no banco:**

- Uma **trigger** dispara a cada nova leitura inserida.
- Ela chama um **package** de automação que compara a umidade lida com o mínimo da
  espécie daquele slot (usando uma **function** que classifica a severidade).
- Se a umidade está crítica, o banco insere uma **rega automática** e um **alerta**; se
  está só baixa, gera apenas o alerta.
- Há também a verificação de **risco de geada**, cruzando a previsão com a sensibilidade
  de cada espécie.

Além da automação, o script tem blocos anônimos, cursores explícitos, estruturas de
decisão e repetição, relatórios com JOIN e um exemplo de modelagem **NoSQL** com JSON
nativo do Oracle — cobrindo os requisitos da disciplina de banco.

---

## 2. API Java — domínio de Operação (GuiaSafra)

A parte mais complexa: concentra a modelagem avançada, a integração externa e o
histórico operacional.

- **Stack:** Java 17, Spring Boot 4, Spring Data JPA, Oracle, springdoc (Swagger).
- **Arquitetura:** em camadas (controller → service → repository), DTOs como Java Records.
- **Responsável por:** usuários, previsões climáticas, leituras dos sensores, regas e
  alertas.
- **Destaques de modelagem:** chave composta com `@EmbeddedId` na leitura (slot +
  instante), herança com `@MappedSuperclass` (regas e alertas como subclasses de `Event`),
  e a `Slot` mapeada como somente-leitura (o Java valida a FK, mas não escreve nela).
- **Integração externa:** sincroniza a previsão dos próximos dias com a **Open-Meteo** e
  deriva o risco de geada.
- **Boas práticas:** validação com Spring Validation, tratamento global de exceções,
  paginação, HATEOAS, CORS e Swagger. Senhas hasheadas com BCrypt.
- **Deploy:** publicada na nuvem (link no README da API).

---

## 3. API .NET — domínio de Cadastro (AgroMonitor)

A base do sistema: define o que existe na fazenda, que é o que dá sentido à operação.

- **Stack:** C# / .NET 9, ASP.NET Core, Entity Framework Core 9, Oracle.
- **Arquitetura:** Clean Architecture (Domain / Application / Infrastructure / API), com
  domínio rico (as entidades validam as próprias regras).
- **Responsável por:** espécies de planta (com a regra agronômica de cada uma) e os slots
  de plantio.
- **Relacionamento 1:N:** uma espécie tem vários slots (FK com exclusão restrita — não se
  apaga uma espécie que ainda tem slots).
- **Remoção lógica:** deletar um slot o marca como `INACTIVE` em vez de apagar,
  preservando o histórico que a API Java referencia.
- **Boas práticas:** validação em camadas (DataAnnotations + regra no serviço + FK do
  banco), erros padronizados em ProblemDetails, Migrations com EF Core e Swagger.

---

## Por que dividir em duas APIs

A separação é por **contexto de negócio**, não por questão técnica: uma API cuida do
*cadastro* (o que existe — espécies e vagas), a outra cuida da *operação* (o que acontece
— medições, regas, alertas). Cada uma é dona da escrita do seu pedaço e conversa com a
outra apenas pelo banco compartilhado. Isso mantém os serviços independentes e deixa a
fronteira de responsabilidade explícita.

---

## Conexão com o tema e os ODS

O AgroMonitor usa **dados orbitais (satélite)** aplicados ao **agronegócio**, conectando
exploração espacial a um problema real na Terra. A solução contribui para os Objetivos de
Desenvolvimento Sustentável da ONU:

- **ODS 2** — Fome zero e agricultura sustentável
- **ODS 9** — Indústria, inovação e infraestrutura
- **ODS 13** — Ação contra a mudança global do clima

Resultado prático: menos safra perdida, menos água desperdiçada e mais previsibilidade
para quem produz alimento em pequena e média escala.

---

## Tecnologias por frente

| Frente | Tecnologias |
|---|---|
| Banco | Oracle 19c, PL/SQL (procedures, function, package, trigger), JSON/NoSQL |
| API Operação | Java 17, Spring Boot 4, Spring Data JPA, springdoc, Open-Meteo |
| API Cadastro | C# / .NET 9, ASP.NET Core, EF Core 9, Swagger |
| Integração | Banco Oracle único compartilhado entre as duas APIs |
