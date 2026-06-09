/**
 * representa uma previsão climática.
 * Mapeado de acordo com a tabela Java TB_MON_CLIMATE_FORECAST.
 */
export type ClimateForecast = {
  id: number;
  forecastDate: string; // ISO Date (yyyy-MM-dd)
  minTemp: number;
  maxTemp: number;
  rainfallMm: number;
  frostProb: number; // Probability (0-100)
  source: 'OPEN_METEO' | 'MANUAL';
  createdAt: string; // ISO Timestamp
};

/**
 * Tipagem auxiliar para resultados de sincronização de previsões.
 */
export type ForecastSyncResponse = {
  forecasts: ClimateForecast[];
};
