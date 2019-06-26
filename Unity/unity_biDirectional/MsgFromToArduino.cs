using System.Collections;
using UnityEngine;
using System.IO.Ports;

public class MsgFromToArduino : MonoBehaviour
{
  public string PORTNAME = "/dev/cu.usbmodem1431";
  public int BAUDRATE = 9600;
  SerialPort stream = new SerialPort();
  private string msgFromArduino, serialReadMsg, msgToArduino, serialWriteMsg;

  public string GetSerialReadMsg
  {
    get
    {
      serialReadMsg = msgFromArduino;
      return serialReadMsg;
    }
  }

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
    msgFromArduino = null;
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
        if (stream.BytesToRead > 0)
        {
          msgFromArduino = stream.ReadLine();
        }
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
