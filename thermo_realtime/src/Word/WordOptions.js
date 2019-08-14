import React from "react";
//material ui
import Button from "@material-ui/core/Button";
//components
import { CmdObject } from "../Components/CmdObject";
import CmdSelect from "../Components/CmdSelect";
import CmdNumber from "../Components/CmdNumber";
import FormGroup from "@material-ui/core/FormGroup";
import CmdDoubleNumber from "../Components/CmdDoubleNumber";

const WordOptions = props => {
  const { init, align, lineHeight, size } = props.commandObject;

  const hl_onClick_clearAll = () => {
    props.resetObject(CmdObject);
  };
  return (
    <div>
      <FormGroup row>
        <CmdSelect
          propKey={"init"}
          name={init.name}
          code={init.code}
          items={init.items}
          valuePair={init.valuePair}
          setValue={props.setCommandObject}
        />
        <CmdSelect
          propKey={"align"}
          name={align.name}
          code={align.code}
          items={align.items}
          valuePair={align.valuePair}
          helper={align.helper}
          setValue={props.setCommandObject}
        />
        <CmdNumber
          propKey={"lineHeight"}
          name={lineHeight.name}
          code={lineHeight.code}
          range={lineHeight.range}
          helper={lineHeight.helper}
          setValue={props.setCommandObject}
        />
        <CmdDoubleNumber
          propKey={"size"}
          name={size.name}
          code={size.code}
          range={size.range}
          units={size.units}
          helper={size.helper}
          setValue={props.setCommandObject}
        />
      </FormGroup>
      <FormGroup row>
        <Button size="small" variant="outlined" color="primary">
          確定
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={hl_onClick_clearAll}
        >
          清除
        </Button>
      </FormGroup>
    </div>
  );
};

export default WordOptions;
