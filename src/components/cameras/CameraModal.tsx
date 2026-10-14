import React, { useState } from 'react';
import { Camera } from '../../types';
import { SimulatedCameraStream } from '../common/SimulatedCameraStream';
import { X, ShieldCheck, Activity, Wifi, Terminal, Clock, Download, Check, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  camera: Camera;
  onClose: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ camera, onClose }) => {
  const [activeTab, setActiveTab] = useState<'stream' | 'events' | 'specs'>('stream');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const handleCopyRtsp = () => {
    navigator.clipboard.writeText(camera.rtspUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleSnapshot = () => {
    setSnapshotTaken(true);
    setTimeout(() => setSnapshotTaken(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '960px', width: '95%', padding: '0', overflow: 'hidden' }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 700,
                background: 'var(--bg-card)',
                padding: '4px 8px',
                borderRadius: '4px',
                color: 'var(--accent-teal-bright)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {camera.code}
            </span>
            <div>
              <h3 style={{ fontSize: '17px', color: '#F8FAFC', marginBottom: '2px' }}>{camera.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                {camera.location} • {camera.zone}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className={`badge badge-${camera.status}`}>
              <span className={`pulse-dot ${camera.status === 'online' ? '' : 'amber'}`} />
              {camera.status}
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '6px',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Main Feed */}
          <div style={{ marginBottom: '20px' }}>
            <SimulatedCameraStream camera={camera} isDetailView={true} aspectRatio="16/9" />
          </div>

          {/* Quick Actions & Tabs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
              borderBottom: '1px solid var(--border)',
              paddingBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('stream')}
                className={`btn btn-sm ${activeTab === 'stream' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Telemetry & Stream Diagnostics
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`btn btn-sm ${activeTab === 'events' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Recent Detections & Events
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`btn btn-sm ${activeTab === 'specs' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Hardware & Network Specs
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleSnapshot} className="btn btn-secondary btn-sm">
                {snapshotTaken ? <Check size={14} style={{ color: '#10B981' }} /> : <Download size={14} />}
                {snapshotTaken ? 'Frame Captured' : 'Capture Diagnostic Frame'}
              </button>
            </div>
          </div>

          {/* Tab Content 1: Telemetry */}
          {activeTab === 'stream' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>CURRENT FPS / TARGET</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--emerald-500)', fontFamily: 'var(--font-mono)' }}>
                  {camera.fps} / 30.0 FPS
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>BITRATE / UDP PACKETS</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>
                  {camera.bitrate}
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>ACTIVE DETECTIONS</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
                  {camera.activeDetections.length} Classified Objects
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>STREAM UPTIME (30 DAYS)</div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: '#10B981', fontFamily: 'var(--font-mono)' }}>
                  {camera.uptime}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 2: Events */}
          {activeTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={16} style={{ color: 'var(--accent-teal-bright)' }} />
                  <div>
                    <div style={{ fontSize: '13px', color: '#F8FAFC', fontWeight: 600 }}>{camera.lastEvent}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Registered {camera.lastEventTime} via edge tripwire algorithm</div>
                  </div>
                </div>
                <span className="badge badge-info">Verified Event</span>
              </div>

              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--bg-card)',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={16} style={{ color: '#10B981' }} />
                  <div>
                    <div style={{ fontSize: '13px', color: '#F8FAFC', fontWeight: 600 }}>Camera integrity and heartbeats normal</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ping 12ms to local inference edge box</div>
                  </div>
                </div>
                <span className="badge badge-online">Heartbeat OK</span>
              </div>
            </div>
          )}

          {/* Tab Content 3: Hardware & Network Specs */}
          {activeTab === 'specs' && (
            <div style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Camera ID / Model Code:</span>
                  <span style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>{camera.id} ({camera.code})</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Local RTSP Ingest URI:</span>
                  <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)', cursor: 'pointer' }} onClick={handleCopyRtsp}>
                    {camera.rtspUrl} {copiedUrl ? '(Copied!)' : '(Click to copy)'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Firmware / SDK:</span>
                  <span style={{ color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>{camera.firmware}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Edge Inference Model:</span>
                  <span style={{ color: 'var(--emerald-500)', fontFamily: 'var(--font-mono)' }}>Ultralytics YOLOv11x-TensorRT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
