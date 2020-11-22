import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Button from "@material-ui/core/Button";

const CopyButton = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <CopyToClipboard text={text} onCopy={() => setIsCopied(true)}>
      <Button>Copy</Button>
    </CopyToClipboard>
  );
};

export default CopyButton;
