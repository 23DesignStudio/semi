import React from "react";
//material ui
import Button from "@material-ui/core/Button";
//components
import CmdCheckBox from "../Components/CmdCheckBox";
import CmdSelect from "../Components/CmdSelect";
import CmdNumber from "../Components/CmdNumber";
import FormGroup from "@material-ui/core/FormGroup";

const WordOptions = props => {
  const { init, align, lineHeight } = props.commandObject;
  return (
    <FormGroup row>
      <CmdSelect
        propKey={"init"}
        name={init.name}
        code={init.code}
        items={init.items}
        setValue={props.setCommandObject}
      />
      <CmdSelect
        propKey={"align"}
        name={align.name}
        code={align.code}
        items={align.items}
        setValue={props.setCommandObject}
      />
      <CmdNumber
        propKey={"lineHeight"}
        name={lineHeight.name}
        code={lineHeight.code}
        range={lineHeight.range}
        setValue={props.setCommandObject}
      />
    </FormGroup>
  );
};

export default WordOptions;
