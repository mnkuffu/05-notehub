import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
    const handleEsc = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    const handleBackdropClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
        return () => {
            removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [handleEsc]);
    
    return createPortal(
        <div
            className={css.backdrop}
            role='dialog'
            aria-modal='true'
            onClick={handleBackdropClick}
        >
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
}
    export default Modal;