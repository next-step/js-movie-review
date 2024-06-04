function Logo({ src, alt }) {
    const logoWrapper = document.createElement('h1');
    const logoElement = document.createElement('img');
    logoElement.src = src;
    logoElement.alt = alt;
    logoElement.loading = 'lazy';

    logoWrapper.appendChild(logoElement);

    return logoWrapper;
}

export default Logo;
