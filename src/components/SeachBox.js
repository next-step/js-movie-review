function SearchBox({ input, button }) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('search-box');

    wrapper.append(input);
    wrapper.append(button);

    return wrapper;
}

export default SearchBox;
