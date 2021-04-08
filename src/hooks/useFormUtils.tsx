import { useCallback } from 'react'

import IField from '../types/Field'

import { FormState } from '../components/Form'

const requiredErrorMessage = 'This field is required.'

const createInitialState = (fields: IField[]): FormState => {
  return fields.reduce((state, field) => {
    return { ...state, [field.id]: { value: field.value || '', error: '' } }
  }, {})
}

export default function useFormUtils(fields: IField[]) {
  const getField = useCallback((id: string) => fields.find((field) => field.id === id), [fields])

  const doValidation = useCallback(
    (id, value) => {
      const field = getField(id)!

      if (field?.required && value.trim() === '') {
        return requiredErrorMessage
      }

      if (!!value && typeof field.validate === 'function') {
        return field.validate(value)
      }

      return ''
    },
    [getField]
  )

  return { initialState: createInitialState(fields), doValidation, }
}
