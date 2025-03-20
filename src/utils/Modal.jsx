import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, isOpen }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={modalRef} className="modal">
      <div className="modal-content">{children}</div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
