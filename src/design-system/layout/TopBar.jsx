import React from 'react';
export function TopBar({title='TIME MANAGEMENT',fixed=false,style}){
return (
<header style={{width:'100%',height:'var(--space-20)',background:'var(--brand-blue)',display:'flex',alignItems:'center',justifyContent:'center',position:fixed?'fixed':'static',top:0,left:0,zIndex:10,boxSizing:'border-box',...style}}>
<h1 style={{fontFamily:'var(--font-sans)',fontWeight:'var(--font-bold)',color:'var(--white)',fontSize:'var(--text-xl)',letterSpacing:'var(--tracking-tight)',lineHeight:'var(--leading-snug)',margin:0}}>{title}</h1>
</header>
);
}
