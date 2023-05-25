import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let testBlog

  beforeEach(() => {
    testBlog = {
      title: 'Test blog',
      url: 'www.test.com',
      author: 'John Doe',
      likes: 0,
      user: {
        username: 'JaneDoe',
        name: 'Jane Doe',
        id: '1'
      }
    }
    container = render(<Blog blog={testBlog} />).container
  })

  test('5.13 - renders content', () => {
    const short = container.querySelector('.short')
    const long = container.querySelector('.long')

    expect(short).toHaveTextContent(testBlog.title)
    expect(short).toHaveTextContent(testBlog.author)
    expect(short).toHaveStyle('display: flex')
    expect(long).toHaveStyle('display: none')
  })

  test('5.14 - show more details when view button is pressed', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    const short = container.querySelector('.short')
    const long = container.querySelector('.long')
    const url = container.querySelector('.url')
    const likes = container.querySelector('.likes')
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

    await user.click(viewButton)
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(short).toHaveStyle('display: flex')
    expect(long).toHaveStyle('display: block')
  })

  test('5.15 - event handler executed twice when like button is clicked twice', async () => {
    const mockHandler = jest.fn()
    render(<Blog blog={testBlog} handleLike={mockHandler} />)
    const user = userEvent.setup()
    const button = screen.getByText('like')
    for (let i = 0; i < 2; i++) {
      await user.click(button)
    }

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})