// client/src/Projects.test.jsx
import { render, screen } from '@testing-library/react'
import Projects from './components/Projects'

describe('Projects component', () => {
  test('renders the projects heading', () => {
    render(<Projects />)

    // Change this to EXACT text or use a part of it
    const heading = screen.getByRole('heading', { name: /projects/i })

    expect(heading).toBeInTheDocument()
  })
})
