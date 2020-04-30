#include <Arduino.h>
#include "OC.h"

unsigned long time;
unsigned long ms = 80;
OC oca;

unsigned long btnTime = 0;
bool btnState = false;

void setup()
{
  oca.setup(4, 'A');
  Serial.begin(9600);
  Serial.println("start...");
}

void loop()
{
  time = millis();
  if (Serial.available())
  {
    char input = (char)Serial.read();
    if (input == oca.getKey())
    {
      oca.turnOn(time);
      Serial.println("Turn A on");
    }
  }

  if (oca.getState() && oca.check(time, ms))
  {
    oca.turnOff();
  }
}