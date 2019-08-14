import React, { useState } from "react";
import WordInput from "./WordInput";
import WordOptions from "./WordOptions";
import { CmdObject } from "../Components/CmdObject";

//material ui
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Word = props => {
  const [cmdObj, setCmdObj] = useState(CmdObject);
  const [text, setText] = useState("");
  const setDebugText = props.setDebugText;

  const s_setCmdObj = (prop, value) => {
    let _cmdObj = cmdObj;
    _cmdObj[prop].value = value;
    setCmdObj(_cmdObj);
  };

  const s_resetCmdObject = resetObj => {
    setCmdObj(resetObj);
  };

  const hl_onClick_setDebugText = () => {
    setDebugText(text);
  };
  return (
    <div>
      <Typography variant="h6">控制命令</Typography>
      <WordOptions
        resetObject={s_resetCmdObject}
        commandObject={cmdObj}
        setCommandObject={s_setCmdObj}
      />
      <Divider varint="middle" />
      <Typography variant="h6">輸入文字</Typography>
      <WordInput setText={setText} />
      <hr />
      <Button
        variant="contained"
        color="primary"
        onClick={hl_onClick_setDebugText}
      >
        資料送出
      </Button>
    </div>
  );
};

export default Word;
