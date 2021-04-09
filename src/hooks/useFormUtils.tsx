import { useCallback } from 'react'
import { FormState } from '../components/Form'
import { FormFields } from '../types/Field'

const requiredErrorMessage = 'This field is required.'

//i used this hook to separate util functions from component.
//This could have been a 'util.js*ts' file.
//I preferred to have a hook to keep the formFields for the validation, rather than sending the whole object to the function on every call.

export default function useFormUtils<T extends FormFields>(fields: T) {
  /**
   * creates an object from given FormFields to keep the form state
   * @returns an object with field ids as id:{value, error}
   */
  const createInitialState = () => {
    return Object.keys(fields).reduce((state, name) => {
      return { ...state, [name]: { value: fields[name].value || '', error: '' } }
    }, {} as FormState<T>)
  }

  /**
   * gets field id and the value, validates the value with the provided validate function
   * returns error message on error, and empty string when there is no error
   */
  const doValidation = useCallback(
    (name, value) => {
      const field = fields[name]

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

  return {
    initialState: createInitialState(),
    doValidation,
  }
}
