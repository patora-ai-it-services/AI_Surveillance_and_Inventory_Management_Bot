import React from 'react';
import {
  Cctv,
  Users,
  Boxes,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  Eye,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useDemo } from '../../context/DemoContext';

export const OverviewDashboard: React.FC = () => {
  const {
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
    cameras,
    alerts,
    inventory,
    hourlyTraffic,
    setActiveTab,
    setSelectedCameraForModal,
  } = useDemo();

  const maxCapacity = 350;
  const occupancyPercent = Math.round((currentOccupancy / maxCapacity) * 100);

  const urgentInventoryItems = inventory.filter(i => i.status === 'empty' || i.status === 'low_stock').slice(0, 3);
  const recentAlerts = alerts.filter(a => a.status !== 'resolved').slice(0, 4);

  return (
    <div className="page-wrapper">
      {/* Title & Context */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            Executive Operations Overview
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Real-time multi-camera computer vision telemetry, visitor occupancy, and shelf inventory replenishment status.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('inventory')} className="btn btn-secondary btn-sm">
            <Boxes size={14} />
            Inspect Shelf Visualizer
          </button>
          <button onClick={() => setActiveTab('alerts')} className="btn btn-primary btn-sm">
            <ShieldAlert size={14} />
            Manage Alerts ({openAlertsCount})
          </button>
        </div>
      </div>

      {/* 5 Primary KPI Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        {/* KPI 1: Active Cameras */}
        <div
          className="card"
          onClick={() => setActiveTab('cameras')}
          style={{ cursor: 'pointer', borderLeft: '4px solid #10B981' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Active Cameras
            </span>
            <div style={{ background: 'var(--emerald-bg)', color: '#34D399', padding: '6px', borderRadius: '6px' }}>
              <Cctv size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {activeCamerasCount} / {totalCamerasCount}
          </div>
          <div style={{ fontSize: '12px', color: degradedCamerasCount > 0 ? '#FBBF24' : '#10B981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className={`pulse-dot ${degradedCamerasCount > 0 ? 'amber' : ''}`} style={{ width: '6px', height: '6px' }} />
            <span>{degradedCamerasCount > 0 ? `${degradedCamerasCount} Degraded (CAM-05)` : 'All Streams Nominal'}</span>
          </div>
        </div>

        {/* KPI 2: Visitors Today */}
        <div
          className="card"
          onClick={() => setActiveTab('analytics')}
          style={{ cursor: 'pointer', borderLeft: '4px solid #06B6D4' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Visitors Today
            </span>
            <div style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#22D3EE', padding: '6px', borderRadius: '6px' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {visitorsToday.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} />
            <span>+12.4% vs same time last week</span>
          </div>
        </div>

        {/* KPI 3: Current Occupancy */}
        <div
          className="card"
          onClick={() => setActiveTab('analytics')}
          style={{ cursor: 'pointer', borderLeft: '4px solid #3B82F6' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Current Occupancy
            </span>
            <div style={{ background: 'var(--blue-bg)', color: '#60A5FA', padding: '6px', borderRadius: '6px' }}>
              <Zap size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {currentOccupancy} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {maxCapacity}</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ width: '100%', height: '6px', background: 'var(--bg-primary)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${occupancyPercent}%`,
                  height: '100%',
                  background: occupancyPercent > 80 ? '#EF4444' : '#14B8A6',
                  borderRadius: '3px',
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>{occupancyPercent}% capacity</span>
              <span>Fire limit: {maxCapacity}</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Inventory Alerts */}
        <div
          className="card"
          onClick={() => setActiveTab('inventory')}
          style={{ cursor: 'pointer', borderLeft: '4px solid #EF4444' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Inventory Voids
            </span>
            <div style={{ background: 'var(--rose-bg)', color: '#F87171', padding: '6px', borderRadius: '6px' }}>
              <Boxes size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {emptyShelvesCount + lowStockCount}
          </div>
          <div style={{ fontSize: '12px', color: '#F87171', marginTop: '6px' }}>
            <strong>{emptyShelvesCount} Empty</strong> • {lowStockCount} Low-stock gaps
          </div>
        </div>

        {/* KPI 5: Security Events */}
        <div
          className="card"
          onClick={() => setActiveTab('alerts')}
          style={{ cursor: 'pointer', borderLeft: '4px solid #F59E0B' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Security Incidents
            </span>
            <div style={{ background: 'var(--amber-bg)', color: '#FBBF24', padding: '6px', borderRadius: '6px' }}>
              <ShieldAlert size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {securityEventsCount}
          </div>
          <div style={{ fontSize: '12px', color: '#FBBF24', marginTop: '6px' }}>
            1 Showcase loitering • 1 Perimeter
          </div>
        </div>
      </div>

      {/* Main Grid: Visitor Traffic Chart & Camera Health Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {/* Foot Traffic Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#F8FAFC', marginBottom: '2px' }}>
                Hourly Visitor Inflow vs Store Occupancy
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Tripwire bi-directional crossline sensor analytics (Store #104)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34D399' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10B981' }} />
                Entries
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#06B6D4' }} />
                Occupancy
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTraffic} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="entryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2B45" vertical={false} />
                <XAxis dataKey="hour" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#0D131F',
                    border: '1px solid #2A3C5E',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#F8FAFC',
                  }}
                />
                <Area type="monotone" dataKey="entries" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#entryGrad)" name="Hourly Inflow" />
                <Area type="monotone" dataKey="occupancy" stroke="#06B6D4" strokeWidth={2} fillOpacity={1} fill="url(#occGrad)" name="Active Occupancy" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Camera Grid Teaser */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '15px', color: '#F8FAFC' }}>Camera Stream Matrix</h3>
              <button
                onClick={() => setActiveTab('cameras')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '11px', padding: '2px 6px' }}
              >
                View All (6) &rarr;
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cameras.slice(0, 4).map(cam => (
                <div
                  key={cam.id}
                  onClick={() => setSelectedCameraForModal(cam)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'var(--bg-primary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent-teal)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`pulse-dot ${cam.status === 'online' ? '' : 'amber'}`} />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC' }}>{cam.code} - {cam.name.split('-')[0]}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{cam.fps} FPS • {cam.activeDetections.length} Objects</div>
                    </div>
                  </div>
                  <Eye size={14} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)', fontSize: '11px', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
            <span>Network throughput: <strong style={{ color: '#F8FAFC' }}>24.9 Mbps</strong></span>
            <span>Edge latency: <strong style={{ color: '#10B981' }}>22ms</strong></span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Shelf Restock Attention & Unified Alert Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Urgent Shelf Restock Needed */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: 'var(--rose-bg)', color: '#F87171', padding: '5px', borderRadius: '6px' }}>
                <Boxes size={16} />
              </div>
              <h3 style={{ fontSize: '15px', color: '#F8FAFC' }}>Urgent Shelf Depletion Discrepancies</h3>
            </div>
            <button onClick={() => setActiveTab('inventory')} className="btn btn-ghost btn-sm" style={{ fontSize: '11px' }}>
              Inventory View &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {urgentInventoryItems.map(item => (
              <div
                key={item.id}
                onClick={() => setActiveTab('inventory')}
                style={{
                  padding: '12px',
                  background: 'var(--bg-primary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#F8FAFC' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.shelfLocation} • SKU: {item.sku}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                    <span className={`badge badge-${item.status}`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Visible: <strong style={{ color: item.visibleStock === 0 ? '#EF4444' : '#FBBF24' }}>{item.visibleStock}</strong> / POS: {item.expectedStock}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Operational Events Stream */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: 'var(--amber-bg)', color: '#FBBF24', padding: '5px', borderRadius: '6px' }}>
                <Clock size={16} />
              </div>
              <h3 style={{ fontSize: '15px', color: '#F8FAFC' }}>Recent System Events Timeline</h3>
            </div>
            <button onClick={() => setActiveTab('alerts')} className="btn btn-ghost btn-sm" style={{ fontSize: '11px' }}>
              Alerts Inbox &rarr;
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentAlerts.map(alt => (
              <div
                key={alt.id}
                onClick={() => setActiveTab('alerts')}
                style={{
                  padding: '10px 12px',
                  background: 'var(--bg-primary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`badge badge-${alt.severity}`} style={{ padding: '2px 6px', fontSize: '10px' }}>
                    {alt.severity}
                  </span>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#F8FAFC' }}>{alt.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{alt.location} • {alt.timestamp}</div>
                  </div>
                </div>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
