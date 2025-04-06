export const replaceNewContainer = (
    rootContainer, render
) => {
    const newContainer = render();
    rootContainer.replaceWith(newContainer);
    return newContainer
}