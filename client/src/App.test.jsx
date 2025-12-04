// client/src/App.test.jsx
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App component', () => {
  test('renders home page content', () => {
    render(<App />)

    // 🔹 IMPORTANT:
    // Change the text below to something that actually appears
    // on your Home page or Layout when you first open the site.
    // Example: your name, a heading like "Welcome to my portfolio", etc.
    const element = screen.getByText(/portfolio/i)

    expect(element).toBeInTheDocument()
  })
})
