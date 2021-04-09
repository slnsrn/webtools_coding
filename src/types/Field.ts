export interface IField {
  label: string
  type?: 'text' | 'number' | 'select' | 'image' | 'radio' //extendable
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  /** @returns Error description. An empty string means no error */
  validate?: (value: string) => string
}

export type FormFields = { [name: string]: IField }
