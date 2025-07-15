import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Panels from '../Components/panel/panels';
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

describe('Panels Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(req => {
      if (req.url === 'https://www.reddit.com/r/all/.json') {
        return Promise.resolve(JSON.stringify({
          kind: 'Listing',
          data: {
            children: [
              {
                kind: 't3',
                data: {
                  title: 'Test Post',
                  id: '123',
                  subreddit_name_prefixed: 'r/test',
                  author: 'testUser',
                  ups: 1000,
                  created_utc: 1610000000,
                  post_hint: 'image',
                  url: 'http://test.com/img.jpg',
                },
              },
            ],
          },
        }));
      }
      return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Panels />
      </Provider>
    );
    expect(screen.getByText('Loading Posts...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('renders post list after loading', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Panels />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('r/test')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('by: testUser')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('Comments')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('shows failed state if loadPosts fails', async () => {
    fetch.resetMocks();
    fetch.mockRejectOnce(new Error('Fetch failed'));

    const store = createTestStore();
    render(
      <Provider store={store}>
        <Panels />
      </Provider>
    );
    await waitFor(() => {
      expect(screen.queryByText('Loading Posts...')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('Failed to load Posts!')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('dispatches loadComments when comments button is clicked', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Panels />
      </Provider>
    );
    fetch.mockResponseOnce(JSON.stringify([
      { kind: 'Listing', data: { children: [] } },
      { kind: 'Listing', data: { children: [{ kind: 't1', data: { id: 'c1', body: 'Test Comment', author: 'commenter' } }] } },
    ]));

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    }, { timeout: 2000 });

    const commentsButton = screen.getByText('Comments');
    fireEvent.click(commentsButton);

    await waitFor(() => {
      expect(screen.getByText('Hide Comments')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText('Comments: 1')).toBeInTheDocument();
    }, { timeout: 2000 });

    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        if (!element || element.tagName.toLowerCase() !== 'p') return false;
        const normalizedText = element.textContent?.replace(/\s+/g, ' ').trim();
        return normalizedText === 'commenter: Test Comment';
      })).toBeInTheDocument();
    }, { timeout: 2000 });

    const state = store.getState();
    expect(state.comments.comments['123']).toHaveLength(1);
    expect(state.comments.comments['123'][0].body).toBe('Test Comment');
  });
});