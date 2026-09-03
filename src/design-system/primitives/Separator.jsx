import React from 'react';
export function Separator({orientation='horizontal',style}){
return <div role="separator" style={{flexShrink:0,background:'var(--border-default)',width:orientation==='horizontal'?'100%':'1px',height:orientation==='horizontal'?'1px':'100%',...style}} />;
}
