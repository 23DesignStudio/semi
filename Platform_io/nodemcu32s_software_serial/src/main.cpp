#include <Arduino.h>
#include <SoftwareSerial.h>

SoftwareSerial swSer(3, 1, false, 256);

void setup()
{
  Serial.begin(115200);
  swSer.begin(9600);

  Serial.println("\nSoftware serial test started");

  for (char ch = ' '; ch <= 'z'; ch++)
  {
    swSer.write(ch);
  }
  swSer.println("");
}

void loop()
{
  while (swSer.available() > 0)
  {
    Serial.write(swSer.read());
  }
  while (Serial.available() > 0)
  {
    swSer.write(Serial.read());
  }
}