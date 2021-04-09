import { fireEvent, render, screen } from '@testing-library/react'
import Form from './Form'

const MOCK_FIELDS = {
  firstName: {
    label: 'First Name',
    required: true,
  },
  lastName: {
    id: 'lastName',
    label: 'Last Name',
  },
  woogaName: {
    id: 'woogaName',
    label: 'Wooga Name',
    placeholder: 'Starts with "wooga.name"',
    required: true,
    validate: (value: string) => {
      return value.startsWith('wooga.name') ? '' : 'Name should start with "wooga.name"'
    },
  },
}

test('renders content', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)
  const formElement = container.querySelector('form')
  expect(formElement).toBeInTheDocument()
})

test('renders submit button', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)
  const formElement = container.querySelector('button')
  expect(formElement).toBeInTheDocument()
})

test('renders form with a title', () => {
  const title = 'Form Title'
  render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} formTitle={title} />)
  const titleElement = screen.getByText(title)
  expect(titleElement).toBeInTheDocument()
})

test('renders correct number of inputs', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)
  const inputs = container.querySelectorAll('input')
  expect(inputs.length).toBe(3)
})

test('expect button to be disabled on first render', () => {
  render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)
  expect(screen.getByRole('button')).toHaveAttribute('disabled')
})

test('does required validation', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)

  const input = container.querySelector('#lastName')!
  const button = container.querySelector('button')!
  fireEvent.change(input, { target: { value: 'lastName' } })
  fireEvent.click(button)

  const errorMessages = screen.getAllByText('This field is required.')

  expect(errorMessages.length).toBe(2)
})

test('does custom validation', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)

  const input = container.querySelector('#woogaName')!
  const button = container.querySelector('button')!
  fireEvent.change(input, { target: { value: 'wooga' } })
  fireEvent.click(button)

  const errorMessage = screen.getByText('Name should start with "wooga.name"')

  expect(errorMessage).toBeInTheDocument()
})

test('submits the form when there is no validation error', () => {
  const { container } = render(<Form formFields={MOCK_FIELDS} onSubmit={() => {}} />)

  expect(screen.getByRole('button')).toHaveAttribute('disabled')

  const woogaInput = container.querySelector('#woogaName') as HTMLInputElement
  const nameInput = container.querySelector('#firstName') as HTMLInputElement
  const button = container.querySelector('button')!

  fireEvent.change(woogaInput, { target: { value: 'wooga.name' } })
  fireEvent.change(nameInput, { target: { value: 'wooga' } })

  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')

  fireEvent.click(button)

  expect(screen.getByRole('button')).toHaveAttribute('disabled')
  expect(nameInput.value).toBe('')
  expect(woogaInput.value).toBe('')
})
