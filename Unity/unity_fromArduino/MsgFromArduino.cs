using System.Collections;
using UnityEngine;
using System.IO.Ports;

public class MsgFromArduino : MonoBehaviour
{
  public string PORTNAME = "/dev/cu.usbmodem1431";
  public int BAUDRATE = 9600;
  SerialPort stream = new SerialPort();
  private string msgFromArduino, serialReadMsg;

  public string GetSerialReadMsg
  {
    get
    {
      serialReadMsg = msgFromArduino;
      return serialReadMsg;
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
