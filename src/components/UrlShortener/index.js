import React, { useState } from "react";
import { createLink } from "../../models/api-mock";
import CopyButton from "../CopyButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        value={url}
        onChange={handleChange}
      />
      <Button size="large" color="secondary" onClick={handleClick}>
        Shorten
      </Button>
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
