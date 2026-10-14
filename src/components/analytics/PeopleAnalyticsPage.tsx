import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Users,
  TrendingUp,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Flame,
  Calendar,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from 'recharts';

export const PeopleAnalyticsPage: React.FC = () => {
  const { hourlyTraffic, dailyTrends, visitorsToday, currentOccupancy } = useDemo();
  const [selectedMetric, setSelectedMetric] = useState<'traffic' | 'dwell'>('traffic');

  const totalEntries = hourlyTraffic.reduce((acc, h) => acc + h.entries, 0);
  const totalExits = hourlyTraffic.reduce((acc, h) => acc + h.exits, 0);
  const netInStore = totalEntries - totalExits;
  const peakHour = hourlyTraffic.reduce((max, h) => (h.entries > max.entries ? h : max), hourlyTraffic[0]);

  const zoneBreakdown = [
    { zone: 'Main Entrance & Vestibule', camera: 'CAM-01', share: '100% (Inflow)', count: totalEntries, avgDwell: '1.2 min' },
    { zone: 'Grocery Aisles 1-4', camera: 'CAM-02', share: '68% of visitors', count: Math.round(totalEntries * 0.68), avgDwell: '16.4 min' },
    { zone: 'High-Value Electronics Showcase', camera: 'CAM-04', share: '24% of visitors', count: Math.round(totalEntries * 0.24), avgDwell: '8.5 min' },
    { zone: 'Pantry & Canned Goods Shelf B', camera: 'CAM-03', share: '45% of visitors', count: Math.round(totalEntries * 0.45), avgDwell: '5.8 min' },
    { zone: 'Checkout POS & Exit Turnstiles', camera: 'CAM-06', share: '92% of visitors', count: totalExits, avgDwell: '4.1 min' },
  ];

  return (
    <div className="page-wrapper">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', marginBottom: '4px' }}>
            People Counting & Store Occupancy Intelligence
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Bi-directional camera line-crossing tracking, dwell-time distributions, and customer flow heat analytics.
          </p>
        </div>

        <div style={{ background: 'rgba(20, 184, 166, 0.1)', border: '1px solid rgba(20, 184, 166, 0.3)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#2DD4BF' }}>
          <Info size={14} />
          <span>Tripwire algorithms calibrated to &gt;98% accuracy</span>
        </div>
      </div>

      {/* KPI Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Inflow (Entries)</span>
            <div style={{ background: 'var(--emerald-bg)', color: '#10B981', padding: '6px', borderRadius: '6px' }}>
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {totalEntries.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#10B981', marginTop: '4px' }}>Across CAM-01 tripwire line</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Outflow (Exits)</span>
            <div style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8', padding: '6px', borderRadius: '6px' }}>
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {totalExits.toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: '#38BDF8', marginTop: '4px' }}>Across CAM-06 exit turnstiles</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Active Inside</span>
            <div style={{ background: 'var(--blue-bg)', color: '#60A5FA', padding: '6px', borderRadius: '6px' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {netInStore}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>52% of maximum fire capacity</div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Peak Rush Window</span>
            <div style={{ background: 'rgba(236, 72, 153, 0.12)', color: '#F472B6', padding: '6px', borderRadius: '6px' }}>
              <Flame size={16} />
            </div>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#F8FAFC', fontFamily: 'var(--font-mono)' }}>
            {peakHour.hour} ({peakHour.entries} in)
          </div>
          <div style={{ fontSize: '12px', color: '#F472B6', marginTop: '4px' }}>Evening dinner grocery rush</div>
        </div>
      </div>

      {/* Main Charts: Hourly Breakdown & 7-Day Trend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Hourly Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#F8FAFC' }}>
                Hourly Entries vs Exits Dynamics
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Real-time tracking comparison throughout store operational hours
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10B981' }}>
                <span style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '2px' }} />
                Inflow (Entries)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#06B6D4' }}>
                <span style={{ width: '10px', height: '10px', background: '#06B6D4', borderRadius: '2px' }} />
                Outflow (Exits)
              </span>
            </div>
          </div>

          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyTraffic} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
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
                <Bar dataKey="entries" name="Entries" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="exits" name="Exits" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Day Trend Comparison */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#F8FAFC' }}>
                7-Day Foot Traffic & Occupancy Peak Trends
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Weekly visitor volume analysis for staffing and inventory replenishment scheduling
              </p>
            </div>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTrends} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E2B45" vertical={false} />
                <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} />
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
                <Line type="monotone" dataKey="totalVisitors" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} name="Total Visitors" />
                <Line type="monotone" dataKey="peakOccupancy" stroke="#38BDF8" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3, fill: '#38BDF8' }} name="Peak Occupancy" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone Flow Distribution Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '15px', color: '#F8FAFC' }}>Monitored Zone Traffic Heat Distribution</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer density and dwell times across store departments</p>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '12px 18px' }}>Store Department / Zone</th>
              <th style={{ padding: '12px 18px' }}>Associated Camera</th>
              <th style={{ padding: '12px 18px' }}>Traffic Share</th>
              <th style={{ padding: '12px 18px' }}>Estimated Visitors</th>
              <th style={{ padding: '12px 18px' }}>Average Dwell Time</th>
            </tr>
          </thead>
          <tbody>
            {zoneBreakdown.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, color: '#F8FAFC' }}>{row.zone}</td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', background: 'var(--bg-primary)', padding: '2px 6px', borderRadius: '4px', color: 'var(--accent-teal-bright)' }}>
                    {row.camera}
                  </span>
                </td>
                <td style={{ padding: '14px 18px', color: '#CBD5E1' }}>{row.share}</td>
                <td style={{ padding: '14px 18px', fontFamily: 'var(--font-mono)', color: '#10B981', fontWeight: 700 }}>
                  {row.count.toLocaleString()}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>{row.avgDwell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
