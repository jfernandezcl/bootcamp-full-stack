import { render, screen, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('calls createBlog with correct details when a new blog is created', () => {

  const mockCreateBlog = jest.fn();

  render(<BlogForm createBlog={mockCreateBlog} />);

  const titleInput = screen.getByLabelText(/title/i);
  const authorInput = screen.getByLabelText(/author/i);
  const urlInput = screen.getByLabelText(/url/i);
  const createButton = screen.getByText(/create/i);

  fireEvent.change(titleInput, { target: { value: 'Test Blog Title' } });
  fireEvent.change(authorInput, { target: { value: 'Test Author' } });
  fireEvent.change(urlInput, { target: { value: 'http://testblog.com' } });

  fireEvent.click(createButton);

  expect(mockCreateBlog).toHaveBeenCalledTimes(1);

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
  });
});
