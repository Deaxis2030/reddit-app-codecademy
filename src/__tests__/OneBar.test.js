import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OneBar from '../Components/Sidebar/onebar';

describe('OneBar Component', () => {
  const mockGetUrl = jest.fn();
  const mockData = { title: 'testSubreddit', url: '/r/testSubreddit/' };

  it('renders subreddit title', () => {
    render(<OneBar button={true} data={mockData} getUrl={mockGetUrl} />);
    expect(screen.getByText('testSubreddit')).toBeInTheDocument();
  });

  it('calls getUrl when clicked and button is true', () => {
    render(<OneBar button={true} data={mockData} getUrl={mockGetUrl} />);
    const button = screen.getByText('testSubreddit');
    fireEvent.click(button);
    expect(mockGetUrl).toHaveBeenCalledWith('/r/testSubreddit/');
  });

  it('does not call getUrl when button is false', () => {
    render(<OneBar button={false} data={mockData} getUrl={mockGetUrl} />);
    const button = screen.getByText('testSubreddit');
    fireEvent.click(button);
    expect(mockGetUrl).not.toHaveBeenCalled();
  });
});