/**
 * @typedef {Object} Movie
 * @property {boolean} adult - 영화가 성인 전용인지 나타냅니다.
 * @property {string} backdrop_path - 배경 이미지의 경로입니다.
 * @property {number[]} genre_ids - 장르 ID의 배열입니다.
 * @property {number} id - 영화의 고유 ID입니다.
 * @property {string} original_language - 영화의 원래 언어입니다.
 * @property {string} original_title - 영화의 원래 제목입니다.
 * @property {string} overview - 영화의 간략한 설명 또는 줄거리입니다.
 * @property {number} popularity - 영화의 인기도 점수입니다.
 * @property {string} poster_path - 포스터 이미지의 경로입니다.
 * @property {string} release_date - "YYYY-MM-DD" 형식의 영화 출시 날짜입니다.
 * @property {string} title - 영화의 제목입니다.
 * @property {boolean} video - 영화에 비디오가 있는지 나타냅니다.
 * @property {number} vote_average - 영화의 평균 투표 점수입니다.
 * @property {number} vote_count - 영화에 대한 투표 횟수입니다.
 */

/**
 * @typedef {Object} Route
 * @property {string} path
 * @property {() => void} view
 */
