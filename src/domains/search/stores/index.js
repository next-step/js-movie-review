import { createObserver } from '../../../utils';

export const searchStore = createObserver({
  hasSearchValue: false,
  searchValue: '',
});
