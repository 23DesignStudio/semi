const express = require("express");
const SerialPort = require("serialport");
const cors = require("cors");

// express
const app = express();
const port = process.env.port || 9000;

// SerialPort
const Serialport = new SerialPort("COM5", {
  baudRate: 9600
});

let msg = "";
app.use(cors());
app.get("/test", (req, res) => {
  msg = req.query.data;
  Serialport.write(msg);
  res.send("sent");
});
app.listen(port, () => console.log(`App listening on port ${port}!`));

// Open errors will be emitted as an error event
Serialport.on("error", function(err) {
  console.log("Error: ", err.message);
});
