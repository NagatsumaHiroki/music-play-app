'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

interface ErrorModalProps {
  message: string
  onClose: () => void
}

export const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [handleKeyDown])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="エラーモーダル"
      aria-describedby="error-modal-description"
    >
      <div
        className="relative w-full max-w-sm rounded-[2rem] border border-rose-200 bg-white px-6 py-7 shadow-[0_24px_80px_rgba(15,23,42,0.28)] sm:max-w-md sm:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex justify-center">
          <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-rose-500">
            Error
          </span>
        </div>

        <div className="mb-5 flex justify-center">
          <Image
            src="/error-modal-icon.png"
            alt=""
            width={220}
            height={260}
            className="h-auto w-36 drop-shadow-[0_14px_26px_rgba(15,23,42,0.12)] sm:w-40"
            priority
          />
        </div>

        <div className="text-center">
          <p
            id="error-modal-description"
            className="mx-auto max-w-sm text-lg font-semibold leading-8 text-slate-700 sm:text-xl"
          >
            {message}
          </p>
        </div>

        <div className="mt-7 flex justify-center">
          <button
            onClick={onClose}
            className="min-w-32 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  )
}
