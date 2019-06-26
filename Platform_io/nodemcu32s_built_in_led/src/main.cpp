#include <Arduino.h>
#define LED 2

void setup()
{
  pinMode(LED, OUTPUT);
  digitalWrite(LED, 0);
  Serial.begin(9600);
  Serial.println("...Start...");
}

void loop()
{
  digitalWrite(LED, 1);
  Serial.println("LED is on");
  delay(1000);
  digitalWrite(LED, 0);
  Serial.println("LED is off");
  delay(1000);
}