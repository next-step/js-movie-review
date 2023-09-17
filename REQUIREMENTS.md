1. App Class
   - 2 ~ 3번 클래스를 담고 있는다.
   - 2, 5번 클래스의 핸들러 함수를 관리하며 결과값을 MovieList에 전달한다.
   - SearchBar에서 입력하는 검색값과 페이지 번호, 전체 페이지수를 state로 관리한다.
   - 검색값에 따라서 인기순 조회 api를 호출할지 영화 검색 api를 호출할 지 결정한다.
   - 전체 페이지수와 페이지 번호가 같아지면 더보기 버튼을 렌더링 하지 않는다.
2. SearchBar 클래스
   - 검색 입력 후 버튼 클릭시 onSearch 함수를 실행한다.
   - 에러 발생시 alert를 띄운다.
     - 500 대 에러 발생시 "서버의 문제가 있습니다. 관리자에게 문의해주세요." alert 후 새로고침 시킨다.
     - 400 대 에러 발생시 ""
3. MovieList 클래스
   - movieList 필드를 가지고 있으며 초기값은 빈배열이다.
   - updateMovieList를 통해 전달받은 movieList를 movieList 필드로 갱신한 후 새로운 MovieCard들을 렌더링한다.
   - appendMovieList를 통해 전달받은 movieList를 movieList 마지막에 추가한 후 렌더링 해준다.
4. MovieCard 클래스
   - 영화 정보를 통해 영화 카드를 렌더링한다.
5. MoreButton 클래스
   - 더보기 버튼 클릭시 App Class의 page 상태를 1 증가시킨 후 api를 호출한다.