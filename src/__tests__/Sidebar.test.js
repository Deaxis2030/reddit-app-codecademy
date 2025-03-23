import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SideBar from '../Components/Sidebar/sidebar';
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

describe('SideBar Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(req => {
      if (req.url === 'https://www.reddit.com/subreddits/.json') {
        return Promise.resolve(JSON.stringify({
          kind: 'Listing',
          data: {
            children: [
              { kind: 't5', data: { title: 'testSubreddit', url: '/r/testSubreddit/' } },
            ],
          },
        }));
      }
      return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
    });
  });

  afterEach(() => {
    fetch.mockClear(); // Clean up mocks to prevent leaks
  });

  it('renders loading state initially', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    expect(screen.getByText('Loading Subreddits...')).toBeInTheDocument();
    expect(screen.getByText('Most Popular SubReddits')).toBeInTheDocument();
    expect(screen.getByText('Show')).toBeInTheDocument();

    // Wait for loading to resolve to ensure no act warnings
    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders subreddit list after loading', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading Subreddits...')).not.toBeInTheDocument();
      expect(screen.getByText('Most Popular SubReddits')).toBeInTheDocument();
      expect(screen.getByText('testSubreddit')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('toggles sidebar visibility', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    const toggleButton = screen.getByText('Show');
    expect(toggleButton).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('testSubreddit')).toBeInTheDocument();
    }, { timeout: 2000 });

    fireEvent.click(toggleButton);
    expect(screen.getByText('Hide')).toBeInTheDocument();
    expect(screen.getByText('testSubreddit')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('testSubreddit')).toBeInTheDocument();
  });

  it('dispatches loadPosts when a subreddit is clicked', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SideBar />
      </Provider>
    );
    fetch.mockResponseOnce(req => {
      if (req.url === 'https://www.reddit.com/r/testSubreddit/.json') {
        return Promise.resolve(JSON.stringify({
          kind: 'Listing',
          data: {
            children: [{ kind: 't3', data: { title: 'Test Post', id: '123' } }],
          },
        }));
      }
      return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
    });

    await waitFor(() => {
      expect(screen.getByText('testSubreddit')).toBeInTheDocument();
    }, { timeout: 2000 });

    const toggleButton = screen.getByText('Show');
    fireEvent.click(toggleButton);

    const subredditButton = screen.getByText('testSubreddit');
    fireEvent.click(subredditButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.posts.posts).toHaveLength(1);
      expect(state.posts.posts[0].data.title).toBe('Test Post');
      expect(state.posts.isLoadingPosts).toBe(false);
    }, { timeout: 2000 });
  });
});