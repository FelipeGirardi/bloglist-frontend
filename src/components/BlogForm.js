const BlogForm = ({ title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, handleAddBlog }) => { return (
  <form onSubmit={handleAddBlog}>
    <div>
      title
      <input
        type="text"
        value={title}
        name="Title"
        placeholder='Blog title'
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        name="Author"
        placeholder='Blog author'
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        name="Url"
        placeholder='Blog url'
        onChange={handleUrlChange}
      />
    </div>
    <button type="submit">create</button>
  </form>
)
}

export default BlogForm