const BlogForm = ({ title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, handleAddBlog }) => { return (
  <form onSubmit={handleAddBlog}>
    <div>
      title
      <input
        type="text"
        value={title}
        name="Title"
        placeholder="Blog title"
        id="blogTitle"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        name="Author"
        placeholder="Blog author"
        id="blogAuthor"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        name="Url"
        placeholder="Blog url"
        id="blogUrl"
        onChange={handleUrlChange}
      />
    </div>
    <button id="create-button" type="submit">create</button>
  </form>
)
}

export default BlogForm