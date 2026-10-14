import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { useDemo } from '../../context/DemoContext';
import { X, CheckCircle, Boxes, AlertTriangle, ArrowRight } from 'lucide-react';

interface StockAdjustmentModalProps {
  item: InventoryItem;
  onClose: () => void;
}

export const StockAdjustmentModal: React.FC<StockAdjustmentModalProps> = ({ item, onClose }) => {
  const { updateInventoryStock } = useDemo();
  const [newStock, setNewStock] = useState<number>(item.expectedStock);
  const [auditNotes, setAuditNotes] = useState<string>('Physical replenishment completed from backroom.');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateInventoryStock(item.sku, newStock, auditNotes);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(20, 184, 166, 0.15)', color: '#2DD4BF', padding: '8px', borderRadius: '8px' }}>
              <Boxes size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', color: '#F8FAFC' }}>Shelf Stock Adjustment & Restock</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.sku} • {item.shelfLocation}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '32px 0' }}>
            <CheckCircle size={44} style={{ color: '#10B981', margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '16px', color: '#FFFFFF', marginBottom: '4px' }}>Stock Reconciled Successfully!</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Visible stock updated to {newStock} units. Associated shelf alert auto-resolved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Product summary card */}
            <div style={{ background: 'var(--bg-primary)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#F8FAFC', marginBottom: '4px' }}>{item.name}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', marginTop: '10px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Current AI Visible: </span>
                  <strong style={{ color: item.visibleStock === 0 ? '#EF4444' : '#FBBF24' }}>{item.visibleStock} units</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>POS Expected: </span>
                  <strong style={{ color: '#F8FAFC' }}>{item.expectedStock} units</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Min Threshold: </span>
                  <span style={{ color: '#CBD5E1' }}>{item.threshold} units</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Unit Price: </span>
                  <span style={{ color: '#CBD5E1' }}>${item.unitPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Restock Input */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#CBD5E1', marginBottom: '6px' }}>
                New Physical / Visible Facing Count
              </label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newStock}
                  onChange={e => setNewStock(parseInt(e.target.value) || 0)}
                  style={{
                    width: '120px',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-focus)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setNewStock(item.expectedStock)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '11px' }}
                >
                  Set to Expected POS ({item.expectedStock})
                </button>
              </div>
            </div>

            {/* Audit Notes */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#CBD5E1', marginBottom: '6px' }}>
                Reconciliation Note
              </label>
              <textarea
                value={auditNotes}
                onChange={e => setAuditNotes(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontFamily: 'inherit',
                  fontSize: '12px',
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button type="button" onClick={onClose} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Save & Update Inventory State
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
