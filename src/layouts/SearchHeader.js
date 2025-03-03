import { SearchInput } from '../domains/search/comopnents/SearchInput';

export const SearchHeader = () => {
  return `
    <div style="display: flex; flex-direction: row; align-items: center;">
      <h1 class="logo">
        <img src="${import.meta.env.BASE_URL}assets/logo.png" alt="logo icon" />
      </h1>

      <div style="display: flex; justify-content: center; flex: 1;">
        <div style="width: 50%;">${SearchInput()}</div>
      </div>
    </div>
  `;
};
