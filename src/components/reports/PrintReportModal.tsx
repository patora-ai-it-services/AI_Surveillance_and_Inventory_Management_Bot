import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { X, Printer, ShieldCheck, Download, Calendar, MapPin } from 'lucide-react';

interface PrintReportModalProps {
  onClose: () => void;
}

export const PrintReportModal: React.FC<PrintReportModalProps> = ({ onClose }) => {
  const {
    selectedLocation,
    cameras,
    inventory,
    alerts,
    visitorsToday,
    currentOccupancy,
    activeCamerasCount,
    totalCamerasCount,
  } = useDemo();

  const handlePrint = () => {
    window.print();
  };

  const emptyShelves = inventory.filter(i => i.status === 'empty');
  const lowStock = inventory.filter(i => i.status === 'low_stock');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '880px',
          background: '#FFFFFF',
          color: '#0F172A',
          padding: '40px',
          borderRadius: '12px',
        }}
      >
        {/* Printable Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #E2E8F0', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div style={{ background: '#123B2A', color: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 800 }}>
                AI SURVEILLANCE & INVENTORY
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>CONFIDENTIAL REPORT</span>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Daily Vision Surveillance & Inventory Briefing
            </h2>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#64748B', marginTop: '6px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} /> {selectedLocation.name}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> Generated: {new Date().toLocaleDateString()} (Shift 1)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handlePrint}
              style={{
                background: '#10B981',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Printer size={14} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: '#F1F5F9',
                color: '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '8px',
                cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>CCTV Uptime</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{activeCamerasCount}/{totalCamerasCount} Streams</div>
            <div style={{ fontSize: '11px', color: '#10B981' }}>99.2% availability</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Visitors Today</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{visitorsToday.toLocaleString()}</div>
            <div style={{ fontSize: '11px', color: '#10B981' }}>Peak: 410 / hr (18:00)</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Shelf Voids</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#EF4444' }}>{emptyShelves.length} Critical</div>
            <div style={{ fontSize: '11px', color: '#F59E0B' }}>{lowStock.length} Low stock gaps</div>
          </div>
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase' }}>Open Incidents</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A' }}>{alerts.filter(a => a.status === 'open').length}</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>1 security, 2 inventory</div>
          </div>
        </div>

        {/* Section 1: Shelf Inventory Discrepancies */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '15px', color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            1. Planogram Shelf Depletion Audit
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', borderBottom: '1px solid #CBD5E1' }}>
                <th style={{ padding: '8px 12px' }}>SKU</th>
                <th style={{ padding: '8px 12px' }}>Product</th>
                <th style={{ padding: '8px 12px' }}>Shelf Location</th>
                <th style={{ padding: '8px 12px' }}>POS Record</th>
                <th style={{ padding: '8px 12px' }}>AI Visible</th>
                <th style={{ padding: '8px 12px' }}>Condition</th>
              </tr>
            </thead>
            <tbody>
              {inventory.slice(0, 5).map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>{item.sku}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: '8px 12px', color: '#64748B' }}>{item.shelfLocation}</td>
                  <td style={{ padding: '8px 12px' }}>{item.expectedStock}</td>
                  <td style={{ padding: '8px 12px', fontWeight: 700, color: item.visibleStock === 0 ? '#EF4444' : item.visibleStock < item.threshold ? '#F59E0B' : '#0F172A' }}>
                    {item.visibleStock}
                  </td>
                  <td style={{ padding: '8px 12px' }}>
                    <span style={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 700, color: item.status === 'empty' ? '#EF4444' : item.status === 'low_stock' ? '#F59E0B' : '#10B981' }}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: Camera Availability & Operational Notes */}
        <div>
          <h3 style={{ fontSize: '15px', color: '#0F172A', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            2. Camera Stream Availability Matrix
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', fontSize: '12px' }}>
            {cameras.map(cam => (
              <div key={cam.id} style={{ border: '1px solid #E2E8F0', borderRadius: '6px', padding: '10px' }}>
                <div style={{ fontWeight: 700 }}>{cam.code} - {cam.name.split('-')[0]}</div>
                <div style={{ color: '#64748B', fontSize: '11px' }}>{cam.zone}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px' }}>
                  <span>Status: <strong style={{ color: cam.status === 'online' ? '#10B981' : '#F59E0B' }}>{cam.status.toUpperCase()}</strong></span>
                  <span>{cam.fps} FPS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off footer */}
        <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748B' }}>
          <span>Generated by AI Surveillance & Inventory Management Bot Engine v2.8</span>
          <span>Verified by: ________________________ (Duty Store Manager)</span>
        </div>
      </div>
    </div>
  );
};
