#include "OC.h"
#define NUM_OC 4
#define PORT_0 32

unsigned long currentTime = 0;
unsigned long ms = 80;
OC oc[NUM_OC];
char keys[] = {'A', 'B', 'C', 'D'};

void setup()
{
  for (byte i = 0; i < NUM_OC; i++)
  {
    oc[i].setup(i + PORT_0, keys[i]);
  }
  Serial.begin(115200);
  Serial.println("start...");
}

void loop()
{
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
