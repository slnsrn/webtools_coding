import React, { useState, useCallback } from 'react'

import useFormUtils from '../hooks/useFormUtils'
import { FormFields } from '../types/Field'

import TextInput from './TextInput'

export type FormState<T extends FormFields> = {
  [name in keyof T]: { value: string; error: string }
}
interface FormProps<T extends FormFields> {
  formFields: T
  formTitle?: string
  description?: string
  onSubmit: (values: { [key in keyof T]: string }) => void
}

export default function Form<T extends FormFields>({ formTitle, description, onSubmit, formFields }: FormProps<T>) {

  const { initialState, doValidation } = useFormUtils(formFields)
  const [formState, setFormState] = useState<FormState<T>>(initialState)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setButtonDisabled(false)
      const { id, value } = e.target

      // It is a product decision to call validate onChange. We can skip this here and just call it onSubmit.
      // In that case error state can also be separated from the formState
      const error = doValidation(id, value)

      setFormState({
        ...formState,
        [id]: { value, error },
      })
    },
    [formState, doValidation]
  )

  const validateState = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = Object.keys(formState).map((field) => {
      const error = doValidation(field, formState[field].value)

      setFormState((prevState: FormState<T>) => ({
        ...prevState,
        [field]: { ...prevState[field], error },
      }))

      return error
    })

    const hasErrors = errors.some((err) => !!err)

    if (!hasErrors) {
      handleSubmit()
    }
  }

  const handleSubmit = () => {
    const fields:(keyof T)[] = Object.keys(formFields)
    const response = fields.reduce((res, field) => {
      return { ...res, [field]: formState[field].value }
    }, {} as {[field in keyof T]: string})

    onSubmit(response)
    setFormState(initialState)
    setButtonDisabled(true)
  }

  const renderInputs = () => {
    return Object.keys(formFields).map((field) => {
      switch (formFields[field].type) {
        case 'radio':
        case 'select':
          //type of the fields can be extended
          return null
        default: {
          return (
            <TextInput
              key={field}
              id={field}
              {...formFields[field]}
              value={formState[field].value}
              error={formState[field].error}
              onChange={handleChange}
            />
          )
        }
      }
    })
  }

  const renderFormFooter = () => (
    <div className="px-4 py-3 bg-purple-50 text-right sm:px-6">
      <button
        disabled={buttonDisabled}
        type="submit"
        className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none ${
          buttonDisabled ? 'cursor-not-allowed bg-purple-400' : 'cursor-pointer bg-purple-700 hover:bg-purple-900'
        }`}
      >
        Save
      </button>
    </div>
  )

  const renderFormHeader = () => (
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        {formTitle && <h3 className="text-lg font-medium leading-6 text-purple-800">{formTitle}</h3>}
        {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  )

  return (
    <div className="px-6 py-8 md:p-12">
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-4 md:gap-6">
          {(formTitle || description) && renderFormHeader()}
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={validateState}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">{renderInputs()}</div>
                </div>
                {renderFormFooter()}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
