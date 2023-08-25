## 요구사항

- [ ] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다.

  - 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
  - ⚠️ 인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.
  - figma 시안과는 달리 20개씩 영화 목록을 보여주면 됩니다.

- [ ] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
  - Skeleton UI는 템플릿으로 제공되는 파일 이외로 자유롭게 구현할 수 있다.

---

### 기능 명세서

- [ ] API key를 발급받는다.
  - [ ] API key는 환경변수에 등록하여 외부에 노출하지 않는다.
- [ ] 영화 데이터를 받아온다.

---

## 객체

### Axios

비동기 통신을 담당하는 객체.

### MovieController

협력관계 : MovieService

- [ ] 유저의 이벤트 및 설정(action)을 감지하여 MovieService에 전달한다.
- [ ] 유저의 이벤트 및 설정에 맞는 결과(Movie[])를 MovieService로부터 전달받아 반환한다.
- [ ] MovieService에 요청을 보내기 전, endpoint와 유저의 설정을 조합하여 완성된 endpoint를 MovieService에 전달한다.

### MovieService

협력 관계 : MovieController, Axios
주어진 설정을 endpoint에 추가한 뒤, 조건에 따른 영화들을 반환하는 객체.

- 요청을 보낼
- [ ]

---

- 비동기 통신을 위해 Axios 객체를 사용한다.
