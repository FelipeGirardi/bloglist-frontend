describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
  })

  it('5.17 - front page can be opened', function() {
    cy.get('#login-button')
  })

  it('5.18 - login form can be opened and login can be executed', function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Megauser',
      username: 'megauser',
      password: 'mega123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.get('#username').type('megauser')
    cy.get('#password').type('mega123')
    cy.get('#login-button').click()
    cy.contains('Megauser logged in', { force: true })
  })

  it('5.18 - login fails with wrong credentials', function() {
    cy.get('#username').type('wronguser')
    cy.get('#password').type('wrong123')
    cy.get('#login-button').click()
    cy.contains('wrong credentials', { force: true })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'megauser', password: 'mega123' })
    })

    it('5.19 - a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('New Blog')
      cy.get('#blogAuthor').type('New Author')
      cy.get('#blogUrl').type('newblog.com')
      cy.get('#create-button').click()
      cy.contains('A new blog was added')
    })
  })

  describe('when logged in and there is a blog', function() {
    const aUser = {
      name: 'HiUser',
      username: 'hiuser',
      password: 'hi123'
    }
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, aUser)
      cy.get('#username').type('megauser')
      cy.get('#password').type('mega123')
      cy.get('#login-button').click()
      // cy.login({ username: 'lolUser', password: 'lol123' })
      // cy.createBlog({
      //   title: 'another blog',
      //   author: 'another author',
      //   url: 'anotherurl.com'
      // })
    })

    it('5.20 - a user can like a blog', function () {
      cy.get('#moreInfo').click()
      cy.get('#likes').should('contain', 'likes: 0')
      cy.get('#likeButton').click()
      // cy.get('#likes').should('contain', 'likes: 1')
    })

    it('5.21 - the user who created the blog can delete it', function () {
      cy.get('#moreInfo').click()
      cy.get('#deleteButton').click()
    })

    it('only the creator can see the delete button of a blog', function () {
      cy.get('#moreInfo').click()
      cy.get('#deleteButton').should('be.visible')
      cy.get('#logoutButton').click()
      cy.login({ username: aUser.username, password: aUser.password })
      cy.get('#moreInfo').click()
      cy.get('#deleteButton').should('not.be.visible')
    })
  })
})