import React, { useState } from "react";
import { createLink } from "../../models/api-mock";
import CopyButton from "../CopyButton";

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
      {shortUrl && (
        <>
          <div>{shortUrl}</div>
          <CopyButton text={shortUrl} />
        </>
      )}
    </div>
  );
};

export default UrlShortener;
