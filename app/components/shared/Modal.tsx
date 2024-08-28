'use client'

import React, { useEffect, useRef, ReactElement, ReactNode } from 'react';

interface ModalProps {
  children: ReactElement<{ closeModal: () => void }>;
}

function Modal({ children }: ModalProps) {
  const dialogueRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
      dialogueRef.current?.showModal();
  }, []);

  const closeModal = () => {
    dialogueRef.current?.close();
  }; 

  return (
    <dialog ref={dialogueRef}>
      <div className="blur-bg-4 backdrop-blur-sm fixed overflow-y-auto py-20 px-2 flex justify-center items-center w-screen min-h-screen top-0 left-0 bg-[var(--modal-bg)] z-[100000000000]">
        {React.cloneElement(children, { closeModal })}
      </div>
    </dialog>
  );
}

export default Modal;
