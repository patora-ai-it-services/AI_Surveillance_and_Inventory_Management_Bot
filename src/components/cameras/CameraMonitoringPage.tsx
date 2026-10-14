import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Camera } from '../../types';
import { SimulatedCameraStream } from '../common/SimulatedCameraStream';
import {
  Cctv,
  Search,
  Filter,
  Grid,
  List,
  AlertTriangle,
  Eye,
  Activity,
  Layers,
  CheckCircle,
  Wifi,
  ExternalLink,
} from 'lucide-react';

export const CameraMonitoringPage: React.FC = () => {
  const { cameras, setSelectedCameraForModal } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'degraded'>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCameras = cameras.filter(cam => {
    const matchesSearch =
      cam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cam.zone.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || cam.status === statusFilter;
    const matchesZone = zoneFilter === 'all' || cam.coverageType === zoneFilter;

    return matchesSearch && matchesStatus && matchesZone;
  });

  return (
    <div className="page-wrapper">
      {/* Top Header & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC' }}>
              CCTV Camera Surveillance Matrix
            </h1>
            <span className="badge badge-online">
              {cameras.filter(c => c.status === 'online').length}/{cameras.length} Active Feeds
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Edge AI video analytics, automated person tracking, and real-time bounding box classifications.
          </p>
        </div>

        {/* View Mode Controls */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '6px', padding: '3px' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'var(--accent-forest)' : 'transparent',
                border: 'none',
                color: viewMode === 'grid' ? '#34D399' : 'var(--text-muted)',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
              }}
            >
              <Grid size={14} /> Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                background: viewMode === 'list' ? 'var(--accent-forest)' : 'transparent',
                border: 'none',
                color: viewMode === 'list' ? '#34D399' : 'var(--text-muted)',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
              }}
            >
              <List size={14} /> List
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: 'var(--bg-secondary)',
        }}
      >
        {/* Search */}
        <div style={{ flex: '1', minWidth: '240px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by camera code (e.g., CAM-01), zone, or keyword..."
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

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setStatusFilter('all')}
            className={`btn btn-sm ${statusFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All ({cameras.length})
          </button>
          <button
            onClick={() => setStatusFilter('online')}
            className={`btn btn-sm ${statusFilter === 'online' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Online (5)
          </button>
          <button
            onClick={() => setStatusFilter('degraded')}
            className={`btn btn-sm ${statusFilter === 'degraded' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Degraded (1)
          </button>
        </div>

        {/* Zone Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Coverage:</span>
          <select
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            style={{
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Zones</option>
            <option value="entrance">Main Entrance</option>
            <option value="aisle">Retail Aisles</option>
            <option value="shelf">Shelf / Showcase</option>
            <option value="dock">Loading Dock</option>
            <option value="exit">Exit & POS</option>
          </select>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredCameras.map(cam => (
            <div
              key={cam.id}
              className="card"
              style={{
                padding: '0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
              }}
              onClick={() => setSelectedCameraForModal(cam)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent-teal)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Stream Frame */}
              <div style={{ position: 'relative' }}>
                <SimulatedCameraStream
                  camera={cam}
                  aspectRatio="16/9"
                  onExpand={() => setSelectedCameraForModal(cam)}
                />
              </div>

              {/* Card Meta Footer */}
              <div style={{ padding: '16px 20px', background: 'var(--bg-secondary)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 700, color: '#F8FAFC' }}>
                        {cam.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {cam.location} • {cam.zone}
                      </div>
                    </div>
                    <span className={`badge badge-${cam.status}`}>
                      <span className={`pulse-dot ${cam.status === 'online' ? '' : 'amber'}`} />
                      {cam.status}
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-primary)',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      marginTop: '10px',
                    }}
                  >
                    <Activity size={14} style={{ color: 'var(--accent-cyan)' }} />
                    <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cam.lastEvent}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{cam.lastEventTime}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '14px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>
                    Detections: <strong style={{ color: '#10B981' }}>{cam.activeDetections.length} objects</strong>
                  </span>
                  <span style={{ color: 'var(--accent-teal-bright)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Click to inspect stream &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 18px' }}>Camera</th>
                <th style={{ padding: '12px 18px' }}>Zone</th>
                <th style={{ padding: '12px 18px' }}>Status</th>
                <th style={{ padding: '12px 18px' }}>FPS / Bitrate</th>
                <th style={{ padding: '12px 18px' }}>Active Detections</th>
                <th style={{ padding: '12px 18px' }}>Recent Event</th>
                <th style={{ padding: '12px 18px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCameras.map(cam => (
                <tr
                  key={cam.id}
                  onClick={() => setSelectedCameraForModal(cam)}
                  style={{
                    borderBottom: '1px solid var(--border)',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: 'var(--accent-teal-bright)', background: 'var(--bg-primary)', padding: '3px 6px', borderRadius: '4px' }}>
                        {cam.code}
                      </span>
                      <strong style={{ color: '#F8FAFC' }}>{cam.name}</strong>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>{cam.zone}</td>
                  <td style={{ padding: '14px 18px' }}>
                    <span className={`badge badge-${cam.status}`}>{cam.status}</span>
                  </td>
                  <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#CBD5E1' }}>
                    {cam.fps} FPS / {cam.bitrate.split(' ')[0]}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <span style={{ color: '#10B981', fontWeight: 600 }}>{cam.activeDetections.length} Classified</span>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--text-muted)', fontSize: '12px' }}>
                    {cam.lastEvent}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '11px' }}>
                      <Eye size={12} /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
