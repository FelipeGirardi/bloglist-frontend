import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('5.16 - event handler called when blog is created', async () => {
  const handleAddBlog = jest.fn(e => e.preventDefault())
  render(<BlogForm handleAddBlog={handleAddBlog} />)

  const titleInput = screen.getByPlaceholderText('Blog title')
  const authorInput = screen.getByPlaceholderText('Blog author')
  const urlInput = screen.getByPlaceholderText('Blog url')
  const createButton = screen.getByText('create')

  const user = userEvent.setup()
  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'John Doe')
  await user.type(urlInput, 'www.test.com')
  await user.click(createButton)

  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('Test Blog')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('John Doe')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('www.test.com')
})