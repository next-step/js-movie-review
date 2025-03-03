import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { searchParams } from '../../../libs/search-params';
import { addEvent } from '../../../utils';
import { searchStore } from '../stores';

export const SearchInput = () => {
  const { searchValue } = searchStore.get();

  return `
    <div
      style="display: flex; flex-direction: row; align-items: center; gap: 8px;"
    >
      <div style="flex-grow: 1;">
        ${Input({
          name: 'search',
          placeholder: '검색어를 입력하세요',
          fullWidth: true,
          value: searchValue,
        })}
      </div>

      ${Button({ name: 'movie_search', content: '검색' })}
    </div>
  `;
};

const handleSearch = () => {
  const inputElement = document.querySelector('#search');

  const searchValue = inputElement.value;
  const hasSearchValue = !!searchValue;

  searchParams.set('page', '1');
  searchStore.set({ hasSearchValue, searchValue });
};

addEvent('keydown', '#search', (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

addEvent('click', '#movie_search', () => {
  handleSearch();
});
