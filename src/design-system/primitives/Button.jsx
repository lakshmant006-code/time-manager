import React, { useState } from 'react';
const VARIANTS = {
default:{bg:'var(--ink)',color:'var(--white)',border:'none',hoverBg:'#1f2937'},
destructive:{bg:'var(--danger-600)',color:'var(--white)',border:'none',hoverBg:'var(--danger-700)'},
outline:{bg:'var(--white)',color:'var(--text-primary)',border:'1px solid var(--border-default)',hoverBg:'var(--surface-subtle)'},
secondary:{bg:'var(--gray-200)',color:'var(--text-primary)',border:'none',hoverBg:'var(--gray-300)'},
ghost:{bg:'transparent',color:'var(--text-primary)',border:'none',hoverBg:'var(--surface-muted)'},
link:{bg:'transparent',color:'var(--brand-blue)',border:'none',hoverBg:'transparent'}
};
const SIZES = {
default:{padding:'8px 16px',fontSize:'var(--text-sm)'},
sm:{padding:'6px 12px',fontSize:'var(--text-xs)'},
lg:{padding:'10px 32px',fontSize:'var(--text-base)'},
icon:{padding:'8px',fontSize:'var(--text-sm)',width:36}
};
export function Button({variant='default',size='default',disabled,children,style,onClick,type='button'}){
const [hover,setHover] = useState(false);
const v = VARIANTS[variant] || VARIANTS.default;
const s = SIZES[size] || SIZES.default;
return (
<button type={type} disabled={disabled} onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
style={{display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:'var(--font-sans)',fontWeight:'var(--font-medium)',borderRadius:'var(--radius-md)',cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1,transition:'background-color 200ms,color 200ms',whiteSpace:'nowrap',textDecoration:variant==='link'&&hover?'underline':'none',background:hover&&!disabled?v.hoverBg:v.bg,color:v.color,border:v.border,...s,...style}}>
{children}
</button>
);
}
