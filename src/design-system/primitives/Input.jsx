import React, { useState } from 'react';
export function Input({type='text',style,disabled,...props}){
const [focus,setFocus] = useState(false);
return <input type={type} disabled={disabled} {...props}
onFocus={(e)=>{setFocus(true);props.onFocus&&props.onFocus(e);}}
onBlur={(e)=>{setFocus(false);props.onBlur&&props.onBlur(e);}}
style={{width:'100%',padding:'8px 12px',fontSize:'var(--text-base)',fontFamily:'var(--font-sans)',color:'var(--text-primary)',background:disabled?'var(--surface-subtle)':'var(--white)',border:'1px solid '+(focus?'var(--gray-400)':'var(--border-default)'),borderRadius:'var(--radius-md)',outline:focus?'2px solid var(--focus-ring)':'none',outlineOffset:-1,transition:'border-color 150ms',boxSizing:'border-box',...style}} />;
}
