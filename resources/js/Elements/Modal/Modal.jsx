import {useState} from "react";

export default function Modal({title, open, handleOpen, children}) {
    return <dialog open={open}>
        <article>
            <header>
                <a href="#close" aria-label="Close" className="close" onClick={handleOpen}></a>
                {title}
            </header>
            {children}
        </article>
    </dialog>
}
