Form Component

## Configuration

The project is created by `create-react-app` command with Typescript setup for convenience.
Personally I am a big fan of **tailwindcss**, so I use it almost all the projects - whenever possible. Since Create React App doesn't let us override the PostCSS configuration natively, I used [_CRACO_](https://github.com/gsoft-inc/craco) to be able to configure tailwind.

**to install**: `yarn`
**to start** : `yarn start`
**to test** : `yarn test`

## Form

### Props
```ts
interface  FormProps<T  extends  FormFields>  {
	formFields:  T
	onSubmit: (values: { [name  in  keyof  T]: string }) => void
	formTitle?: string
	description?: string
}

type FormFields = { [name: string]: IField }
```
Form component gets the props listed above.
- `formFields` is an object composed of the individual fields to be rendered in the form.
- `title` and `description` are optional props.
- `onSubmit` function is called when form is submitted without any validation errors.  I preferred to use generic type to define the return type of values. In these case, you know the return values will be the same keys with the formFields object that you have sent to the form component.

### Form field props
```ts
interface IField  {
	label: string
	type?: 'text'|'number'|'select'|'image'|'radio' //extendable
	value?: string
	placeholder?: string
	disabled?: boolean
	required?: boolean
	validate?: (value: string) => string
}
```
To be able to render the field's input (_default text input_) and get its value, the only mandatory property in the Field configuration object is `label`. The other properties are more feature specific.

The form component renders the fields depending on their type. Even though in this project I was asked to work with only `text` type, the `renderFields` function in the Form component is extendable with different types

### Validation

I chose to implement the validation feature as a simple function to be passed to the field configuration that returns an error string when there's a validation error. An empty string indicates _no error_. This way the component is more generic, and lets the user be flexible. If I was working on this project professionally, I would consider to create a collection of basic validation functions and provide it to be used in combination with the Form component.

### `useFormUtils` hook

I created a hook to split out initialization of the form state and validation logic into their own file. This keeps the Form component cleaner. Event handlers are kept in the Form component itself.

### Tests
Tests covering the functionality in Form component, and in App covering the return values are added.
