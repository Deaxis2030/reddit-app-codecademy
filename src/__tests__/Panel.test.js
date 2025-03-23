import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Panel from '../Components/panel/panel';
import commentsReducer, { loadComments } from '../Components/Comments/commentsSlice';

// Mock dashjs for VideoPlayer
jest.mock('dashjs', () => {
  return {
    MediaPlayer: () => ({
      create: () => ({
        updateSettings: jest.fn(),
        initialize: jest.fn(),
        reset: jest.fn(),
      }),
    }),
  };
});

// Mock ReactMarkdown for self-text
jest.mock('react-markdown', () => {
  return ({ children }) => <div>{children}</div>;
});

const createTestStore = () =>
  configureStore({
    reducer: {
      comments: commentsReducer,
    },
  });

describe('Panel Component', () => {
  const mockGetCommentsData = jest.fn();
  const baseData = {
    id: '123',
    subreddit_name_prefixed: 'r/test',
    author: 'testUser',
    ups: 1000,
    created_utc: 1610000000,
    title: 'Test Post',
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it('renders image post', () => {
    const data = { ...baseData, post_hint: 'image', url: 'http://test.com/img.jpg' };
    render(
      <Provider store={createTestStore()}>
        <Panel data={data} getCommentsData={mockGetCommentsData} />
      </Provider>
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('r/test')).toBeInTheDocument();
    expect(screen.getByText('by: testUser')).toBeInTheDocument();
    expect(screen.getByText('1.0K')).toBeInTheDocument();
    expect(screen.getByAltText('Post Image')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('renders self-text post', () => {
    const data = { ...baseData, thumbnail: 'self', selftext: 'Test self-text' };
    render(
      <Provider store={createTestStore()}>
        <Panel data={data} getCommentsData={mockGetCommentsData} />
      </Provider>
    );
    expect(screen.getByText('Test self-text')).toBeInTheDocument();
  });

  it('renders link post', () => {
    const data = { ...baseData, post_hint: 'link', url: 'http://test.com' };
    render(
      <Provider store={createTestStore()}>
        <Panel data={data} getCommentsData={mockGetCommentsData} />
      </Provider>
    );
    expect(screen.getByText('http://test.com')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'http://test.com');
  });

  it('renders video post', () => {
    const data = {
      ...baseData,
      post_hint: 'hosted:video',
      media: { reddit_video: { dash_url: 'http://test.com/video.mpd' } },
    };
    const { container } = render(
      <Provider store={createTestStore()}>
        <Panel data={data} getCommentsData={mockGetCommentsData} />
      </Provider>
    );
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveProperty('muted', true); 
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('autoplay');
  });

  it('toggles comments and dispatches getCommentsData', async () => {
    const store = createTestStore();
    const data = { ...baseData, post_hint: 'image', url: 'http://test.com/img.jpg' };
    fetch.mockResponseOnce(req => {
      if (req.url === 'https://www.reddit.com/r/test/comments/123/.json') {
        return Promise.resolve(JSON.stringify([
          { kind: 'Listing', data: { children: [] } },
          { kind: 'Listing', data: { children: [{ kind: 't1', data: { id: 'c1', body: 'Test Comment', author: 'commenter' } }] } },
        ]));
      }
      return Promise.reject(new Error(`Unexpected URL: ${req.url}`));
    });

    render(
      <Provider store={store}>
        <Panel data={data} getCommentsData={(url, id) => store.dispatch(loadComments({ url, id }))} />
      </Provider>
    );

    const commentsButton = screen.getByText('Comments');
    fireEvent.click(commentsButton);

    await waitFor(() => {
      expect(screen.getByText('Hide Comments')).toBeInTheDocument();
      expect(mockGetCommentsData).not.toHaveBeenCalled();
      expect(screen.getByText('Comments: 1')).toBeInTheDocument();
      expect(screen.getByText((content, element) => {
        const hasText = (node) => node.textContent === 'commenter: Test Comment';
        const nodeHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
        return nodeHasText && childrenDontHaveText;
      })).toBeInTheDocument();
      const state = store.getState();
      expect(state.comments.comments['123']).toHaveLength(1);
      expect(state.comments.comments['123'][0].body).toBe('Test Comment');
    }, { timeout: 2000 });
  });
});