import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import postsReducer from '../Components/panel/panelSlice';
import subredditsReducer from '../Components/Sidebar/SidebarSlice';
import commentsReducer from '../Components/Comments/commentsSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      posts: postsReducer,
      subreddits: subredditsReducer,
      comments: commentsReducer,
    },
  });

describe('App Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    // Mock subreddit API response
    fetch.mockResponseOnce(JSON.stringify({
      data: { children: [{ data: { display_name: 'testSubreddit' } }] },
    }));
    // Mock posts API response with id
    fetch.mockResponseOnce(JSON.stringify({
      data: { children: [{ data: { title: 'Test Post', id: '123' } }] },
    }));
  });

  it('renders Banner, Search, SideBar, and Panels components without crashing', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText('Reddit App 2.0')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Most Popular SubReddits')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    });
  });

  it('applies light mode class by default', async () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appContainer = container.querySelector('.appContainer');
    expect(appContainer).toHaveClass('appContainer');
    expect(appContainer).not.toHaveClass('appContainerDarkMode');

    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    });
  });

  it('toggles to dark mode when handleClick is called', async () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appContainer = container.querySelector('.appContainer');
    const toggleButton = screen.getByRole('button', { name: 'Toggle Dark Mode' });

    expect(appContainer).toHaveClass('appContainer');
    expect(appContainer).not.toHaveClass('appContainerDarkMode');

    fireEvent.click(toggleButton);
    expect(appContainer).toHaveClass('appContainerDarkMode');
    expect(appContainer).not.toHaveClass('appContainer');

    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    });
  });

  it('toggles back to light mode on second click', async () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const appContainer = container.querySelector('.appContainer');
    const toggleButton = screen.getByRole('button', { name: 'Toggle Dark Mode' });

    fireEvent.click(toggleButton);
    expect(appContainer).toHaveClass('appContainerDarkMode');

    fireEvent.click(toggleButton);
    expect(appContainer).toHaveClass('appContainer');
    expect(appContainer).not.toHaveClass('appContainerDarkMode');

    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    });
  });
});