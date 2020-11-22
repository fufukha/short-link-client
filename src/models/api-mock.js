export const createLink = (url, name = null) => {
  return Promise.resolve({
    shortUrl: shorten(url),
    name: name
  });
};

const shorten = (url) => {
  return `${url.slice(4)}`;
};
