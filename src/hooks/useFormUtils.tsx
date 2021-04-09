import { useCallback } from 'react'
import { FormState } from '../components/Form'

import { FormFields } from '../types/Field'


const requiredErrorMessage = 'This field is required.'

export default function useFormUtils<T extends FormFields>(fields: T) {
  const createInitialState = () => {
    return Object.keys(fields).reduce((state, field) => {
      return { ...state, [field]: { value: fields[field].value || '', error: '' } }
    }, {} as FormState<T>)
  }

  const doValidation = useCallback(
    (id, value) => {
      const field = fields[id]

      if (field?.required && value.trim() === '') {
        return requiredErrorMessage
      }

      if (!!value && typeof field.validate === 'function') {
        return field.validate(value)
      }

      return ''
    },
    [fields]
  )

  return { initialState: createInitialState(), doValidation }
}
