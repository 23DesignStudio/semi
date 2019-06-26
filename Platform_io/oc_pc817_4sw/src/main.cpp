#include <Arduino.h>
#include "OC.h"
#define NUM_OC 4

//NodeMCU32 use GPIO PORT

unsigned long currentTime = 0;
unsigned long ms = 50;
OC oc[NUM_OC];
char keys[] = {'A', 'B', 'C', 'D'};
char ports[] = {A0, A1, A2, A3};
void setup()
{
  for (byte i = 0; i < NUM_OC; i++)
  {
    oc[i].setup(ports[i], keys[i]);
  }
  Serial.begin(9600);
  Serial.println("start...");
}

void loop()
{
  currentTime = millis();
  if (Serial.available())
  {
    char input = (char)Serial.read();
    for (byte i = 0; i < NUM_OC; i++)
    {
      if (input == oc[i].getKey())
      {
        oc[i].turnOn(currentTime);
        Serial.print(input);
        Serial.println(" is on");
      }
    }
  }
  for (byte i = 0; i < NUM_OC; i++)
  {
    if (oc[i].getState() && oc[i].check(currentTime, ms))
    {
      oc[i].turnOff();
    }
  }
}
