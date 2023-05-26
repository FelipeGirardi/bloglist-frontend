import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  // -- handles

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setMessage('User logged in')
      setNotificationType('confirm')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Error: wrong credentials')
      setNotificationType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const blog = await blogService.createBlog(blogObject)

      setMessage(`A new blog was added: ${title} by ${author}`)
      setNotificationType('confirm')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      setMessage('Error: could not add blog')
      setNotificationType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateBlog(blog.id, updatedBlog)
      const updatedBlogs = blogs.map((currBlog) => (currBlog.id === blog.id ? updatedBlog : currBlog))
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log('Could not update blog')
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Delete ${blog.title}?`)) {
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(updatedBlogs)
      }
    } catch (exception) {
      console.log('Could not delete blog')
    }
  }

  // -- components

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} />
        )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} notifType={notificationType} />
      {!user &&
        <LoginForm username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin} />}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new blog">
            <BlogForm title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleAddBlog={handleAddBlog} />
          </Togglable>
          {blogsList()}
          <button id="logoutButton" onClick={() => handleLogout()}>logout</button>
        </div>
      }
    </div>
  )
}

export default App