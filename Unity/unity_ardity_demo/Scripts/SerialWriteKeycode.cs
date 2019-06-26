using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SerialWriteKeycode : MonoBehaviour
{
    SerialController serialController;
    string msg = null;
    void Start()
    {
        serialController = GameObject.Find("SerialController").GetComponent<SerialController>();
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.S))
        {
            serialController.SendSerialMessage("s");
            msg = "Start To Comunicate";

        }

        if (Input.GetKeyDown("0"))
        {
            serialController.SendSerialMessage("0");
            msg = "Turn Off The Light";
        }

        if (Input.GetKeyDown("1"))
        {
            serialController.SendSerialMessage("1");
            msg = "Turn On The Light";
        }
    }

    void OnGUI()
    {
        string msgOnGui = "Message To Arduino (press 's' to start): " + msg;
        GUI.Label(new Rect(50, 50, 600, 100), msgOnGui);
    }
}
