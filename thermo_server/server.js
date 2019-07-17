const express = require("express");
const SerialPort = require("serialport");
const cors = require("cors");

// express
const app = express();
const port = process.env.port || 9000;

// SerialPort
const Serialport = new SerialPort("COM5", {
  baudRate: 115200
});

app.use(cors());
app.get("/test", (req, res) => {
  let buffer = [];
  let temp = req.query.data.split(",");
  temp.splice(-1, 1);
  temp.forEach(it => {
    buffer.push(parseInt(it));
  });

  Serialport.write(buffer, err => {
    if (err) {
      return console.log("Error on write: ", err.message);
    }
    console.log("SentMsg: ", buffer);
  });
  res.send("sent");
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

// Open errors will be emitted as an error event
Serialport.on("error", function(err) {
  console.log("Error: ", err.message);
});

Serialport.on("data", function(data) {
  console.log("Data:", data);
  console.log("============================");
});
