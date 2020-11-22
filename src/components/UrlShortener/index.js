import React, { useState } from "react";
import { CREATE_LINK } from "../../models/api";
import { gql, useMutation } from "@apollo/client";

const UrlShortener = () => {
  const [url, setUrl] = useState("");
  const [createLink, { linkData }] = useMutation(CREATE_LINK);

  const handleClick = (e) => {
    createLink({ variables: { url: url } });
  };

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div className="UrlShortener">
      <input value={url} onChange={handleChange} />
      <button onClick={handleClick}>Shorten</button>
    </div>
  );
};

export default UrlShortener;
