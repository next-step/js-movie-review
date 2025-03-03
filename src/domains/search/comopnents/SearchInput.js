import { Input } from '../../../components/Input';

export const SearchInput = () => {
  return ` 
    ${Input({ name: 'search', placeholder: '검색어를 입력하세요', fullWidth: true })}
  `;
};
