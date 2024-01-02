import {useState} from "react";

export default function Modal({title, open, children}) {
    return <dialog open={open}>
        <article>
            <header>
                <a href="#close" aria-label="Close" className="close"></a>
                {title}
            </header>
            <p>
                {children}
            </p>
        </article>
    </dialog>
}
