using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SerialReadEventListener : MonoBehaviour
{
    void OnMessageArrived(string msg)
    {

        int[] nums = System.Array.ConvertAll(msg.Split(','), int.Parse);
        if (nums.Length == 3)
        {
            transform.localScale = new Vector3(nums[0] / 20F, nums[1] / 20F, nums[2] / 20F);
            //Debug.Log("X: " + nums[0]);
            //Debug.Log("Y: " + nums[1]);
            //Debug.Log("Z: " + nums[2]);
        }
        //Debug.Log("Message arrived: " + msg);
    }

    void OnConnectionEvent(bool success)
    {
        if (success)
            Debug.Log("Connection established");
        else
            Debug.Log("Connection attempt failed or disconnection detected");
    }
}
