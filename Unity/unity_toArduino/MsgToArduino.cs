using System.Collections;
using UnityEngine;
using System.IO.Ports;

public class MsgToArduino : MonoBehaviour
{
  public string PORTNAME = "/dev/cu.usbmodem1431";
  public int BAUDRATE = 9600;
  SerialPort stream = new SerialPort();
  private string msgToArduino, serialWriteMsg;

  public string SetSerialWriteMsg
  {
    set
    {
      serialWriteMsg = value;
    }
  }
  bool _continue = true;
  void Start()
  {
    serialWriteMsg = null;
    stream.PortName = PORTNAME;
    stream.BaudRate = BAUDRATE;
    stream.Open();
  }

  // Update is called once per frame
  void Update()
  {
    if (_continue)
    {
      if (stream.IsOpen)
      {
        if (serialWriteMsg != null)
        {
          msgToArduino = serialWriteMsg;
          stream.Write(msgToArduino);
          msgToArduino = null;
        }
      }
      else
      {
        Debug.Log("Connection is failed!");
        stream.Close();
        Debug.Log("Serial is closed!");
        _continue = false;
      }

    }
  }
}

