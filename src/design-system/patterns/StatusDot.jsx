import React from 'react';
const COLORS = {connected:'var(--success-500)',connecting:'var(--warning-500)',disconnected:'var(--danger-500)'};
const LABELS = {connected:'Live updates enabled',connecting:'Connecting…',disconnected:'Disconnected'};
export function StatusDot({status='connected',label,style}){
return (
<div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'var(--font-sans)',...style}}>
<div style={{width:8,height:8,borderRadius:'50%',background:COLORS[status]||COLORS.connected,flexShrink:0}} />
<span style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>{label||LABELS[status]}</span>
</div>
);
}
