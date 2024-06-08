export function makeDom(innerHTML) {
  const template = document.createElement("template");
  template.innerHTML = innerHTML.trim(); // 문자열의 양 끝 공백을 제거
  return template.content.firstChild; // 첫 번째 자식을 반환
}
