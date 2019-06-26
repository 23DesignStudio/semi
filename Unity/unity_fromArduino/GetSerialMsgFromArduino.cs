using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GetSerialMsgFromArduino : MonoBehaviour
{
  public GameObject obj;
  private MsgFromArduino serial;
  int inputValue;
  bool isConnected = false;
  void Start()
  {
    serial = obj.GetComponent<MsgFromArduino>();
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
  void Update()
  {
    if (isConnected)
    {
      int.TryParse(serial.GetSerialReadMsg, out inputValue);
      transform.localScale = new Vector3(inputValue / 20f, 1f, 1f);
    }

  }
}

