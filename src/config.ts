// ============================================================================
// CONFIGURAÇÕES GLOBAIS DO APP
// ============================================================================

import { Platform } from "react-native";

const SEU_IP_LOCAL = "SEU-IP-LOCAL"; // <- SE ESTIVER NO CELULAR FÍSICO, MUDE ESTE IP

export const JAVA_API_BASE_URL =
  Platform.OS === "android"
    ? "http://localhost:8080/" // Android Emulator ou Físico (Java API)
    : "https://guia-safra-api.onrender.com/"; // iOS Simulator e Web (Java API)

export const DOTNET_API_BASE_URL =
  Platform.OS === "android"
    ? `http://${SEU_IP_LOCAL}:5128` // Android Emulator ou Físico (.NET API)
    : `http://0.0.0.0:5128/`; // iOS Simulator e Web (.NET API)