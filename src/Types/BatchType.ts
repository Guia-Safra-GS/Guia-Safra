/**
 * Represents a plant species and its ideal growing conditions.
 * Mapped from Java TB_CAD_SPECIES.
 */
export type Species = {
  id: number;
  commonName: string;
  scientificName?: string;
  minHumidity: number;
  maxHumidity: number;
  frostMinTemp?: number;
  wateringMl: number;
};

/**
 * Represents the status of a Slot/Batch.
 * Mapped from Java Slot status.
 */
export type BatchStatus = 'ACTIVE' | 'INACTIVE' | 'HARVESTED';

/**
 * Represents a planting slot (Lote).
 * Mapped from Java TB_CAD_SLOT.
 */
export type Batch = {
  id: number;
  speciesId: number;
  position: string; // e.g., "A1", "B3"
  plantedAt: string; // ISO Date
  status: BatchStatus;
  createdAt: string; // ISO Timestamp
  species?: Species; // Optional joined data
};

/**
 * Represents a sensor reading.
 * Mapped from Java TB_MON_READING.
 */
export type Reading = {
  slotId: number;
  readTimestamp: string; // ISO Timestamp
  humidity: number;
  temperature?: number;
};

/**
 * Represents the origin of a watering event.
 */
export type WateringOrigin = 'MANUAL' | 'AUTOMATIC';

/**
 * Represents a watering event.
 * Mapped from Java TB_MON_WATERING_EVENT.
 */
export type WateringEvent = {
  id: number;
  slotId: number;
  userId?: number;
  origin: WateringOrigin;
  volumeMl: number;
  eventTime: string; // ISO Timestamp
};

/**
 * Represents the severity level of an alert.
 */
export type Severity = 'LOW' | 'MEDIUM' | 'CRITICAL';

/**
 * Represents an alert.
 * Mapped from Java TB_MON_ALERT.
 */
export type Alert = {
  id: number;
  slotId: number;
  alertType: string; // e.g., "LOW_HUMIDITY", "FROST_RISK"
  severity: Severity;
  message?: string;
  alertTime: string; // ISO Timestamp
  resolved: boolean;
};

/**
 * Helper type for creating new batches (excluding server-generated IDs).
 */
export type CreateBatchInput = Omit<Batch, 'id' | 'createdAt'>;
