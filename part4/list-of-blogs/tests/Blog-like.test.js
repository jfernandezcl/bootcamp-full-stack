import { render, screen, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('calls handleLike twice when like button is clicked twice', () => {
  const mockHandleLike = jest.fn();

  const blog = { title: 'Test Blog', author: 'Test Author', likes: 5 };
  render(<Blog blog={blog} handleLike={mockHandleLike} />);

  const likeButton = screen.getByText('Like');

  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandleLike).toHaveBeenCalledTimes(2);
});
