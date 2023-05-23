import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogsState, setBlogsState}) => {
  const [visible, setVisible] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBlog = async () => {
    try {
      const updatedBlog = await blogService.updateBlog(blog.id, blogAfterLikePress)
      setBlogLikes(updatedBlog.likes)
      const newBlogsState = blogsState.map(({likes, ...b}) => ({
        ...b,
        likes: b.id === updatedBlog.id ? updatedBlog.likes : likes
      })
      )
      setBlogsState(newBlogsState)
    } catch (exception) {
      console.log('Could not update blog')
    }
  }

  const deleteBlog = async () => {
    try {
      await blogService.deleteBlog(blog.id)
      const newBlogsState = blogsState.filter((b) => b.id !== blog.id)
      setBlogsState(newBlogsState)
    } catch (exception) {
      console.log('Could not delete blog')
    }
  }

  const blogAfterLikePress = {
    title: blog.title,
    url: blog.url,
    author: blog.author,
    likes: blogLikes + 1,
    user: blog.user.id
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={{ display: "flex" }}> {blog.title} - {blog.author} 
        <div style={showWhenVisible}> <button onClick={toggleVisibility}>hide</button> 
        </div> 
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>view</button>
      </div>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>likes: {blogLikes} <button onClick={updateBlog}>like</button></div>
        <div>{blog.user.name}</div>
        <div><button style={{backgroundColor: 'cyan'}} onClick={deleteBlog}>remove</button></div>
      </div>
    </div>
  )}

export default Blog