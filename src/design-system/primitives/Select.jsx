import React, { useState } from 'react';
export function Select({children,style,...props}){
const [focus,setFocus] = useState(false);
return <select {...props}
onFocus={(e)=>{setFocus(true);props.onFocus&&props.onFocus(e);}}
onBlur={(e)=>{setFocus(false);props.onBlur&&props.onBlur(e);}}
style={{width:'100%',padding:'8px 12px',fontSize:'var(--text-base)',fontFamily:'var(--font-sans)',color:'var(--text-primary)',background:'var(--white)',border:'1px solid '+(focus?'var(--gray-400)':'var(--border-default)'),borderRadius:'var(--radius-md)',outline:'none',boxSizing:'border-box',...style}}>
{children}
</select>;
}
