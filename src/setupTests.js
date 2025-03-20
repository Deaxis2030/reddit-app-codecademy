import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks globally
fetchMock.enableMocks();

// Reset mocks before each test (optional, moved to test file if needed)
beforeEach(() => fetchMock.resetMocks());

jest.mock('react-markdown', () => {
  return jest.fn(({ children }) => <div>{children}</div>);
});

jest.mock('dashjs', () => {
  const mockPlayer = {
    updateSettings: jest.fn(),
    initialize: jest.fn(),
    reset: jest.fn(),
  };
  return {
    MediaPlayer: jest.fn(() => ({
      create: jest.fn(() => mockPlayer),
    })),
  };
});