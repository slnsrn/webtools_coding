import { useEffect, useState } from 'react'

import IResponse from '../types/Response'

export interface ResponseBarProps {
  response?: IResponse
  timeout?: number
  resetResponseBar?: () => void
}

export default function ResponseBar({
  response,
  timeout = 3000,
  resetResponseBar = () => undefined,
}: ResponseBarProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(!!response)
  }, [response])

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        resetResponseBar()
      }, timeout)
    }
  }, [open, resetResponseBar, timeout])

  if (!response) return null

  return (
    <div
      className={`max-w-lg text-white text-center rounded-md py-2 px-6 position fixed z-1 bottom-4 mb-6 text-sm flex ${
        responseBarClasses[response.type]
      } ${responseBarClasses[open ? 'fadeIn' : 'fadeOut']}`}
      style={{
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)',
        transition: transition[open ? 'open' : 'default'],
      }}
    >
      {response.message}
    </div>
  )
}

const responseBarClasses = {
  warning: 'bg-yellow-400',
  error: 'bg-red-400',
  success: 'bg-purple-400',
  fadeIn: 'opacity-1 visible',
  fadeOut: 'opacity-0 invisible',
}

const transition = {
  default: 'visibility 300s linear 300ms, opacity 300ms',
  open: 'visibility 0s linear 0s, opacity 300ms',
}
