/* eslint-disable no-undef */
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

// eslint-disable-next-line no-undef
describe('Todo component', () => {
  it('renders a task', () => {
    render(<Todo task="Test Task" onComplete={() => { }} onDelete={() => { }} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('calls onComplete when the Complete button is clicked', () => {
    const onComplete = jest.fn();
    render(<Todo task="Test Task" onComplete={onComplete} onDelete={() => { }} />);
    fireEvent.click(screen.getByText('Complete'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when the Delete button is clicked', () => {
    const onDelete = jest.fn();
    render(<Todo task="Test Task" onComplete={() => { }} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
