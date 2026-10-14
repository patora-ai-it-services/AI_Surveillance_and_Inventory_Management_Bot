import React, { useState } from 'react';
import { ShieldAlert, RotateCcw, Info, X, ExternalLink } from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const DemoBanner: React.FC = () => {
  const { resetDemoData } = useDemo();
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleReset = () => {
    resetDemoData();
    setShowResetConfirm(false);
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(90deg, #09131C 0%, #0F2228 50%, #09131C 100%)',
          borderBottom: '1px solid rgba(20, 184, 166, 0.25)',
          padding: '6px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#E2E8F0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(20, 184, 166, 0.15)',
              border: '1px solid rgba(20, 184, 166, 0.4)',
              color: '#2DD4BF',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            <ShieldAlert size={13} />
            DEMO MODE — SAMPLE DATA
          </span>
          <span style={{ color: '#94A3B8', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>Client evaluation prototype driven by centralized simulation.</span>
            <button
              onClick={() => setShowDisclaimerModal(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#38BDF8',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                padding: '0 4px',
                fontSize: '12px',
                textDecoration: 'underline',
              }}
            >
              <Info size={12} />
              Read Operational Disclaimers
            </button>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '3px 10px',
              fontSize: '11px',
              borderRadius: '4px',
              background: 'rgba(30, 41, 59, 0.8)',
              borderColor: 'rgba(148, 163, 184, 0.2)',
            }}
          >
            <RotateCcw size={12} />
            Reset Demo Scenario
          </button>
        </div>
      </div>

      {/* Disclaimers Modal */}
      {showDisclaimerModal && (
        <div className="modal-overlay" onClick={() => setShowDisclaimerModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px', padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#2DD4BF', padding: '8px', borderRadius: '8px' }}>
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', color: '#F8FAFC' }}>Enterprise Demo & Safeguards Notice</h3>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>AI Surveillance and Inventory Management Bot (Phase 1 Specification)</p>
                </div>
              </div>
              <button
                onClick={() => setShowDisclaimerModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px', color: '#CBD5E1', lineHeight: '1.6' }}>
              <div style={{ background: '#0B1320', border: '1px solid #1E2D4A', borderRadius: '8px', padding: '14px' }}>
                <strong style={{ color: '#F1F5F9', display: 'block', marginBottom: '4px' }}>1. Synthetic Data & Feeds</strong>
                This frontend prototype operates entirely on simulated camera previews, synthetic foot-traffic telemetry, and mock shelf inventory. It does not interface with unconsented live surveillance feeds or biometric identity stores.
              </div>

              <div style={{ background: '#0B1320', border: '1px solid #1E2D4A', borderRadius: '8px', padding: '14px' }}>
                <strong style={{ color: '#F1F5F9', display: 'block', marginBottom: '4px' }}>2. Estimated Visible Stock vs ERP Ground Truth</strong>
                Computer vision estimates visible front-facing units. Real warehouse inventory, packed cartons, and behind-shelf stock require reconciliation with POS, RFID, or WMS systems.
              </div>

              <div style={{ background: '#0B1320', border: '1px solid #1E2D4A', borderRadius: '8px', padding: '14px' }}>
                <strong style={{ color: '#F1F5F9', display: 'block', marginBottom: '4px' }}>3. Privacy by Design</strong>
                In production deployment, our computer vision pipeline processes detections on edge hardware, discarding raw video frames after vector metadata extraction to adhere to GDPR/CCPA privacy compliance.
              </div>
            </div>

            <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDisclaimerModal(false)} className="btn btn-primary">
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '24px' }}>
            <h3 style={{ fontSize: '17px', color: '#F8FAFC', marginBottom: '8px' }}>Reset Demo Scenario?</h3>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
              This will restore all sample camera feeds, re-open any resolved inventory alerts, and reset stock counts back to default initial state.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowResetConfirm(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleReset} className="btn btn-primary btn-sm">
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
