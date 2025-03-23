import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import VideoPlayer from '../Features/VideoPlayer/VideoPlayer';

// Mock dashjs
const mockCreate = jest.fn();
const mockInitialize = jest.fn();
const mockReset = jest.fn();

jest.mock('dashjs', () => ({
  MediaPlayer: () => ({
    create: mockCreate.mockReturnValue({
      updateSettings: jest.fn(),
      initialize: mockInitialize,
      reset: mockReset,
    }),
  }),
}));

describe('VideoPlayer Component', () => {
  beforeEach(() => {
    mockCreate.mockClear();
    mockInitialize.mockClear();
    mockReset.mockClear();
  });

  it('renders video element with correct attributes', () => {
    const { container } = render(<VideoPlayer url="http://test.com/video.mpd" />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveProperty('muted', true);
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveStyle('width: 100%');
    expect(video).toHaveStyle('height: auto');
  });

  it('initializes and cleans up dashjs player', () => {
    const { unmount } = render(<VideoPlayer url="http://test.com/video.mpd" />);
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockInitialize).toHaveBeenCalledWith(
      expect.any(HTMLVideoElement),
      'http://test.com/video.mpd',
      true
    );
    unmount();
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});