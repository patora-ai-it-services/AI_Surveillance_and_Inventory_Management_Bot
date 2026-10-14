import React, { useState, useEffect } from 'react';
import { Camera } from '../../types';
import { Maximize2, Shield, Eye, Activity, Radio, AlertTriangle } from 'lucide-react';

interface SimulatedCameraStreamProps {
  camera: Camera;
  showOverlayStats?: boolean;
  onExpand?: () => void;
  aspectRatio?: string;
  isDetailView?: boolean;
}

export const SimulatedCameraStream: React.FC<SimulatedCameraStreamProps> = ({
  camera,
  showOverlayStats = true,
  onExpand,
  aspectRatio = '16/9',
  isDetailView = false,
}) => {
  const [timestamp, setTimestamp] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [motionOffset, setMotionOffset] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const da = String(now.getDate()).padStart(2, '0');
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimestamp(`${yr}-${mo}-${da} ${time}.${ms}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // Subtle organic jitter to simulate live tracking
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setMotionOffset(prev => (prev === 0 ? 1 : 0));
    }, 1800);
    return () => clearInterval(jitterInterval);
  }, []);

  // Background visual based on coverage type
  const getBackgroundTheme = () => {
    switch (camera.coverageType) {
      case 'entrance':
        return 'radial-gradient(ellipse at 50% 40%, #152233 0%, #080D15 85%)';
      case 'aisle':
        return 'radial-gradient(ellipse at 50% 50%, #142823 0%, #070F14 85%)';
      case 'shelf':
        return 'radial-gradient(ellipse at 50% 60%, #1C2436 0%, #070B12 85%)';
      case 'dock':
        return 'radial-gradient(ellipse at 50% 50%, #29241A 0%, #0F0D09 85%)';
      default:
        return 'radial-gradient(ellipse at 50% 50%, #131B2D 0%, #060910 85%)';
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        background: getBackgroundTheme(),
        borderRadius: isDetailView ? '12px' : '10px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.7)',
        userSelect: 'none',
      }}
    >
      {/* Background Architectural Vector Grid */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${camera.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748B" strokeWidth="0.5" strokeDasharray="3,3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${camera.id})`} />
        {/* Floor perspective vanishing lines */}
        <line x1="10%" y1="100%" x2="48%" y2="52%" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
        <line x1="90%" y1="100%" x2="52%" y2="52%" stroke="#06B6D4" strokeWidth="0.8" opacity="0.4" />
        <line x1="30%" y1="100%" x2="49%" y2="52%" stroke="#14B8A6" strokeWidth="0.5" opacity="0.3" />
        <line x1="70%" y1="100%" x2="51%" y2="52%" stroke="#14B8A6" strokeWidth="0.5" opacity="0.3" />
        {/* Horizon Line */}
        <line x1="0" y1="52%" x2="100%" y2="52%" stroke="#334155" strokeWidth="0.8" strokeDasharray="6,4" />
      </svg>

      {/* CCTV Raster Lines & Sweep Animation */}
      <div className="cctv-scanline" />
      <div className="cctv-sweep" />

      {/* Simulated AI Detections Bounding Boxes */}
      {camera.activeDetections.map((det, idx) => {
        const [x, y, w, h] = det.box;
        const animatedX = x + (idx % 2 === 0 ? motionOffset * 0.4 : -motionOffset * 0.3);
        const animatedY = y + (idx % 2 === 1 ? motionOffset * 0.3 : -motionOffset * 0.2);

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: `${animatedX}%`,
              top: `${animatedY}%`,
              width: `${w}%`,
              height: `${h}%`,
              border: `2px solid ${det.color}`,
              borderRadius: '2px',
              boxShadow: `0 0 12px ${det.color}40`,
              transition: 'all 0.5s ease',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            {/* Corner Tech Brackets */}
            <div style={{ position: 'absolute', top: '-2px', left: '-2px', width: '6px', height: '6px', borderTop: `3px solid ${det.color}`, borderLeft: `3px solid ${det.color}` }} />
            <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', borderTop: `3px solid ${det.color}`, borderRight: `3px solid ${det.color}` }} />
            <div style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '6px', height: '6px', borderBottom: `3px solid ${det.color}`, borderLeft: `3px solid ${det.color}` }} />
            <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '6px', height: '6px', borderBottom: `3px solid ${det.color}`, borderRight: `3px solid ${det.color}` }} />

            {/* Label Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-2px',
                background: det.color,
                color: '#060B12',
                padding: '1px 6px',
                borderRadius: '2px',
                fontSize: '10px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.02em',
                boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
              }}
            >
              {det.label} • {Math.round(det.confidence * 100)}%
            </div>
          </div>
        );
      })}

      {/* Top CCTV Status Overlays */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 15,
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(4px)',
                padding: '2px 7px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: camera.status === 'online' ? '#EF4444' : '#F59E0B',
                  animation: 'pulse-ring 1.5s infinite',
                }}
              />
              REC
            </span>

            <span
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#38BDF8',
                padding: '2px 6px',
                borderRadius: '4px',
                border: '1px solid rgba(56, 189, 248, 0.25)',
              }}
            >
              {camera.code}
            </span>

            <span
              style={{
                background: 'rgba(20, 184, 166, 0.15)',
                border: '1px solid rgba(20, 184, 166, 0.35)',
                color: '#2DD4BF',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '10px',
              }}
            >
              SIMULATED FEED (DEMO)
            </span>
          </div>

          <div style={{ color: '#E2E8F0', textShadow: '0 1px 3px rgba(0,0,0,0.9)', fontSize: '11px' }}>
            {timestamp}
          </div>
        </div>

        {/* Top Right Controls & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {showOverlayStats && (
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                padding: '3px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                gap: '8px',
                fontSize: '10px',
                color: '#94A3B8',
              }}
            >
              <span>{camera.resolution.split(' ')[0]}</span>
              <span style={{ color: '#10B981' }}>{camera.fps} FPS</span>
            </div>
          )}

          {onExpand && (
            <button
              onClick={e => {
                e.stopPropagation();
                onExpand();
              }}
              style={{
                background: 'rgba(0, 0, 0, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#F8FAFC',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Expand Camera Inspection View"
            >
              <Maximize2 size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Telemetry Overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 15,
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
        }}
      >
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#CBD5E1',
            display: 'flex',
            gap: '12px',
          }}
        >
          <span>Zone: <strong style={{ color: '#F8FAFC' }}>{camera.zone}</strong></span>
          <span>Detections: <strong style={{ color: '#34D399' }}>{camera.activeDetections.length} objects</strong></span>
        </div>

        {camera.status === 'degraded' && (
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.2)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: '#FBBF24',
              padding: '3px 8px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 700,
            }}
          >
            <AlertTriangle size={12} />
            <span>Frame Jitter ({camera.bitrate})</span>
          </div>
        )}
      </div>

      {/* Center Crosshair Aim */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '24px',
          height: '24px',
          pointerEvents: 'none',
          opacity: 0.35,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: '11px', width: '2px', height: '6px', background: '#38BDF8' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '11px', width: '2px', height: '6px', background: '#38BDF8' }} />
        <div style={{ position: 'absolute', left: 0, top: '11px', height: '2px', width: '6px', background: '#38BDF8' }} />
        <div style={{ position: 'absolute', right: 0, top: '11px', height: '2px', width: '6px', background: '#38BDF8' }} />
      </div>
    </div>
  );
};
