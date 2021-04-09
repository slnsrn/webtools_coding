import { render, screen, fireEvent } from '@testing-library/react'
import App, { formFields } from './App'

test('renders form', () => {
  const { container } = render(<App />)
  const formElement = container.querySelector('form')
  expect(formElement).toBeInTheDocument()
})

test('Form returns an object with the same keys with the formField object', () => {
  const { container } = render(<App />)

  expect(screen.getByRole('button')).toHaveAttribute('disabled')

  const woogaInput = container.querySelector('#woogaName') as HTMLInputElement
  const nameInput = container.querySelector('#firstName') as HTMLInputElement
  const button = container.querySelector('button')!

  fireEvent.change(woogaInput, { target: { value: 'wooga.name' } })
  fireEvent.change(nameInput, { target: { value: 'wooga' } })

  expect(screen.getByRole('button')).not.toHaveAttribute('disabled')

  fireEvent.click(button)

  Object.keys(formFields).forEach((key) => {
    expect(screen.getByTestId(key)).toBeInTheDocument()
  })
})
