import React from 'react';
export function ToggleSwitch({checked=false,onChange,disabled,style}){
return (
<div role="switch" aria-checked={checked} onClick={()=>!disabled&&onChange&&onChange(!checked)}
style={{width:48,height:24,borderRadius:'var(--radius-pill)',background:checked?'var(--ink)':'var(--gray-300)',position:'relative',cursor:disabled?'not-allowed':'pointer',opacity:disabled?0.5:1,transition:'background-color 200ms',flexShrink:0,...style}}>
<div style={{position:'absolute',top:4,left:checked?26:4,width:16,height:16,borderRadius:'50%',background:'var(--white)',transition:'left 200ms'}} />
</div>
);
}
