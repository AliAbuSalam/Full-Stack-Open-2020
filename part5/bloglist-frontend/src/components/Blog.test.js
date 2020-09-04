import React from 'react';
import Blog from './Blog';
import { render, fireEvent } from '@testing-library/react';

let blogToRender;
let updateBlogHandler;
let deleteBlogHandler;
let loggedInUser;
let component;

beforeEach(() => {
  blogToRender = {
    title: 'Ampere is coming soon',
    author: 'Jensen Huang',
    url: 'https://nvidiagraphics.com',
    likes: 500,
    user: {
      username: 'adminTest'
    }
  };
  updateBlogHandler = jest.fn();
  deleteBlogHandler = jest.fn();
  loggedInUser = { username: 'adminTest' };
  component = render(
    <Blog blog={blogToRender} updateBlog={updateBlogHandler} deleteBlog={deleteBlogHandler} loggedInUser={loggedInUser} />
  );
});

test('Blog component only renders blog\'s title and author by default', () => {
  const blogTitle = component.container.querySelector('.blogDivNoVisibility');
  const blogFullView = component.container.querySelector('.blogDivWithVisibility');

  expect(blogFullView).toHaveStyle('display:none');
  expect(blogTitle).toHaveTextContent('Ampere is coming soon');
  expect(blogTitle).toHaveTextContent('Jensen Huang');
  expect(blogTitle).not.toHaveTextContent('https://nvidiagraphics.com');
  expect(blogTitle).not.toHaveTextContent('500');
});

test('Blog component show the blog\'s url and number of likes after the button controlling shown details has been clicked', () => {
  const button = component.getByText('view');
  const blogFullView = component.container.querySelector('.blogDivWithVisibility');
  const blogLimitedView = component.container.querySelector('.blogDivNoVisibility');
  fireEvent.click(button);

  expect(blogFullView).toHaveStyle('');
  expect(blogLimitedView).toHaveStyle('display:none');

  expect(blogFullView).toHaveTextContent('Ampere is coming soon');
  expect(blogFullView).toHaveTextContent('Jensen Huang');
  expect(blogFullView).toHaveTextContent('https://nvidiagraphics.com');
  expect(blogFullView).toHaveTextContent('500');
});

test('Event Handler for like button gets called twice after clicking the like button twice', () => {
  const showButton = component.getByText('view');
  fireEvent.click(showButton);

  const likeButton = component.getByText('like');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(updateBlogHandler.mock.calls).toHaveLength(2);
});