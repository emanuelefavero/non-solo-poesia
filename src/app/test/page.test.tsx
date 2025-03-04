import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page', () => {
  test('it renders', () => {
    render(<Page />)
    expect(screen.getByText(/hello world/i)).toBeInTheDocument()
  })
})
