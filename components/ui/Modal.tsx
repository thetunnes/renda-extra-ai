'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
/** Native modal gives inert background, Escape, focus containment and restoration. */
export default function Modal({
  children,
  labelledBy,
  onClose,
}: {
  children: ReactNode;
  labelledBy: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  return (
    <dialog
      className="platform-dialog"
      ref={ref}
      aria-labelledby={labelledBy}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        const r = e.currentTarget.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
          onClose();
      }}
    >
      <button className="close" aria-label="Fechar" onClick={onClose}>
        <X />
      </button>
      {children}
    </dialog>
  );
}
