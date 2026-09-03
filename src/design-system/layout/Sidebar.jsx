import React, { useState } from 'react';
function SidebarItem({item,active,onNavigate}){
const [hover,setHover] = useState(false);
return (
<div onClick={()=>onNavigate&&onNavigate(item.path)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
style={{padding:12,borderRadius:'var(--radius-lg)',display:'flex',alignItems:'center',gap:12,cursor:'pointer',background:active?'var(--surface-muted)':(hover?'var(--surface-subtle)':'transparent')}}>
<span style={{color:active?'var(--ink)':'var(--gray-600)',fontSize:'var(--text-base)'}}>{item.label}</span>
</div>
);
}
export function Sidebar({items=[],activePath,onNavigate,orgName,orgId,onLogout,logoSrc,style}){
return (
<div style={{background:'var(--white)',padding:24,height:'100%',width:256,fontFamily:'var(--font-sans)',display:'flex',flexDirection:'column',boxSizing:'border-box',...style}}>
<div style={{marginBottom:32}}>
{logoSrc && <img src={logoSrc} alt="Logo" style={{width:128,objectFit:'contain'}} />}
{orgName && <div style={{marginTop:16,fontSize:'var(--text-sm)'}}>
<p style={{color:'var(--text-tertiary)',margin:0}}>Organization</p>
<div style={{display:'flex',alignItems:'center',gap:8,marginTop:4}}>
<span style={{fontWeight:'var(--font-medium)'}}>{orgName}</span>
{orgId&&<span style={{background:'var(--surface-muted)',padding:'2px 8px',borderRadius:'var(--radius-sm)',fontSize:'var(--text-xs)',fontFamily:'monospace'}}>ID: {orgId}</span>}
</div>
</div>}
</div>
<nav style={{display:'flex',flexDirection:'column',gap:8,flex:1,overflowY:'auto'}}>
{items.map(item=> <SidebarItem key={item.path} item={item} active={item.path===activePath} onNavigate={onNavigate} />)}
</nav>
{onLogout && <SidebarItem item={{path:'__logout',label:'Logout'}} active={false} onNavigate={onLogout} />}
</div>
);
}
