import axios from "axios";
import { JAVA_API_BASE_URL, DOTNET_API_BASE_URL } from "../config";
import { Alert, Reading, WateringEvent, Batch, Species } from "../Types/BatchType";
import { ClimateForecast } from "../Types/ForecastType";

/**
 * Axios instance for the Java API.
 */
const api = axios.create({
  baseURL: JAVA_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios instance for the .NET API.
 */
export const dotnetApi = axios.create({
  baseURL: DOTNET_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interface for Spring Data Page responses.
 */
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// ===================================
//         Batch (.NET API)
// ===================================

export async function FetchBatches() {
  try {
    const response = await dotnetApi.get<Batch[]>("/api/Slot");
    return response.data;
  } catch (error) {
    console.error("Error fetching batches:", error);
    throw error;
  }
}

export async function FetchBatchById(id: number) {
  try {
    const response = await dotnetApi.get<Batch>(`/api/Slot/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching batch ${id}:`, error);
    throw error;
  }
}

export async function createBatch(data: { speciesId: number; position: string; plantedAt: string }) {
  try {
    const response = await dotnetApi.post<Batch>("/api/Slot", data);
    return response.data;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw error;
  }
}

export async function updateBatch(id: number, data: { speciesId: number; position: string; plantedAt: string }) {
  try {
    const response = await dotnetApi.put<Batch>(`/api/Slot/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating batch ${id}:`, error);
    throw error;
  }
}

export async function deleteBatch(id: number) {
  try {
    await dotnetApi.delete(`/api/Slot/${id}`);
  } catch (error) {
    console.error(`Error deleting batch ${id}:`, error);
    throw error;
  }
}

// ===================================
//         Species (.NET API)
// ===================================

export async function FetchSpecies() {
  try {
    const response = await dotnetApi.get<Species[]>("/api/Species");
    return response.data;
  } catch (error) {
    console.error("Error fetching species:", error);
    throw error;
  }
}

export async function FetchSpeciesById(id: number) {
  try {
    const response = await dotnetApi.get<Species>(`/api/Species/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching species ${id}:`, error);
    throw error;
  }
}

export async function createSpecies(data: Omit<Species, 'id'>) {
  try {
    const response = await dotnetApi.post<Species>("/api/Species", data);
    return response.data;
  } catch (error) {
    console.error("Error creating species:", error);
    throw error;
  }
}

export async function updateSpecies(id: number, data: Omit<Species, 'id'>) {
  try {
    const response = await dotnetApi.put<Species>(`/api/Species/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating species ${id}:`, error);
    throw error;
  }
}

// ===================================
//         Usuários Endpoints
// ===================================

/**
 * Fetches the list of users.
 * GET /usuarios
 */
export async function listUsers() {
  try {
    const response = await api.get<PageResponse<any>>("/usuarios");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

// ===================================
//         Leituras Endpoints
// ===================================

/**
 * Fetches sensor readings. 
 * Can filter by slotId to get historical data for a specific batch.
 * GET /leituras
 */
export async function getReadings(slotId?: number) {
  try {
    const params = slotId ? { slotId } : {};
    const response = await api.get<PageResponse<Reading>>("/leituras", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching readings:", error);
    throw error;
  }
}

/**
 * Registers a new sensor reading.
 * POST /leituras
 */
export async function createReading(data: Omit<Reading, 'id'>) {
  try {
    const response = await api.post<Reading>("/leituras", data);
    return response.data;
  } catch (error) {
    console.error("Error creating reading:", error);
    throw error;
  }
}

// ===================================
//         Alertas Endpoints
// ===================================

/**
 * Fetches the list of alerts.
 * GET /alertas
 */
export async function getAlerts(slotId?: number, resolved?: boolean) {
  try {
    const params = { slotId, resolved };
    const response = await api.get<PageResponse<Alert>>("/alertas", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching alerts:", error);
    throw error;
  }
}

/**
 * Marks an alert as resolved.
 * PUT /alertas/{id}/resolver
 */
export async function resolveAlert(id: number) {
  try {
    const response = await api.put<Alert>(`/alertas/${id}/resolver`);
    return response.data;
  } catch (error) {
    console.error("Error resolving alert:", error);
    throw error;
  }
}

// ===================================
//        Previsões Endpoints
// ===================================

/**
 * Fetches climate forecasts.
 * GET /previsoes
 */
export async function getForecasts() {
  try {
    const response = await api.get<PageResponse<ClimateForecast>>("/previsoes");
    return response.data;
  } catch (error) {
    console.error("Error fetching forecasts:", error);
    throw error;
  }
}

/**
 * Triggers a synchronization with the external weather API.
 * POST /previsoes/sincronizar
 */
export async function syncForecasts(days: number = 7) {
  try {
    const response = await api.post(`/previsoes/sincronizar`, null, {
      params: { dias: days },
    });
    return response.data;
  } catch (error) {
    console.error("Error syncing forecasts:", error);
    throw error;
  }
}

// ===================================
//         Regas Endpoints
// ===================================

/**
 * Busca eventos de rega.
 * GET /regas
 */
export async function getWateringEvents(slotId?: number) {
  try {
    const params = slotId ? { slotId } : {};
    const response = await api.get<PageResponse<WateringEvent>>("/regas", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching watering events:", error);
    throw error;
  }
}

/**
 * Registra um novo evento de rega (manual ou automático).
 * POST /regas
 */
export async function createWateringEvent(data: Partial<WateringEvent>) {
  try {
    const response = await api.post<WateringEvent>("/regas", data);
    return response.data;
  } catch (error) {
    console.error("Error creating watering event:", error);
    throw error;
  }
}
export default api;

// Aliases para compatibilidade e correção de typos
export const FetchBatch = FetchBatches;
export const FectSpecies = FetchSpecies;
export const FetchSpeciesList = FetchSpecies;