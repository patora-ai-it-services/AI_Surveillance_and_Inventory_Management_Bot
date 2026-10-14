import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Alert, AlertCategory, AlertSeverity, AlertStatus } from '../../types';
import { PrintReportModal } from '../reports/PrintReportModal';
import {
  BellRing,
  Filter,
  CheckCircle,
  Clock,
  ShieldAlert,
  Boxes,
  Cctv,
  Download,
  Printer,
  RotateCcw,
  Search,
  ExternalLink,
  MessageSquare,
  X,
  FileSpreadsheet,
} from 'lucide-react';

export const AlertsReportsPage: React.FC = () => {
  const {
    alerts,
    resolveAlert,
    acknowledgeAlert,
    cameras,
    inventory,
    visitorsToday,
    setSelectedCameraForModal,
    setActiveTab,
    resetDemoData,
  } = useDemo();

  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [resolvingAlert, setResolvingAlert] = useState<Alert | null>(null);
  const [resolutionNote, setResolutionNote] = useState<string>('Physical inspection completed. Restock executed.');
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [csvDownloaded, setCsvDownloaded] = useState<boolean>(false);

  const filteredAlerts = alerts.filter(alt => {
    const matchesSearch =
      alt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alt.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || alt.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || alt.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || alt.status === statusFilter;

    return matchesSearch && matchesCategory && matchesSeverity && matchesStatus;
  });

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resolvingAlert) {
      resolveAlert(resolvingAlert.id, resolutionNote);
      setResolvingAlert(null);
    }
  };

  const handleDownloadCsv = () => {
    // Generate valid CSV data
    const headers = ['Alert ID', 'Category', 'Severity', 'Status', 'Timestamp', 'Location', 'Title', 'Description'];
    const rows = alerts.map(a => [
      a.id,
      a.category,
      a.severity,
      a.status,
      `"${a.timestamp}"`,
      `"${a.location}"`,
      `"${a.title.replace(/"/g, '""')}"`,
      `"${a.description.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Patora_Vision_Operations_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCsvDownloaded(true);
    setTimeout(() => setCsvDownloaded(false), 2500);
  };

  const openCamera = (camId?: string) => {
    if (!camId) return;
    const cam = cameras.find(c => c.id === camId);
    if (cam) setSelectedCameraForModal(cam);
  };

  return (
    <div className="page-wrapper">
      {/* Title & Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC' }}>
              Operational Incident Center & Intelligence Reports
            </h1>
            <span className="badge badge-warning">
              {alerts.filter(a => a.status === 'open').length} Actionable
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Unified queue for computer-vision shelf voids, safety anomalies, camera connectivity alarms, and audit reports.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleDownloadCsv} className="btn btn-secondary btn-sm">
            <Download size={14} />
            {csvDownloaded ? 'CSV Downloaded!' : 'Export CSV Dataset'}
          </button>
          <button onClick={() => setShowPrintModal(true)} className="btn btn-primary btn-sm">
            <Printer size={14} />
            Executive Briefing PDF
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          gap: '14px',
          alignItems: 'center',
          flexWrap: 'wrap',
          background: 'var(--bg-secondary)',
        }}
      >
        <div style={{ flex: '1', minWidth: '220px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search incident title, location, or SKU..."
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

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={() => setCategoryFilter('all')}
            className={`btn btn-sm ${categoryFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Types
          </button>
          <button
            onClick={() => setCategoryFilter('inventory')}
            className={`btn btn-sm ${categoryFilter === 'inventory' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Inventory ({alerts.filter(a => a.category === 'inventory').length})
          </button>
          <button
            onClick={() => setCategoryFilter('security')}
            className={`btn btn-sm ${categoryFilter === 'security' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Security ({alerts.filter(a => a.category === 'security').length})
          </button>
          <button
            onClick={() => setCategoryFilter('camera')}
            className={`btn btn-sm ${categoryFilter === 'camera' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Stream Health
          </button>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: '7px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontFamily: 'inherit',
          }}
        >
          <option value="all">All Statuses</option>
          <option value="open">Open (Unresolved)</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Incident Cards Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        {filteredAlerts.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <CheckCircle size={36} style={{ color: '#10B981', margin: '0 auto 10px' }} />
            <h4 style={{ fontSize: '16px', color: '#FFFFFF' }}>No alerts match your filter criteria</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>All operational streams are operating normally.</p>
          </div>
        ) : (
          filteredAlerts.map(alt => {
            const isResolved = alt.status === 'resolved';
            const isAck = alt.status === 'acknowledged';

            return (
              <div
                key={alt.id}
                className="card"
                style={{
                  background: isResolved ? 'rgba(15, 23, 42, 0.4)' : 'var(--bg-card)',
                  borderLeft: `4px solid ${
                    alt.severity === 'critical' ? '#EF4444' : alt.severity === 'warning' ? '#F59E0B' : '#3B82F6'
                  }`,
                  opacity: isResolved ? 0.75 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background:
                          alt.category === 'inventory'
                            ? 'var(--rose-bg)'
                            : alt.category === 'security'
                            ? 'var(--amber-bg)'
                            : 'var(--blue-bg)',
                        color:
                          alt.category === 'inventory'
                            ? '#F87171'
                            : alt.category === 'security'
                            ? '#FBBF24'
                            : '#60A5FA',
                      }}
                    >
                      {alt.category === 'inventory' ? (
                        <Boxes size={20} />
                      ) : alt.category === 'security' ? (
                        <ShieldAlert size={20} />
                      ) : (
                        <Cctv size={20} />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                        <span className={`badge badge-${alt.severity}`} style={{ fontSize: '10px', padding: '1px 7px' }}>
                          {alt.severity}
                        </span>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                          {alt.category}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-dim)' }}>•</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{alt.timestamp}</span>
                      </div>

                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC' }}>{alt.title}</h3>
                      <p style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px', maxWidth: '850px' }}>
                        {alt.description}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        background: isResolved ? 'rgba(16, 185, 129, 0.15)' : isAck ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: isResolved ? '#34D399' : isAck ? '#FBBF24' : '#F87171',
                        border: `1px solid ${isResolved ? '#10B981' : isAck ? '#F59E0B' : '#EF4444'}40`,
                      }}
                    >
                      {alt.status}
                    </span>
                  </div>
                </div>

                {/* Meta & Location */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '10px', fontSize: '12px', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span>Location: <strong style={{ color: '#F8FAFC' }}>{alt.location}</strong></span>
                    {alt.cameraId && (
                      <button
                        onClick={() => openCamera(alt.cameraId)}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-teal-bright)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                      >
                        <Cctv size={13} /> View Linked Stream
                      </button>
                    )}
                    {alt.sku && (
                      <button
                        onClick={() => setActiveTab('inventory')}
                        style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                      >
                        <Boxes size={13} /> View Shelf Planogram ({alt.sku})
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {!isResolved && !isAck && (
                      <button
                        onClick={() => acknowledgeAlert(alt.id)}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '4px 10px', fontSize: '11px' }}
                      >
                        Acknowledge
                      </button>
                    )}
                    {!isResolved && (
                      <button
                        onClick={() => setResolvingAlert(alt)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '4px 12px', fontSize: '11px' }}
                      >
                        Resolve & Restock
                      </button>
                    )}
                    {isResolved && alt.resolutionNotes && (
                      <div style={{ fontSize: '11px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={13} />
                        <span>Resolved: {alt.resolutionNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Resolution Modal */}
      {resolvingAlert && (
        <div className="modal-overlay" onClick={() => setResolvingAlert(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', padding: '24px' }}>
            <h3 style={{ fontSize: '17px', color: '#F8FAFC', marginBottom: '6px' }}>Resolve Incident</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              {resolvingAlert.title}
            </p>

            <form onSubmit={handleResolveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '4px' }}>
                  Resolution Summary / Corrective Action
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionNote}
                  onChange={e => setResolutionNote(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setResolvingAlert(null)} className="btn btn-secondary btn-sm">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Confirm Incident Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Report Modal */}
      {showPrintModal && (
        <PrintReportModal onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
