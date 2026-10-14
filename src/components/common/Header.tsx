import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, Bell, RefreshCw, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const Header: React.FC = () => {
  const {
    locations,
    selectedLocation,
    setSelectedLocation,
    dateRange,
    setDateRange,
    openAlertsCount,
    setActiveTab,
  } = useDemo();

  const [currentTime, setCurrentTime] = useState<string>('');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        padding: '12px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '33px', // beneath DemoBanner
        zIndex: 50,
      }}
    >
      {/* Location Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '7px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <div style={{ color: 'var(--accent-teal-bright)', display: 'flex' }}>
              <MapPin size={16} />
            </div>
            <span>{selectedLocation.name}</span>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {showLocationMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: '320px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 100,
              }}
            >
              <div style={{ padding: '6px 10px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Monitored Sites
              </div>
              {locations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationMenu(false);
                  }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    background: selectedLocation.id === loc.id ? 'rgba(20, 184, 166, 0.12)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background 0.15s ease',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: selectedLocation.id === loc.id ? 'var(--accent-teal-bright)' : 'var(--text-primary)' }}>
                      {loc.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {loc.address} • {loc.cameraCount} Streams
                    </div>
                  </div>
                  {selectedLocation.id === loc.id && (
                    <CheckCircle2 size={16} style={{ color: 'var(--accent-teal-bright)' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date / Time Horizon Selector */}
        <div
          style={{
            display: 'flex',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            padding: '3px',
            gap: '2px',
          }}
        >
          <button
            onClick={() => setDateRange('today')}
            style={{
              padding: '5px 12px',
              fontSize: '12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              background: dateRange === 'today' ? 'var(--accent-forest)' : 'transparent',
              color: dateRange === 'today' ? '#34D399' : 'var(--text-secondary)',
              fontWeight: dateRange === 'today' ? 600 : 400,
            }}
          >
            Today (Live)
          </button>
          <button
            onClick={() => setDateRange('7days')}
            style={{
              padding: '5px 12px',
              fontSize: '12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              background: dateRange === '7days' ? 'var(--accent-forest)' : 'transparent',
              color: dateRange === '7days' ? '#34D399' : 'var(--text-secondary)',
              fontWeight: dateRange === '7days' ? 600 : 400,
            }}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setDateRange('month')}
            style={{
              padding: '5px 12px',
              fontSize: '12px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              background: dateRange === 'month' ? 'var(--accent-forest)' : 'transparent',
              color: dateRange === 'month' ? '#34D399' : 'var(--text-secondary)',
              fontWeight: dateRange === 'month' ? 600 : 400,
            }}
          >
            Month to Date
          </button>
        </div>
      </div>

      {/* Right Telemetry & Alerts Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Edge AI Health */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <span className="pulse-dot"></span>
          <span>Edge Gateway Active</span>
          <span style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', color: 'var(--accent-teal-bright)' }}>
            24ms
          </span>
        </div>

        {/* Real-time Clock */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            background: 'var(--bg-primary)',
            padding: '5px 10px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
          }}
        >
          <Clock size={13} style={{ color: 'var(--accent-cyan)' }} />
          <span>{currentTime || '13:45:00'} UTC+5:30</span>
        </div>

        {/* Alert Bell Button */}
        <button
          onClick={() => setActiveTab('alerts')}
          style={{
            position: 'relative',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '8px',
            cursor: 'pointer',
            color: openAlertsCount > 0 ? '#FBBF24' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title={`${openAlertsCount} Unresolved Operational Alerts`}
        >
          <Bell size={18} />
          {openAlertsCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#FFFFFF',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: 700,
                minWidth: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                border: '2px solid var(--bg-secondary)',
              }}
            >
              {openAlertsCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
