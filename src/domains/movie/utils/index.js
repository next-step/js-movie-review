import { thumbnailStore } from '../stores';

export const updateMovieThumbnail = (response) => {
  if (!response?.results || response.results.length === 0) return;

  const {
    title: thumbnailTitle,
    vote_average: thumbnailVoteAverage,
    id: thumbnailId,
    backdrop_path: thumbnailSrc,
  } = response.results[0];

  thumbnailStore.set({
    thumbnailId,
    thumbnailTitle,
    thumbnailSrc,
    thumbnailVoteAverage,
  });
};
