import { useState } from 'react'

import IField from './types/Field'
import IResponse from './types/Response'

import Form from './components/Form'
import ResponseBar from './components/ResponseBar'

// i kept the fields here as it is a short one, but normal projects it can be kept in another file
const fields: IField[] = [
  {
    id: 'firstName',
    label: 'First Name',
    required: true,
  },
  {
    id: 'lastName',
    label: 'Last Name',
  },
  {
    id: 'woogaName',
    label: 'Wooga Name',
    placeholder: 'Starts with "wooga.name"',
    required: true,
    validate: (value: string) => {
      return value.startsWith('wooga.name') ? '' : 'Name should start with "wooga.name"'
    },
  },
  {
    id: 'email',
    label: 'Email',
    placeholder: 'Your email',
    validate: (value: string) => {
      const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const regEx = new RegExp(emailRegEx, 'g')

      return regEx.test(value) ? '' : 'Please enter a valid email address.'
    },
  },
]

function App() {
  const [response, setResponse] = useState<IResponse | undefined>(undefined)

  return (
    <div>
      <ResponseBar response={response} resetResponseBar={() => setResponse(undefined)} />
      <Form
        formTitle="Personal Information"
        description="We would like to know more about you."
        formFields={fields}
        onSubmit={(values) => {
          console.log(values)
          setResponse({ message: 'Form is successfully submitted', type: 'success' })
        }}
      />
    </div>
  )
}

export default App
