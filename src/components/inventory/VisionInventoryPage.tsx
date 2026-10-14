import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { InventoryItem } from '../../types';
import { StockAdjustmentModal } from './StockAdjustmentModal';
import {
  Boxes,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit3,
  Layers,
  Cctv,
  RefreshCw,
  Info,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';

export const VisionInventoryPage: React.FC = () => {
  const { inventory, cameras, setSelectedCameraForModal, setActiveTab } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const filteredItems = inventory.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shelfLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(inventory.map(i => i.category)));

  // Rack B specific slots for the visualizer
  const rackBItems = inventory.filter(i => i.rackId === 'RACK-B');

  const handleOpenCam03 = () => {
    const cam = cameras.find(c => c.id === 'cam-03');
    if (cam) setSelectedCameraForModal(cam);
  };

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC' }}>
              Vision Shelf Inventory Intelligence
            </h1>
            <span className="badge badge-info">Edge Model: YOLOv11x-ShelfScan</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Continuous overhead visual planogram monitoring, empty shelf void detection, and automatic restock alerting.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleOpenCam03} className="btn btn-secondary btn-sm">
            <Cctv size={14} />
            Live Feed: CAM-03 (Shelf B)
          </button>
        </div>
      </div>

      {/* Interactive Shelf Rack Visualizer */}
      <div className="card" style={{ marginBottom: '28px', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: 'var(--accent-forest)', color: '#34D399', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                RACK-B (Aisle 3)
              </span>
              <h3 style={{ fontSize: '16px', color: '#F8FAFC' }}>Visual Shelf Planogram Matrix</h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Simulated 2D planogram scan monitored by ceiling camera CAM-03 (2560x1440 2K)
            </p>
          </div>

          <div style={{ display: 'flex', gap: '14px', fontSize: '11px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10B981' }} />
              Optimal Stock (&gt;70%)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#FBBF24' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F59E0B' }} />
              Low Stock Alert
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#F87171' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#EF4444' }} />
              Empty Void Gap
            </span>
          </div>
        </div>

        {/* Shelf Shelving Rack Visualization */}
        <div
          style={{
            background: '#080C14',
            border: '2px solid #1E2B45',
            borderRadius: '10px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          {rackBItems.map((item, idx) => {
            const isCriticalEmpty = item.status === 'empty';
            const isLow = item.status === 'low_stock';

            return (
              <div
                key={item.id}
                onClick={() => setEditingItem(item)}
                style={{
                  background: isCriticalEmpty
                    ? 'rgba(239, 68, 68, 0.08)'
                    : isLow
                    ? 'rgba(245, 158, 11, 0.08)'
                    : 'rgba(16, 185, 129, 0.06)',
                  border: isCriticalEmpty
                    ? '2px dashed #EF4444'
                    : isLow
                    ? '1px solid #F59E0B'
                    : '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.01)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: 'var(--bg-card)',
                      color: isCriticalEmpty ? '#F87171' : isLow ? '#FBBF24' : '#34D399',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border)',
                    }}
                  >
                    Slot B{idx + 1}
                  </div>

                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {item.shelfLocation} • SKU: {item.sku}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {/* Stock Bar Graphic */}
                  <div style={{ width: '140px', textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: isCriticalEmpty ? '#EF4444' : isLow ? '#F59E0B' : '#10B981', fontFamily: 'var(--font-mono)' }}>
                      {item.visibleStock} / {item.expectedStock} units
                    </div>
                    <div style={{ width: '100%', height: '5px', background: 'var(--bg-primary)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${Math.min(100, (item.visibleStock / item.expectedStock) * 100)}%`,
                          height: '100%',
                          background: isCriticalEmpty ? '#EF4444' : isLow ? '#F59E0B' : '#10B981',
                        }}
                      />
                    </div>
                  </div>

                  <span className={`badge badge-${item.status}`}>
                    {item.status === 'empty' ? 'VOID DETECTED' : item.status.replace('_', ' ')}
                  </span>

                  <button className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                    <Edit3 size={12} /> Restock
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SKU Table Filters */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ flex: '1', minWidth: '240px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by SKU, product name, or shelf..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 12px 8px 36px',
              color: '#FFFFFF',
              fontFamily: 'inherit',
              fontSize: '13px',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Items ({inventory.length})
          </button>
          <button
            onClick={() => setStatusFilter('empty')}
            className={`btn btn-sm ${statusFilter === 'empty' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Empty (1)
          </button>
          <button
            onClick={() => setStatusFilter('low_stock')}
            className={`btn btn-sm ${statusFilter === 'low_stock' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Low Stock (2)
          </button>
          <button
            onClick={() => setStatusFilter('optimal')}
            className={`btn btn-sm ${statusFilter === 'optimal' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Optimal
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Category:</span>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'inherit',
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory SKU Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '14px 18px' }}>Product & SKU</th>
              <th style={{ padding: '14px 18px' }}>Shelf Location</th>
              <th style={{ padding: '14px 18px' }}>Expected (POS)</th>
              <th style={{ padding: '14px 18px' }}>Visible (CV)</th>
              <th style={{ padding: '14px 18px' }}>Variance</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px' }}>Last Inspection</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => {
              const variance = item.visibleStock - item.expectedStock;
              return (
                <tr
                  key={item.id}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 700, color: '#F8FAFC' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--accent-teal-bright)', fontFamily: 'var(--font-mono)' }}>
                      {item.sku} • {item.category}
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                    {item.shelfLocation}
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {item.expectedStock} units
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>
                    <strong style={{ color: item.visibleStock === 0 ? '#EF4444' : item.visibleStock < item.threshold ? '#F59E0B' : '#10B981' }}>
                      {item.visibleStock} units
                    </strong>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {Math.round(item.confidence * 100)}% conf
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: variance < 0 ? '#EF4444' : '#10B981' }}>
                      {variance === 0 ? '0' : `${variance}`}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className={`badge badge-${item.status}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    {item.lastInspection}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      <Edit3 size={12} /> Adjust
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Stock Adjustment Modal */}
      {editingItem && (
        <StockAdjustmentModal item={editingItem} onClose={() => setEditingItem(null)} />
      )}
    </div>
  );
};
