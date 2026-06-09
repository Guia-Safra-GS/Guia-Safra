# Guia Safra - Mobile App 🌿

Aplicativo mobile do projeto **Guia Safra**, desenvolvido para a Global Solution 2026/1 (FIAP). O app é a interface central para o produtor rural monitorar suas culturas, visualizar previsões climáticas derivadas de satélite e gerenciar a irrigação de forma inteligente.

O aplicativo integra-se de forma híbrida com dois backends:
- **API .NET (Cadastro):** Responsável pela gestão de espécies e lotes (Slots).
- **API Java (Operação):** Responsável por leituras de sensores, alertas, previsões e histórico de regas.

---

## ✨ Funcionalidades

- **Dashboard Inteligente:** Visualização rápida da umidade do solo, alertas recentes e resumo da previsão do tempo.
- **Gestão de Lotes (Áreas de Plantio):** 
    - Cadastro de novas áreas vinculadas a sensores IoT.
    - Edição de limites de rega (umidade mínima/máxima) por espécie.
    - Exclusão lógica de lotes.
- **Monitoramento em Tempo Real:** Gráficos e indicadores de umidade e temperatura.
- **Previsão do Tempo:** Exibição de dados climáticos e probabilidade de chuva para os próximos dias.
- **Histórico de Irrigação:** Registro de todas as regas (manuais e automáticas) realizadas em cada lote.

---

## 🛠️ Tecnologias Utilizadas

- **React Native** com **Expo** (SDK 54)
- **TypeScript** para tipagem estática.
- **NativeWind (Tailwind CSS)** para estilização moderna e responsiva.
- **React Navigation** (Stack e Bottom Tabs) para fluidez na navegação.
- **Axios** para consumo de APIs REST.
- **Lucide React Native** para ícones.
- **Async Storage** para persistência de preferências locais.

---

## 🚀 Como Executar

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

## 🌐 Integração com APIs

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

## 📡 Resolução de Problemas (Network Error)

Se o app exibir "Network Error" ao tentar conectar com os backends rodando no seu PC:

1. **Mesma Rede:** Certifique-se que o celular e o PC estão no mesmo Wi-Fi.
2. **IP Local:** No terminal do PC, rode `ipconfig` (Windows) e pegue seu IPv4.
3. **Configuração:** No arquivo `src/config.ts`, altere a variável `SEU_IP_OU_HOST` para o seu IP real.
4. **Firewall:** Verifique se o firewall do Windows permite conexões nas portas `3000` (Java) e `5128` (.NET).

---

## 👥 Integrantes (Grupo)

- `Orlando Gonçalves` — **rm561584**
- `Gabriel Lourenço Martins` — **rm562194**
- `Matheus Roque Arantes` — **rm561959**
- `Giovane Amato dos Santos` — **rm561336**
- `André Emygdio Ferreira` — **rm565592**

---
## 🔗Links
- [Repositório do Projeto](https://github.com/Guia-Safra-GS/Guia-Safra)
- [Link do video de demonstração]()
- [Documentação da API .NET](https://github.com/Guia-Safra-GS/.Net-Sprint-1)
- [Documentação da API Java](https://github.com/Guia-Safra-GS/Java-GS)