export function renderHeader(logo, searchBox) {
    const header = document.querySelector('.header');

    header.innerHTML = `
    ${logo}
    ${searchBox}
    `;
}
