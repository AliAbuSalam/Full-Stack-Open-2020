import React from 'react';
import BlogForm from './BlogForm';
import { render, fireEvent } from '@testing-library/react';

test('BlogForm send the event handler with the right detail when it is called', () => {
  const createBlogHandler = jest.fn();
  const component = render(
    <BlogForm createBlog={createBlogHandler} />
  );

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'BlogForm Testing' }
  });
  fireEvent.change(author, {
    target: { value: 'Mike Wazowski' }
  });
  fireEvent.change(url, {
    target: { value: 'https://reacttesting.com' }
  });
  fireEvent.submit(form);

  expect(createBlogHandler.mock.calls).toHaveLength(1);
  expect(createBlogHandler.mock.calls[0][0]).toEqual({
    title: 'BlogForm Testing',
    author: 'Mike Wazowski',
    url: 'https://reacttesting.com'
  });
});