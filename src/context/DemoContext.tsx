import React, { createContext, useContext, useState, useEffect } from 'react';
import { Camera, InventoryItem, Alert, LocationOption, HourlyTraffic, DailyTrend } from '../types';
import { INITIAL_CAMERAS, INITIAL_INVENTORY, INITIAL_ALERTS, INITIAL_LOCATIONS, HOURLY_TRAFFIC, DAILY_TRENDS } from '../data/mockData';

interface DemoContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cameras: Camera[];
  inventory: InventoryItem[];
  alerts: Alert[];
  locations: LocationOption[];
  selectedLocation: LocationOption;
  setSelectedLocation: (loc: LocationOption) => void;
  dateRange: 'today' | '7days' | 'month';
  setDateRange: (range: 'today' | '7days' | 'month') => void;
  selectedCameraForModal: Camera | null;
  setSelectedCameraForModal: (cam: Camera | null) => void;
  hourlyTraffic: HourlyTraffic[];
  dailyTrends: DailyTrend[];
  resolveAlert: (alertId: string, notes: string) => void;
  acknowledgeAlert: (alertId: string) => void;
  updateInventoryStock: (sku: string, newVisibleStock: number, notes?: string) => void;
  resetDemoData: () => void;
  // Computed stats
  activeCamerasCount: number;
  degradedCamerasCount: number;
  totalCamerasCount: number;
  visitorsToday: number;
  currentOccupancy: number;
  openAlertsCount: number;
  inventoryAlertsCount: number;
  securityEventsCount: number;
  emptyShelvesCount: number;
  lowStockCount: number;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const STORAGE_KEY_CAMERAS = 'agy_vision_cameras_v1';
const STORAGE_KEY_INVENTORY = 'agy_vision_inventory_v1';
const STORAGE_KEY_ALERTS = 'agy_vision_alerts_v1';
const STORAGE_KEY_TAB = 'agy_vision_tab_v1';

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_TAB) || 'landing';
  });

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    localStorage.setItem(STORAGE_KEY_TAB, tab);
  };

  const [cameras, setCameras] = useState<Camera[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CAMERAS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_CAMERAS;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INVENTORY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_INVENTORY;
  });

  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ALERTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_ALERTS;
  });

  const [locations] = useState<LocationOption[]>(INITIAL_LOCATIONS);
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>(INITIAL_LOCATIONS[0]);
  const [dateRange, setDateRange] = useState<'today' | '7days' | 'month'>('today');
  const [selectedCameraForModal, setSelectedCameraForModal] = useState<Camera | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CAMERAS, JSON.stringify(cameras));
  }, [cameras]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INVENTORY, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(alerts));
  }, [alerts]);

  const resolveAlert = (alertId: string, notes: string) => {
    const nowStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by Store Manager`;
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'resolved', resolutionNotes: notes, resolvedAt: nowStr } : a))
    );
  };

  const acknowledgeAlert = (alertId: string) => {
    const nowStr = `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} by Staff`;
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'acknowledged', acknowledgedAt: nowStr } : a))
    );
  };

  const updateInventoryStock = (sku: string, newVisibleStock: number, notes?: string) => {
    const nowTime = `Just now (Manual Audit)`;
    setInventory(prev =>
      prev.map(item => {
        if (item.sku === sku) {
          let newStatus: InventoryItem['status'] = 'optimal';
          if (newVisibleStock === 0) newStatus = 'empty';
          else if (newVisibleStock < item.threshold) newStatus = 'low_stock';

          return {
            ...item,
            visibleStock: newVisibleStock,
            status: newStatus,
            lastInspection: nowTime,
            notes: notes || item.notes,
          };
        }
        return item;
      })
    );

    // If restocking raised stock above threshold, auto-resolve any open alert for this SKU
    if (newVisibleStock > 0) {
      setAlerts(prev =>
        prev.map(a => {
          if (a.sku === sku && a.status !== 'resolved') {
            return {
              ...a,
              status: 'resolved',
              resolutionNotes: `Auto-resolved after visual stock replenished to ${newVisibleStock} units.`,
              resolvedAt: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (Auto)`,
            };
          }
          return a;
        })
      );
    }
  };

  const resetDemoData = () => {
    setCameras(INITIAL_CAMERAS);
    setInventory(INITIAL_INVENTORY);
    setAlerts(INITIAL_ALERTS);
    setSelectedLocation(INITIAL_LOCATIONS[0]);
    setDateRange('today');
    localStorage.removeItem(STORAGE_KEY_CAMERAS);
    localStorage.removeItem(STORAGE_KEY_INVENTORY);
    localStorage.removeItem(STORAGE_KEY_ALERTS);
  };

  // Computed metrics
  const activeCamerasCount = cameras.filter(c => c.status === 'online').length;
  const degradedCamerasCount = cameras.filter(c => c.status === 'degraded').length;
  const totalCamerasCount = cameras.length;
  const visitorsToday = 2842;
  const currentOccupancy = 184;
  const openAlertsCount = alerts.filter(a => a.status === 'open').length;
  const inventoryAlertsCount = alerts.filter(a => a.category === 'inventory' && a.status !== 'resolved').length;
  const securityEventsCount = alerts.filter(a => a.category === 'security' && a.status !== 'resolved').length;
  const emptyShelvesCount = inventory.filter(i => i.status === 'empty').length;
  const lowStockCount = inventory.filter(i => i.status === 'low_stock').length;

  return (
    <DemoContext.Provider
      value={{
        activeTab,
        setActiveTab,
        cameras,
        inventory,
        alerts,
        locations,
        selectedLocation,
        setSelectedLocation,
        dateRange,
        setDateRange,
        selectedCameraForModal,
        setSelectedCameraForModal,
        hourlyTraffic: HOURLY_TRAFFIC,
        dailyTrends: DAILY_TRENDS,
        resolveAlert,
        acknowledgeAlert,
        updateInventoryStock,
        resetDemoData,
        activeCamerasCount,
        degradedCamerasCount,
        totalCamerasCount,
        visitorsToday,
        currentOccupancy,
        openAlertsCount,
        inventoryAlertsCount,
        securityEventsCount,
        emptyShelvesCount,
        lowStockCount,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
