import React, { useState } from 'react';
import {
  Cctv,
  Boxes,
  Users,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Server,
  Zap,
  CheckCircle,
  Clock,
  Eye,
  FileSpreadsheet,
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useDemo();
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setShowConsultModal(false);
    }, 2500);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 20px 80px' }}>
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          padding: '64px 32px 72px',
          background: 'radial-gradient(ellipse at 50% 20%, #102621 0%, #080E18 70%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(20, 184, 166, 0.25)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          textAlign: 'center',
          overflow: 'hidden',
          marginBottom: '40px',
        }}
      >
        {/* Glow backdrop accent */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '240px',
            background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(18, 59, 42, 0.6)',
              border: '1px solid rgba(45, 212, 191, 0.4)',
              padding: '6px 14px',
              borderRadius: '9999px',
              color: '#34D399',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            <Sparkles size={14} />
            Next-Gen Computer Vision for Retail & Warehouses
          </div>

          <h1
            style={{
              fontSize: ' clamp(36px, 5vw, 62px)',
              fontWeight: 800,
              lineHeight: '1.1',
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              maxWidth: '920px',
              margin: '0 auto 20px',
            }}
          >
            See More. Know More. <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #10B981 0%, #2DD4BF 50%, #38BDF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Manage Smarter.
            </span>
          </h1>

          <p
            style={{
              fontSize: '17px',
              color: '#94A3B8',
              maxWidth: '720px',
              margin: '0 auto 32px',
              lineHeight: '1.6',
            }}
          >
            Transform your existing CCTV infrastructure into an automated operational intelligence powerhouse.
            Track real-time customer traffic, detect empty shelves, and prevent inventory stockouts with edge computer vision.
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('overview')}
              className="btn btn-primary btn-lg"
              style={{ gap: '10px' }}
            >
              Explore Live Demo
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => setActiveTab('cameras')}
              className="btn btn-secondary btn-lg"
              style={{ gap: '10px' }}
            >
              <Cctv size={18} />
              View Camera Feeds
            </button>
            <button
              onClick={() => setShowConsultModal(true)}
              className="btn btn-ghost btn-lg"
              style={{ border: '1px solid var(--border)' }}
            >
              Request Hardware Pilot
            </button>
          </div>
        </div>

        {/* Quick KPI Teasers */}
        <div
          style={{
            marginTop: '48px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            maxWidth: '900px',
            margin: '48px auto 0',
            textAlign: 'left',
          }}
        >
          <div style={{ background: 'rgba(11, 19, 32, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Foot-Traffic Accuracy</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#34D399', fontFamily: 'var(--font-mono)' }}>98.4%</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Bi-directional tripwire</div>
          </div>
          <div style={{ background: 'rgba(11, 19, 32, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Shelf Out-of-Stock</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#2DD4BF', fontFamily: 'var(--font-mono)' }}>-72%</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Immediate restock alerts</div>
          </div>
          <div style={{ background: 'rgba(11, 19, 32, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Inference Latency</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#38BDF8', fontFamily: 'var(--font-mono)' }}>&lt; 30ms</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Local Edge TensorRT</div>
          </div>
          <div style={{ background: 'rgba(11, 19, 32, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase' }}>Hardware Agnostic</div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#F1F5F9', fontFamily: 'var(--font-mono)' }}>ONVIF / RTSP</div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Uses existing CCTV</div>
          </div>
        </div>
      </div>

      {/* Two Core Pillars */}
      <div style={{ marginBottom: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', color: '#F8FAFC', marginBottom: '8px' }}>Two Specialized Vision Modules</h2>
          <p style={{ fontSize: '14px', color: '#94A3B8' }}>
            Unified on one seamless platform with zero sensory fragmentation.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
          {/* Module 1: Vision Security */}
          <div
            className="card"
            style={{
              padding: '32px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              background: 'linear-gradient(180deg, #0F1D22 0%, #0D1422 100%)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34D399',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Cctv size={24} />
            </div>

            <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '10px' }}>
              Module 1: Vision Security & Analytics
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
              Connect standard IP/RTSP streams to execute real-time person detection, occupancy thresholds, tripwire line crossing, and after-hours perimeter safeguards.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
                <CheckCircle size={15} style={{ color: '#10B981' }} />
                <span>Bi-directional people counting & peak traffic analytics</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
                <CheckCircle size={15} style={{ color: '#10B981' }} />
                <span>Live occupancy gauge vs store maximum fire limit</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
                <CheckCircle size={15} style={{ color: '#10B981' }} />
                <span>Restricted zone intrusion and loitering event flags</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#10B981' }}>
                <CheckCircle size={15} style={{ color: '#10B981' }} />
                <span>Camera health, bitrate drop, and packet loss telemetry</span>
              </li>
            </ul>

            <button onClick={() => setActiveTab('cameras')} className="btn btn-secondary" style={{ width: '100%' }}>
              Explore Camera Surveillance &rarr;
            </button>
          </div>

          {/* Module 2: Vision Inventory */}
          <div
            className="card"
            style={{
              padding: '32px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: 'linear-gradient(180deg, #10192A 0%, #0D1422 100%)',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Boxes size={24} />
            </div>

            <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '10px' }}>
              Module 2: Vision Inventory Intelligence
            </h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
              Overhead and facing cameras monitor shelf availability, detect stock voids, identify misplaced SKUs, and immediately dispatch replenishment alerts to store staff.
            </p>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#CBD5E1' }}>
                <CheckCircle size={15} style={{ color: '#38BDF8' }} />
                <span>Empty shelf slot detection & void area segmentation</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#38BDF8' }}>
                <CheckCircle size={15} style={{ color: '#38BDF8' }} />
                <span>Estimated visible facing units vs POS inventory ground truth</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#38BDF8' }}>
                <CheckCircle size={15} style={{ color: '#38BDF8' }} />
                <span>Misplaced SKU and barcode facing error detection</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#38BDF8' }}>
                <CheckCircle size={15} style={{ color: '#38BDF8' }} />
                <span>Automated restock task generation and alert resolution</span>
              </li>
            </ul>

            <button onClick={() => setActiveTab('inventory')} className="btn btn-secondary" style={{ width: '100%' }}>
              Explore Shelf Inventory &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* How it Works Pipeline */}
      <div className="card" style={{ padding: '36px', marginBottom: '56px', background: 'var(--bg-secondary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '22px', color: '#F8FAFC', marginBottom: '8px' }}>
            How It Works: Edge Vision Pipeline
          </h3>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>
            Low latency, privacy-preserving, and non-intrusive architecture.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-teal-bright)', fontWeight: 700, marginBottom: '6px' }}>STEP 01</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '8px' }}>RTSP Stream Ingest</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Connect existing CCTV or ONVIF cameras via secure local RTSP subnet feeds without requiring cloud bandwidth.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-teal-bright)', fontWeight: 700, marginBottom: '6px' }}>STEP 02</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '8px' }}>YOLO Edge Inference</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Ultralytics YOLO + ByteTrack models classify people, shopping carts, and shelf gaps in under 30 milliseconds.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-teal-bright)', fontWeight: 700, marginBottom: '6px' }}>STEP 03</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '8px' }}>Metadata Telemetry</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Bounding coordinates and counts convert into lightweight JSON events. Raw frames are immediately discarded for privacy.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-teal-bright)', fontWeight: 700, marginBottom: '6px' }}>STEP 04</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '8px' }}>Executive Operations</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Store managers receive instant restock alerts, daily foot-traffic analytics, and exportable compliance reports.
            </p>
          </div>
        </div>
      </div>

      {/* Phased Roadmap (Level 1, Level 2, Level 3) */}
      <div className="card" style={{ padding: '32px', marginBottom: '56px', border: '1px solid var(--border-subtle)' }}>
        <h3 style={{ fontSize: '20px', color: '#FFFFFF', marginBottom: '8px' }}>
          Implementation Phasing: From Demo to Full Scale
        </h3>
        <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '24px' }}>
          A disciplined, low-risk deployment roadmap matching the technical blueprint.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.4)', borderRadius: '10px', padding: '18px' }}>
            <div className="badge badge-online" style={{ marginBottom: '10px' }}>Active Phase</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>Level 1: Interactive Prototype</h4>
            <p style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
              Fully interactive frontend with centralized simulated data, reactive alert workflows, shelf adjustment, and exportable reports.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px' }}>
            <div className="badge badge-info" style={{ marginBottom: '10px' }}>Phase 2</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>Level 2: AI Video Evaluation</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Prerecorded customer footage evaluated with Python FastAPI + YOLOv11 and ByteTrack for verified detection metrics.
            </p>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '18px' }}>
            <div className="badge" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#CBD5E1', marginBottom: '10px' }}>Phase 3</div>
            <h4 style={{ fontSize: '15px', color: '#FFFFFF', marginBottom: '6px' }}>Level 3: Live Pilot Deployment</h4>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
              Physical edge appliance on premise connected to store IP cameras, POS database sync, and real-time manager alerts.
            </p>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {showConsultModal && (
        <div className="modal-overlay" onClick={() => setShowConsultModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', padding: '28px' }}>
            <h3 style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '6px' }}>Request an On-Site Pilot Evaluation</h3>
            <p style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '20px' }}>
              Our computer vision engineers will assess camera angles, lighting conditions, and network capability at your facility.
            </p>

            {consultSubmitted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle size={44} style={{ color: '#10B981', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '16px', color: '#FFFFFF', marginBottom: '6px' }}>Pilot Request Received</h4>
                <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                  A solutions architect will reach out within 24 hours to schedule the technical audit.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Marcus Vance"
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>Business Email</label>
                  <input
                    required
                    type="email"
                    placeholder="marcus@superstore.com"
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>Facility Type & Camera Count</label>
                  <select
                    style={{
                      width: '100%',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      color: '#FFFFFF',
                      fontFamily: 'inherit',
                      fontSize: '13px',
                    }}
                  >
                    <option>Supermarket / Grocery (10-30 Cameras)</option>
                    <option>Department Store / Retail (30-80 Cameras)</option>
                    <option>Logistics Warehouse / Distribution Hub</option>
                    <option>Commercial Office / Corporate Facility</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setShowConsultModal(false)} className="btn btn-secondary btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
