import React, { useState } from 'react';
function TabButton({active,label,onClick}){
const [hover,setHover] = useState(false);
return (
<button onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
style={{padding:'8px 16px',borderRadius:'var(--radius-md)',border:'none',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:'var(--text-base)',transition:'background-color 200ms',background:active?'var(--ink)':(hover?'var(--gray-200)':'var(--surface-muted)'),color:active?'var(--white)':'var(--text-primary)'}}>
{label}
</button>
);
}
export function Tabs({options,value,onChange,style}){
return (
<div style={{display:'flex',gap:16,...style}}>
{options.map(opt=> <TabButton key={opt.value} label={opt.label} active={opt.value===value} onClick={()=>onChange&&onChange(opt.value)} />)}
</div>
);
}
