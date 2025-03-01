import { createObserver } from '../../../utils';

export const thumbnailStore = createObserver({
  thumbnailId: null,
  thumbnailTitle: '',
  thumbnailSrc: '',
  thumbnailVoteAverage: 0,
});
