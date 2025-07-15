import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Search from '../Components/Search/search';
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

describe('Search Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockResponseOnce(req => {
      if (req.url === 'https://www.reddit.com/search/.json?q=javascript') {
        return Promise.resolve(JSON.stringify({
          kind: 'Listing',
          data: {
            children: [{ kind: 't3', data: { title: 'Test Post', id: '123' } }],
          },
        }));
      }
      return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
    });
  });

  it('renders search input and button', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'search-button' })).toBeInTheDocument();
  });

  it('updates input value on change', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  it('dispatches loadPosts on form submission', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );
    const input = screen.getByPlaceholderText('Search...');
    const form = screen.getByTestId('search-form');

    fireEvent.change(input, { target: { value: 'javascript' } });
    fireEvent.submit(form);

    await waitFor(() => {
      const state = store.getState();
      expect(state.posts.posts).toHaveLength(1);
    }, { timeout: 2000 });

    await waitFor(() => {
      const state = store.getState();
      expect(state.posts.posts[0].data.title).toBe('Test Post');
    }, { timeout: 2000 });

    await waitFor(() => {
      const state = store.getState();
      expect(state.posts.isLoadingPosts).toBe(false);
    }, { timeout: 2000 });
  });
});