import React, { useRef } from "react";

export default function OutputCodeBox(props) {
  const { row, col } = props;
  const textAreaRef = useRef(null);

  const copyToClipboard = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    props.setSuccess(true);
  };
  return (
    <div>
      <h4>輸出資料</h4>
      {document.queryCommandSupported("copy") && (
        <div>
          <button onClick={copyToClipboard}>複製程式碼</button>
          {props.isCopyed}
        </div>
      )}
      <br />
      <textarea
        ref={textAreaRef}
        rows={row}
        cols={col}
        readOnly
        value={props.value}
      />
    </div>
  );
}
