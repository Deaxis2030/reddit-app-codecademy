import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CommentPanel from '../Components/Comments/comments';
import commentsReducer from '../Components/Comments/commentsSlice';
import styles from '../Features/App.module.css';

const createTestStore = (initialState = {}) =>
  configureStore({
    reducer: {
      comments: commentsReducer,
    },
    preloadedState: {
      comments: {
        comments: {},
        isLoadingComments: false,
        failedToLoadComments: false,
        ...initialState,
      },
    },
  });

describe('CommentPanel Component', () => {
  const baseProps = {
    button: true,
    data: { id: '123' },
    comments: [{ id: 'c1', author: 'commenter', body: 'Test Comment' }],
  };

  it('renders comments when button is true', async () => {
    render(
      <Provider store={createTestStore()}>
        <CommentPanel {...baseProps} />
      </Provider>
    );
    expect(screen.getByText('Comments: 1')).toBeInTheDocument();
    expect(await screen.findByText((content, element) => {
      if (!element || element.tagName.toLowerCase() !== 'p') return false;
      const normalizedText = element.textContent?.replace(/\s+/g, ' ').trim();
      return normalizedText === 'commenter: Test Comment';
    })).toBeInTheDocument();
  });

  it('hides comments when button is false', () => {
    render(
      <Provider store={createTestStore()}>
        <CommentPanel {...baseProps} button={false} />
      </Provider>
    );
    const innerPanel = screen.getByTestId('inner-comment-panel');
    expect(innerPanel).toBeInTheDocument();
    expect(innerPanel).toHaveClass(styles.noCommentPanel);
    expect(screen.getByText('Comments: 1')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(
      <Provider store={createTestStore({ isLoadingComments: true })}>
        <CommentPanel {...baseProps} />
      </Provider>
    );
    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });

  it('shows failed state', () => {
    render(
      <Provider store={createTestStore({ failedToLoadComments: true })}>
        <CommentPanel {...baseProps} />
      </Provider>
    );
    expect(screen.getByText('Failed to load comments!')).toBeInTheDocument();
  });

  it('shows no comments when empty', () => {
    render(
      <Provider store={createTestStore()}>
        <CommentPanel {...baseProps} comments={[]} />
      </Provider>
    );
    expect(screen.getByText('Comments: 0')).toBeInTheDocument();
    expect(screen.getByText('No comments available')).toBeInTheDocument();
  });
});