import React, { useState, useEffect } from "react";
import { createLink } from "../../models/api-mock";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleClick = (e) => {
    createLink(url).then(({ shortUrl }) => setShortUrl(shortUrl));
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="UrlShortener">
      <input value={url} onChange={handleChange} />
      <button onClick={handleClick}>Shorten</button>
      <div>{shortUrl}</div>
    </div>
  );
};

export default UrlShortener;
