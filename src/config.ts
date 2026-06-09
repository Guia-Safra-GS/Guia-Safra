// ============================================================================
// CONFIGURAÇÕES GLOBAIS DO APP
// ============================================================================

import { Platform } from "react-native";

export const JAVA_API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000" // Android Emulator
    : "https://guia-safra-api.onrender.com/"; // iOS Simulator e Web (Java API)

export const DOTNET_API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5128" // Android Emulator (.NET API)
    : "http://localhost:5128"; // iOS Simulator e Web (.NET API)

// 👇 Se você for usar celular físico, COMENTE as linhas acima e DESCOMENTE:
// export const API_BASE_URL = "http://192.168.0.10:3000";