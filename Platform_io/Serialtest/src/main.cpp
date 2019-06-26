#include <Arduino.h>

void setup()
{
  Serial.begin(9600);
  Serial.println("Start...");
}

void loop()
{
  Serial.write('1');
  delay(1000);
}