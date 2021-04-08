export default interface IField {
  id: string
  label: string
  component?: 'text' | 'number' | 'select' | 'image' | 'radio' //extendable
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  validate?: (value: string) => string
}
