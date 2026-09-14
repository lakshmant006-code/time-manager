import React, { useState } from 'react';

function pagePills(total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  return [1, 2, 3, '…', total - 2, total - 1, total];
}

export function DataTable({ columns, rows, rowKey = 'id', renderCell, emptyMessage = 'No records found.', pageSize: initialPageSize = 10 }) {
  const [page, setPage] = useState(1);
  const [jump, setJump] = useState('');
  const [pageSize, setPageSize] = useState(initialPageSize);
  const template = columns.map((c) => c.width || '1fr').join(' ');

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageRows = rows.slice((current - 1) * pageSize, current * pageSize);

  const goTo = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <div style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 800 }}>
          <div style={{ display: 'grid', gridTemplateColumns: template, gap: 16, background: 'var(--surface-subtle)', padding: 16, borderRadius: 'var(--radius-lg)', fontWeight: 'var(--font-medium)', marginBottom: 16, fontSize: 'var(--text-sm)' }}>
            {columns.map((c) => <div key={c.key} style={{ textAlign: c.align || 'left' }}>{c.label}</div>)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pageRows.map((row) => (
              <div key={row[rowKey]} style={{ display: 'grid', gridTemplateColumns: template, gap: 16, background: 'var(--surface-muted)', padding: 16, borderRadius: 'var(--radius-lg)', alignItems: 'center' }}>
                {columns.map((c) => <div key={c.key} style={{ textAlign: c.align || 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{renderCell ? renderCell(row, c.key) : row[c.key]}</div>)}
              </div>
            ))}
            {rows.length === 0 && <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-tertiary)' }}>{emptyMessage}</div>}
          </div>
        </div>
      </div>

      {rows.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-default)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => goTo(current - 1)} disabled={current === 1} style={pillBtnStyle(false, current === 1)}>‹</button>
            {pagePills(totalPages).map((p, i) =>
              p === '…' ? (
                <span key={`e${i}`} style={{ padding: '0 4px', color: 'var(--text-tertiary)', fontSize: 13 }}>…</span>
              ) : (
                <button key={p} onClick={() => goTo(p)} style={pillBtnStyle(p === current, false)}>{p}</button>
              )
            )}
            <button onClick={() => goTo(current + 1)} disabled={current === totalPages} style={pillBtnStyle(false, current === totalPages)}>›</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: 'var(--text-tertiary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              Jump to page:
              <input
                value={jump}
                onChange={(e) => setJump(e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={(e) => { if (e.key === 'Enter' && jump) { goTo(Number(jump)); setJump(''); } }}
                style={{ width: 44, padding: '4px 6px', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-sans)' }}
              />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              No of groups
              <select
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                style={{ padding: '4px 6px', border: '1px solid var(--border-default)', borderRadius: 6, fontSize: 13, fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}
              >
                {[10, 25, 50].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function pillBtnStyle(active, disabled) {
  return {
    minWidth: 26, height: 26, padding: '0 6px', borderRadius: 6, border: '1px solid ' + (active ? 'var(--ink)' : 'var(--border-default)'),
    background: active ? 'var(--ink)' : 'var(--white)', color: active ? '#fff' : disabled ? 'var(--text-tertiary)' : 'var(--text-primary)',
    fontSize: 13, fontFamily: 'var(--font-sans)', cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
  };
}
