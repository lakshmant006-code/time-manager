import React from 'react';
export function DataTable({columns,rows,rowKey='id',renderCell,emptyMessage='No records found.'}){
const template = columns.map(c=>c.width||'1fr').join(' ');
return (
<div style={{fontFamily:'var(--font-sans)',overflowX:'auto'}}>
<div style={{minWidth:800}}>
<div style={{display:'grid',gridTemplateColumns:template,gap:16,background:'var(--surface-subtle)',padding:16,borderRadius:'var(--radius-lg)',fontWeight:'var(--font-medium)',marginBottom:16,fontSize:'var(--text-sm)'}}>
{columns.map(c=> <div key={c.key} style={{textAlign:c.align||'left'}}>{c.label}</div>)}
</div>
<div style={{display:'flex',flexDirection:'column',gap:16}}>
{rows.map(row=> (
<div key={row[rowKey]} style={{display:'grid',gridTemplateColumns:template,gap:16,background:'var(--surface-muted)',padding:16,borderRadius:'var(--radius-lg)',alignItems:'center'}}>
{columns.map(c=> <div key={c.key} style={{textAlign:c.align||'left',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{renderCell?renderCell(row,c.key):row[c.key]}</div>)}
</div>
))}
{rows.length===0 && <div style={{textAlign:'center',padding:'32px 0',color:'var(--text-tertiary)'}}>{emptyMessage}</div>}
</div>
</div>
</div>
);
}
