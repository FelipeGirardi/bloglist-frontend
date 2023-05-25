import { useState } from 'react'

const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={{ display: 'flex' }} className='short'> {blog.title} - {blog.author}
        <div style={showWhenVisible}> <button onClick={toggleVisibility}>hide</button>
        </div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible} className='long'>
        <div className='url'>{blog.url}</div>
        <div className='likes'>likes: {blog.likes} <button onClick={() => handleLike(blog)} id='likeButton'>like</button></div>
        <div className='username'>{blog.user.name}</div>
        <div><button style={{ backgroundColor: 'cyan' }} onClick={() => deleteBlog(blog)}>remove</button></div>
      </div>
    </div>
  )}

export default Blog