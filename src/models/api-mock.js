export const createLink = (url, name = null) => {
  return Promise.resolve({
    shortUrl: shorten(url),
    name: name
  });
};

const shorten = (url) => `http://short-links/${btoa(url).slice(0, 10)}`;
