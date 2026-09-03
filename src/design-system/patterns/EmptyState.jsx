import React from 'react';
export function EmptyState({children,style}){
return <div style={{textAlign:'center',padding:'32px 0',color:'var(--text-tertiary)',fontSize:'var(--text-base)',fontFamily:'var(--font-sans)',...style}}>{children}</div>;
}
