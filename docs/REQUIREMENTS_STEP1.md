## 요구사항

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.

  - 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - ⚠️ 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
  - figma 시안과는 달리 20개씩 영화 목록을 보여주면 됩니다.

- [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

---

### 기능 명세서

- [x] API key를 발급받는다.
  - [x] API key는 환경변수에 등록하여 외부에 노출하지 않는다.
- [x] 영화 데이터를 받아온다.

---

## 객체

### Fetcher

협력관계 : MovieService

비동기 통신을 담당하는 객체.

### MovieComponent

협력관계 : MovieService 및 Movie 관련 Component들

- [ ] 유저의 이벤트 및 설정(action)을 감지하여 MovieService에 전달한다.
- [ ] 유저의 이벤트 및 설정에 맞는 결과(Movie[])를 MovieService로부터 전달받아 반환한다.
- [x] MovieService에 요청을 보내기 전, endpoint와 유저의 설정을 조합하여 완성된 endpoint를 MovieService에 전달한다.

### MovieService

협력 관계 : MovieController, Fetcher, Movie

- endpoint를 전달받아 Movie 객체들을 반환하는 역할.
  MovieController에서 전달받은 Endpoint에 따라 원하는 추상화 과정을 거친 뒤(인기순, 추천순, 조회수 순 등) Fetcher를 사용해 Movie 객체에 대한 비즈니스 로직을 담당하는 객체.

### Movie

협력 관계 : MovieService

---

### MovieComponent

협력 관계 : Movie, MovieListComponent

- Movie 객체를 주입받아 렌더링할 컴포넌트를 생성한다.
