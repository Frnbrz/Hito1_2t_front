import { Profile } from '@/pages/Private'
import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'



describe('Profile', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<Profile />)
  })

  it('should render with text', () => {
    const { getByText } = render(<Profile />)
    expect(getByText('Active')).toBeInTheDocument()
  })

  it('should render with text', () => {
    const { getByText } = render(<Profile />)
    expect(getByText('Active')).toBeInTheDocument()
  })
})
