### ✅ 프로그래밍 요구사항

- API key를 공개된 저장소에 포함하지 않는다.
- 비동기 통신에서 실패할 경우를 대비한다.
  - 비동기 통신에서 일어날 수 있는 다양한 상황을 고려해 본다.
- 비동기 호출을 포함한 사용자 기능 플로우를 선정하고 기능을 포함하여 E2E 테스트를 작성한다.
- **특정한 패턴에 사고를 끼워 맞추지 않고 단지 역할과 책임에 따라 관심사를 분리한다.**
- **어떠한 관점에서 역할과 책임에 따라 관심사를 분리하였는지 리뷰어에게 설명할 수 있어야 한다.**

- [x] 영화 목록의 1페이지를 불러오며 더보기 버튼을 누르면 그 다음의 영화 목록을 불러 올 수 있다. (인기순은 TMDB에서 제공하는 API의 속성 이름을 나타내는 것이므로 별도로 받은 데이터를 정렬하지 않습니다.)
- [x] 단, 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
- [x] 20개씩 영화 목록을 보여주면 됩니다.
- [x] 영화 목록 아이템에 대한 Skeleton UI를 구현한다.
- [ ] 실행 가능한 페이지에 접근할 수 있도록 github page 기능을 이용하고, 해당 링크를 PR과 README에 작성한다.