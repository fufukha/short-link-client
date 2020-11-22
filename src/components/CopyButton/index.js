import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <CopyToClipboard text={text} onCopy={() => setIsCopied(true)}>
      <button>Copy</button>
    </CopyToClipboard>
  );
};

export default CopyButton;
