export const CmdObject = {
  init: {
    name: "初始化",
    code: "",
    items: ["是", "否"],
    valuePair: ["0x1b,0x40,", ""],
    value: "0x1b,0x40,"
  },
  newLine: { name: "換行", code: "0x0d,0x0a," },
  align: {
    name: "對齊",
    code: "0x1b,0x61,",
    items: ["左", "中", "右"],
    valuePair: ["0x30,", "0x31,", "0x32,"],
    helper: "選擇對齊位置",
    value: "0x1b,0x61,0x30,"
  },
  size: {
    name: "縮放",
    code: "0x1d,0x21,",
    units: ["寬", "高"],
    range: [1, 8],
    helper: ["水平倍數", "垂直倍數"],
    value: ""
  },
  lineHeight: {
    name: "行高",
    code: "0x1b,0x33",
    range: [1, 255],
    helper: "行高 = 變數 x 0.125mm",
    value: ""
  }
};
