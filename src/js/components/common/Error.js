/**
 * @param {string} error
 * @returns {Error}
 */
export const Error = (error) => /* html */ `
    <div data-cy="request-error">
      서버 통신중 문제가 발생하였습니다.
      error: ${error}
    </div>
  `;
