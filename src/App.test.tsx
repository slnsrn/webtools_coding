import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form', () => {
 const { container } = render(<App />)
 const formElement = container.querySelector('form')
 expect(formElement).toBeInTheDocument()
});


