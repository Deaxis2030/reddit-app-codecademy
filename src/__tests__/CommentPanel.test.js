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

  it('renders comments when button is true', () => {
    render(
      <Provider store={createTestStore()}>
        <CommentPanel {...baseProps} />
      </Provider>
    );
    expect(screen.getByText('Comments: 1')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      const hasText = (node) => node.textContent === 'commenter: Test Comment';
      const nodeHasText = hasText(element);
      const childrenDontHaveText = Array.from(element.children).every(child => !hasText(child));
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });

  it('hides comments when button is false', () => {
    const { container } = render(
      <Provider store={createTestStore()}>
        <CommentPanel {...baseProps} button={false} />
      </Provider>
    );
    const commentPanel = container.querySelector(`.${styles.noCommentPanel}`);
    expect(commentPanel).toBeInTheDocument();
    expect(commentPanel).toHaveClass(styles.noCommentPanel);
    expect(screen.getByText('Comments: 1')).toBeInTheDocument(); // Still in DOM, just hidden
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