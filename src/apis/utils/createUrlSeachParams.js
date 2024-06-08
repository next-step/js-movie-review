export const createUrlSeacrhParams = ({ baseUrl, params }) => {
    const url = new URL(baseUrl);
    url.search = new URLSearchParams(params).toString();
    return url;
};
