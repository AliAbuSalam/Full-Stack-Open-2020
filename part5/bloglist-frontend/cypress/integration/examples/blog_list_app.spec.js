describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset/');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function(){
    cy.contains('log in to application');
    cy.contains('username');
    cy.contains('password');
    cy.get('button').contains('login');
    cy.get('form').get('input').should('have.length', '2');
  });

  describe('Login', function(){
    beforeEach(function(){
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'adminTest',
        password: '1234',
        name: 'Mr.Admin'
      });
    });

    it('succeeds with correct credentials', function(){
      cy.get('input#username').type('adminTest');
      cy.get('input#password').type('1234');
      cy.get('button').contains('login').click();
      cy.contains('Mr.Admin logged in');
      cy.get('button').contains('logout');
    });

    it('fails with wrong credentials', function(){
      cy.get('input#username').type('adminTes');
      cy.get('input#password').type('123');
      cy.get('button').contains('login').click();
      cy.contains('Wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function(){
    beforeEach(function(){
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'adminTest',
        password: '1234',
        name: 'Mr.Admin'
      });
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'adminTest',
        password: '1234',
      })
        .then((result) => {
          localStorage.setItem('loggedInUser', JSON.stringify(result.body));
          cy.visit('http://localhost:3000');
        });
    });

    it('A blog can be created', function(){
      cy.get('button').contains('new note').click();
      cy.get('#title').type('This is a blog made with cypress');
      cy.get('#author').type('Mr.Admin');
      cy.get('#url').type('http://localhost:3000');
      cy.get('button').contains('create').click();
      cy.get('#successNotification').contains('a new blog This is a blog made with cypress by Mr.Admin added');
      cy.visit('http://localhost:3000');
      cy.contains('This is a blog made with cypress');
    });

    describe('User can mess with blogs', function(){
      beforeEach(function(){
        const token = JSON.parse(localStorage.getItem('loggedInUser')).token;
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'This is a blog made with cypress',
            author: 'Mr.Admin',
            url: 'http://localhost:3000',
            likes: 0
          },
          headers: {
            'Authorization': `bearer ${token}`
          }
        }).then(() => {
          cy.visit('http://localhost:3000');
        });
      });

      it('User can like a blog', function(){
        cy.get('html').contains('view').click();
        cy.get('button').contains('like').click();
        cy.get('.blogDivWithVisibility').contains('1');
      });

      it('User can delete a blog they created', function(){
        cy.contains('view').click();
        cy.get('button').contains('remove').click();
        cy.on('window:confirm', (str) => {
          expect(str).to.equal('Remove blog This is a blog made with cypress by Mr.Admin?');
          return true;
        });
        cy.contains('This is a blog made with cypress').should('not.visible');
      });
    });
    describe('User can mess with more than one blog', function(){
      beforeEach(function(){
        const token = JSON.parse(localStorage.getItem('loggedInUser')).token;
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'Middle amount of likes',
            author: 'Mr.Admin',
            url: 'http://localhost:3000',
            likes: 5
          },
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'Lowest amount of likes',
            author: 'Mr.Admin',
            url: 'http://localhost:3000',
            likes: 0
          },
          headers: {
            'Authorization': `bearer ${token}`
          }
        });
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'Highest amount of likes',
            author: 'Mr.Admin',
            url: 'http://localhost:3000',
            likes: 10
          },
          headers: {
            'Authorization': `bearer ${token}`
          }
        }).then(() => {
          cy.visit('http://localhost:3000');
        });
      });
      it.only('Blogs are ordered according to likes with the blog with the most likes being first', function(){
        cy.get('.blogDivNoVisibility').then((listOfBlogs) => {
          cy.wrap(listOfBlogs[0]).contains('Highest amount of likes');
          cy.wrap(listOfBlogs[1]).contains('Middle amount of likes');
          cy.wrap(listOfBlogs[2]).contains('Lowest amount of likes');
        });
      });
    });
  });
});