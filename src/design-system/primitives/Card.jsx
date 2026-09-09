import React from 'react';
export function Card({children,style}){
return <div style={{borderRadius:'var(--radius-xl)',border:'1px solid var(--border-default)',background:'var(--surface-card)',color:'var(--text-primary)',boxShadow:'var(--shadow-card)',...style}}>{children}</div>;
}
export function CardHeader({children,style}){
return <div style={{display:'flex',flexDirection:'column',gap:6,padding:24,...style}}>{children}</div>;
}
export function CardTitle({children,style}){
return <div style={{fontWeight:'var(--font-semibold)',fontSize:'var(--text-lg)',lineHeight:'var(--leading-tight)',...style}}>{children}</div>;
}
export function CardDescription({children,style}){
return <div style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',...style}}>{children}</div>;
}
export function CardContent({children,style}){
return <div style={{padding:'0 24px 24px',...style}}>{children}</div>;
}
export function CardFooter({children,style}){
return <div style={{display:'flex',alignItems:'center',padding:'0 24px 24px',...style}}>{children}</div>;
}
