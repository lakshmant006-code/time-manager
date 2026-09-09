import React from 'react';
export function Modal({open,onClose,title,children,footer}){
if(!open) return null;
return (
<div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',backdropFilter:'blur(2px)',zIndex:50,display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
<div onClick={(e)=>e.stopPropagation()} style={{background:'var(--white)',borderRadius:'var(--radius-lg)',padding:24,boxShadow:'var(--shadow-lg)',width:'100%',maxWidth:512,display:'flex',flexDirection:'column',gap:16,fontFamily:'var(--font-sans)',boxSizing:'border-box'}}>
{title && <div style={{fontSize:'var(--text-lg)',fontWeight:'var(--font-semibold)',color:'var(--text-primary)'}}>{title}</div>}
<div>{children}</div>
{footer && <div style={{display:'flex',justifyContent:'flex-end',gap:8}}>{footer}</div>}
</div>
</div>
);
}
