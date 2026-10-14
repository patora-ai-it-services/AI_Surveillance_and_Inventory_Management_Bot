export type CameraStatus = 'online' | 'degraded' | 'offline';

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertCategory = 'inventory' | 'security' | 'camera';
export type AlertStatus = 'open' | 'acknowledged' | 'resolved';

export type StockStatus = 'optimal' | 'low_stock' | 'empty' | 'misplaced';

export interface Camera {
  id: string;
  name: string;
  code: string;
  location: string;
  zone: string;
  status: CameraStatus;
  fps: number;
  resolution: string;
  bitrate: string;
  uptime: string;
  activeDetections: {
    label: string;
    confidence: number;
    box: [number, number, number, number]; // [x, y, w, h] in percentages
    color: string;
  }[];
  personCount: number;
  lastEvent: string;
  lastEventTime: string;
  coverageType: 'entrance' | 'aisle' | 'shelf' | 'warehouse' | 'exit' | 'dock';
  rtspUrl: string;
  firmware: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  shelfLocation: string; // e.g., 'Aisle 3 - Rack B2'
  rackId: string; // e.g., 'RACK-B'
  slotIndex: number; // 0 to 7
  expectedStock: number; // From ERP/POS ground truth
  visibleStock: number; // AI estimated visible units
  threshold: number; // Alert threshold
  unitPrice: number;
  status: StockStatus;
  lastInspection: string;
  cameraId: string; // Linked camera
  confidence: number;
  notes?: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  timestamp: string;
  location: string;
  cameraId?: string;
  sku?: string;
  resolutionNotes?: string;
  resolvedAt?: string;
  acknowledgedAt?: string;
}

export interface HourlyTraffic {
  hour: string;
  entries: number;
  exits: number;
  occupancy: number;
  dwellTimeAvgMin: number;
}

export interface DailyTrend {
  date: string;
  totalVisitors: number;
  peakOccupancy: number;
  alertsTriggered: number;
  avgDwellMinutes: number;
}

export interface LocationOption {
  id: string;
  name: string;
  address: string;
  cameraCount: number;
}
