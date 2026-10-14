import React from 'react';
import {
  LayoutDashboard,
  Cctv,
  Users,
  Boxes,
  BellRing,
  Sparkles,
  Cpu,
  Layers,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeCamerasCount,
    totalCamerasCount,
    openAlertsCount,
    emptyShelvesCount,
    lowStockCount,
    resetDemoData,
  } = useDemo();

  const navItems: NavGroup[] = [
    {
      group: 'PRODUCT SHOWCASE',
      items: [
        { id: 'landing', label: 'Product Landing', icon: Sparkles, badge: 'Overview' },
      ],
    },
    {
      group: 'VISION SECURITY',
      items: [
        { id: 'overview', label: 'Overview Dashboard', icon: LayoutDashboard },
        {
          id: 'cameras',
          label: 'Camera Monitoring',
          icon: Cctv,
          badge: `${activeCamerasCount}/${totalCamerasCount}`,
          badgeColor: 'var(--emerald-500)',
        },
        {
          id: 'analytics',
          label: 'People Analytics',
          icon: Users,
          badge: '2.8k',
          badgeColor: 'var(--accent-cyan)',
        },
      ],
    },
    {
      group: 'VISION INVENTORY',
      items: [
        {
          id: 'inventory',
          label: 'Vision Shelf Inventory',
          icon: Boxes,
          badge: `${emptyShelvesCount + lowStockCount} Alert`,
          badgeColor: emptyShelvesCount > 0 ? '#EF4444' : '#F59E0B',
        },
      ],
    },
    {
      group: 'OPERATIONS',
      items: [
        {
          id: 'alerts',
          label: 'Alerts & Reports',
          icon: BellRing,
          badge: openAlertsCount > 0 ? `${openAlertsCount}` : undefined,
          badgeColor: '#EF4444',
        },
      ],
    },
  ];

  return (
    <aside
      style={{
        width: '270px',
        minWidth: '270px',
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          onClick={() => setActiveTab('landing')}
          style={{
            padding: '20px 22px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #123B2A 0%, #14B8A6 100%)',
              border: '1px solid rgba(45, 212, 191, 0.4)',
              boxShadow: '0 0 16px rgba(20, 184, 166, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.02em', lineHeight: '1.2' }}>
              AI Surveillance
            </div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-teal-bright)', letterSpacing: '0.04em' }}>
              & INVENTORY BOT
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div style={{ padding: '16px 12px' }}>
          {navItems.map((sec, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <div
                style={{
                  padding: '4px 12px 8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {sec.group}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {sec.items.map(item => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'var(--accent-forest)' : 'transparent',
                        border: isActive ? '1px solid rgba(45, 212, 191, 0.3)' : '1px solid transparent',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        fontSize: '13px',
                        fontWeight: isActive ? 600 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon
                          size={17}
                          style={{
                            color: isActive ? 'var(--accent-teal-bright)' : 'var(--text-muted)',
                          }}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: '9999px',
                            background: isActive ? 'rgba(255, 255, 255, 0.15)' : 'var(--bg-primary)',
                            color: item.badgeColor || 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Telemetry & Model specs */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)', background: 'rgba(7, 10, 16, 0.6)' }}>
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Cpu size={14} style={{ color: 'var(--accent-cyan)' }} />
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
              CV Pipeline v2.8
            </span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Detector:</span>
              <span style={{ color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>YOLOv11x</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tracker:</span>
              <span style={{ color: '#E2E8F0', fontFamily: 'var(--font-mono)' }}>ByteTrack</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Stream Ingest:</span>
              <span style={{ color: 'var(--emerald-500)', fontFamily: 'var(--font-mono)' }}>6 RTSP</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>Prototype build 1.0</span>
          <button
            onClick={resetDemoData}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '11px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title="Reset to default initial scenario"
          >
            <RotateCcw size={11} /> Reset Data
          </button>
        </div>
      </div>
    </aside>
  );
};
