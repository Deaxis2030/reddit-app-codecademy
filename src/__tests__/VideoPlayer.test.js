import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import VideoPlayer from '../Features/VideoPlayer/VideoPlayer';

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
    render(<VideoPlayer url="http://test.com/video.mpd" />);
    const video = screen.getByTestId('video-player');
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