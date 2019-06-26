#include <Arduino.h>
#define ADC 36

int old_value = 0;
void setup()
{
  pinMode(ADC, INPUT);
  Serial.begin(9600);
  Serial.println("...start...");
}

void loop()
{
  int value = analogRead(ADC);
  if (abs(value - old_value) > 100)
  {
    Serial.print("Value: ");
    Serial.println(value);
    old_value = value;
    delay(500);
  }
}