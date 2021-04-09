import { useState } from 'react'

import IResponse from './types/Response'

import Form from './components/Form'
import ResponseBar from './components/ResponseBar'
import { FormFields } from './types/Field'

// the fields are kept here for visibility, but it can also be kept in another file
const formFields = {
  firstName: {
    label: 'First Name',
    required: true,
  },
  lastName: {
    label: 'Last Name',
  },
  woogaName: {
    label: 'Wooga Name',
    placeholder: 'Starts with "wooga.name"',
    required: true,
    validate: (value: string) => {
      return value.startsWith('wooga.name') ? '' : 'Name should start with "wooga.name"'
    },
  },
  email: {
    label: 'Email',
    placeholder: 'Your email',
    validate: (value: string) => {
      const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const regEx = new RegExp(emailRegEx, 'g')

      return regEx.test(value) ? '' : 'Please enter a valid email address.'
    },
  },
}

function App() {
  const [response, setResponse] = useState<IResponse | undefined>(undefined)
  const [formValues, setFormValues] = useState<{ [key in keyof typeof formFields]: string } | undefined>(undefined)

  const renderFormValues = () => {
    return (
      <div className="mx-auto md:max-w-md p-6">
        <h2 className="text-md font-bold text-purple-800 mb-4"> Submitted values</h2>
        {Object.keys(formValues!).map((value) => {
          return (
            <div className="text-sm font-bold text-gray-600 my-2 w-full flex space-x-4">
              <span className="w-1/2">{value}:</span>
              <span className="w-1/2">{formValues![value as keyof typeof formFields] || '-'}</span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      <Form
        formTitle="Personal Information"
        description="We would like to know more about you."
        formFields={formFields}
        onSubmit={(values) => {
          setFormValues(values)
          setResponse({ message: 'Form is successfully submitted', type: 'success' })
        }}
      />
      {formValues && renderFormValues()}
      <ResponseBar response={response} resetResponseBar={() => setResponse(undefined)} />
    </div>
  )
}

export default App
