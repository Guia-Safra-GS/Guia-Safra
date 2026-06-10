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
- [Link do video de demonstração](https://youtu.be/1KN16ItmT-U)
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
## Como rodar as APIs localmente (front AgroMonitor)
### 1. Instalar
- .NET SDK 9  →  winget install Microsoft.DotNet.SDK.9
- Java JDK 17 (ou superior)
- (Node/Expo você já tem pro front)

### 2. Clonar os dois repositórios das APIs
- .NET:  github.com/Guia-Safra-GS/.Net-Sprint-1
- Java:  github.com/Guia-Safra-GS/Java-GS

### 3. ⚠️ Pegar os arquivos de credencial (NÃO vêm no git, são ignorados)
- O dono do repo precisa te mandar 2 arquivos por fora (têm a senha do Oracle):
- Pro .NET:  appsettings.Development.json  ->  colocar em  AgroMonitor.API/
- Pro Java:  application-local.properties  ->  colocar em  src/main/resources/

(Sem esses arquivos, a API sobe mas não conecta no banco.)

### 4. Rodar as APIs
- Na pasta do .NET:
 `dotnet run --project AgroMonitor.API --urls "http://0.0.0.0:5128/"`

- Na pasta do Java:
  `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`
  (no Windows: `mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=local`)

A Java sobe na 8080, a .NET na 5128.

### 5. Apontar o front pra SUA máquina
No front, em src/config.ts, troca o LAN_IP pelo IPv4 do TEU Wi-Fi:
  
- Windows: ipconfig  ->  pega o "Endereço IPv4" do adaptador Wi-Fi
const LAN_IP = "SEU_IP_AQUI";

### 6. Se for testar no CELULAR físico (Expo Go)
- Libera o firewall (PowerShell ADMIN):
New-NetFirewallRule -DisplayName "Dotnet 5128" -Direction Inbound -LocalPort 5128 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "Java 8080" -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow
- Celular e PC no MESMO Wi-Fi.
- Testa no navegador do celular: http://seu_ip:5128/api/Species  e  http://seu_ip:8080/usuarios

### 7. Rodar o app
  npx expo start  ->  escaneia o QR no Expo Go

### ⚠️ NÃO rode o gs_agromonitor.sql
O banco Oracle é compartilhado e já está populado. Rodar o script APAGA tudo.
Você só conecta no banco que já existe com as credenciais.

### ⚠️Ultimo caso⚠️
Na API de .NET, abra a pasta do projeto e dentro da pasta Agromonitor.API crie um arquivo appsettings.Development.json com o conteúdo:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "AgroMonitorOracle": "User Id=rm561336;Password=040507;Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle.fiap.com.br)(PORT=1521))(CONNECT_DATA=(SID=ORCL)))"
  }
}

```
substitua SEU_USER e SEU_PASSWORD pelas suas credenciais do Oracle (Não esqueça de rodar os comandos para criar as tabelas) e depois rode a API. O front, apontando pro seu IP, deve conseguir consumir os dados normalmente.
