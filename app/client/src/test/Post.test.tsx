import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, it } from 'vitest'
import Post from '../pages/Private/Post/Post'



describe('Post', () => {
  afterEach(cleanup)

  it('should render', () => {
    render(<Post />)
  })


})
