import React from 'react'
import { IField } from '../types/Field'

interface ITextInput extends IField {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  error: string
  value: string
}

export default function TextInput(inputProps: ITextInput): JSX.Element {
  const { name, error, label, required, onChange, value } = inputProps

  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-sm font-medium text-purple-800">
        {`${label}${required ? '*' : ''}`}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`mt-2 py-2 px-4 focus:outline-none block w-full shadow-sm sm:text-sm border rounded-md ${
          error ? ' border-red-500' : ' border-gray-300'
        }`}
      />
      {!!error && <span className="text-xs italic pl-2 text-red-500">{error}</span>}
    </div>
  )
}
