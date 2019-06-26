using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetSerialMsgFromToArduino : MonoBehaviour
{
  public GameObject obj;
  private MsgFromToArduino serial;
  string outputValue = null;
  bool isConnected = false;
  void Start()
  {
    serial = obj.GetComponent<MsgFromToArduino>();
    if (serial != null)
    {
      Debug.Log("Communication is build");
      isConnected = true;
    }
    else
    {
      Debug.Log("Communication is failed");
      isConnected = false;
    }
  }

  // Update is called once per frame
  void Update()
  {
    if (isConnected)
    {
      if (Input.GetKeyDown("0"))
      {
        outputValue = "0";
        serial.SetSerialWriteMsg = outputValue;
      }
      else if (Input.GetKeyDown("1"))
      {
        outputValue = "1";
        serial.SetSerialWriteMsg = outputValue;
      }
    }

  }

  void OnGUI()
  {
    string guiOutputMsg = "To Arduino: " + outputValue;
    GUI.Label(new Rect(50, 50, 300, 100), guiOutputMsg);
  }
}

