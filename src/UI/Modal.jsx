

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
const potalElement = document.getElementById('modal');

export default function Modal({children, open, onClose, className=''}){
    const dialogue = useRef();
    useEffect(()=>{
        const modal = dialogue.current;
        if(open){
            modal.showModal();
        }
        return ()=>{modal.close()}
    },[open]);
    return createPortal(
    <dialog ref={dialogue} className={`modal ${className}`} onClose={onClose}>{children}</dialog>, potalElement
);
}