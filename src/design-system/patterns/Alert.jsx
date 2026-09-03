import React from 'react';
export function Alert({children,tone='danger',style}){
const map = {danger:{bg:'var(--danger-50)',color:'var(--danger-600)'}};
const t = map[tone] || map.danger;
return <div style={{background:t.bg,color:t.color,padding:16,borderRadius:'var(--radius-md)',fontSize:'var(--text-sm)',fontFamily:'var(--font-sans)',...style}}>{children}</div>;
}
