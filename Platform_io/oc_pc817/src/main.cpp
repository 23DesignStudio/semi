#include <Arduino.h>
#include "OC.h"
#define NUM_OC 4
#define BTN 8

unsigned long time;
unsigned long ms = 80;
// OC oc[NUM_OC];
OC oca;
// char keys[] = {'a', 'b', 'c', 'd'};

unsigned long btnTime = 0;
bool btnState = false;
void setup()
{
  // for (byte i = 0; i < NUM_OC; i++)
  // {
  //   oc[i].setup(i+4, keys[i]);
  // }
  oca.setup(4, 'A');
  // pinMode(BTN, INPUT_PULLUP);
  Serial.begin(9600);
  Serial.println("start...");
}

void loop()
{
  time = millis();
  if (Serial.available())
  {
    char input = (char)Serial.read();
    // for (byte i = 0; i < NUM_OC; i++)
    // {
    //   if (input == oc[i].getKey())
    //   {
    //     oc[i].turnOn(time);
    //     Serial.println("Turn A on");
    //   }
    // }
    if (input == oca.getKey())
    {
      oca.turnOn(time);
      Serial.println("Turn A on");
    }
  }
  // for (byte i = 0; i < NUM_OC; i++)
  // {
  //   if (oc[i].getState() && oc[i].check(time, ms))
  //   {
  //     oc[i].turnOff();
  //   }
  // }
  if (oca.getState() && oca.check(time, ms))
  {
    oca.turnOff();
  }
  // if (!digitalRead(BTN) && time - btnTime > 1000L)
  // {
  //   oca.turnOn(time);
  //   Serial.println("Turn A on");
  //   btnTime = time;
  // }
}