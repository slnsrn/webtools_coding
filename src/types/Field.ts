export interface IField {
  label: string
  type?: 'text' | 'number' | 'select' | 'image' | 'radio' //extendable
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  validate?: (value: string) => string
}

export type FormFields = { [name: string]: IField }
