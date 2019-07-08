import React, { useState } from "react";

export default function CopyButton(props) {
  const [copySuccess, setCopySuccess] = useState("");

  function copyToClipboard(e) {
    props.textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    setCopySuccess("Copied!");
  }

  return <div />;
}
