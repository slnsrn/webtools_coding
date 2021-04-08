import React from 'react'

import IField from '../types/Field'

interface ITextInput extends IField {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string
  value: string
  type?: 'text' | 'number'
}

export default function TextInput(inputProps: ITextInput): JSX.Element {
  const { id, error, label, required, onChange, value, type = 'text' } = inputProps

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={id} className="block text-sm font-medium text-purple-800">
        {`${label}${required ? '*' : ''}`}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className={`mt-2 py-2 px-4 focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md ${
          error ? ' border-red-500' : ' border-gray-300'
        }`}
      />
      {!!error && <span className="text-xs italic pl-2 text-red-500">{error}</span>}
    </div>
  )
}
