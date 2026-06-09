// ============================================================================
// CONFIGURAÇÕES GLOBAIS DO APP
// ============================================================================

import { Platform } from "react-native";

// Celular físico (Expo Go): use o IP da máquina na rede WiFi.
// PC e celular precisam estar na MESMA rede. Se trocar de rede, atualize o IP
// (Windows: ipconfig -> IPv4 do adaptador Wi-Fi).
const LAN_IP = "192.168.15.23";

export const JAVA_API_BASE_URL = `http://${LAN_IP}:8080`;   // API Java (Spring) local
export const DOTNET_API_BASE_URL = `http://${LAN_IP}:5128`; // API .NET local

// --- Alternativas (descomente conforme o cenário) ---
// Emulador Android:  Java http://10.0.2.2:8080  |  .NET http://10.0.2.2:5128
// iOS Simulator/Web: Java http://localhost:8080  |  .NET http://localhost:5128
// Java publicado:    https://guia-safra-api.onrender.com