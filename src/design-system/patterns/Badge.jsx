import React from 'react';
const TONES = {
neutral:{bg:'var(--gray-200)',color:'var(--gray-700)'},
success:{bg:'var(--success-100)',color:'var(--success-800)'}
};
export function Badge({children,tone='neutral',pill=true,style}){
const t = TONES[tone] || TONES.neutral;
return <span style={{display:'inline-block',background:t.bg,color:t.color,fontSize:'var(--text-xs)',fontFamily:'var(--font-sans)',padding:pill?'4px 12px':'4px 8px',borderRadius:pill?'var(--radius-pill)':'var(--radius-sm)',...style}}>{children}</span>;
}
