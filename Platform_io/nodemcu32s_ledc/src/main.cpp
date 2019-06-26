#include <Arduino.h>
#define LED_PIN 2

int freq = 5000;
byte ledChannel = 0; // 0-15
int resolution = 8;  // 1-16
byte dutyCycle = 0;
byte velocity = 1;

void setup()
{
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(LED_PIN, ledChannel);
  ledcWrite(ledChannel, dutyCycle);
}

void loop()
{
  dutyCycle += velocity;
  ledcWrite(ledChannel, dutyCycle);
  if (dutyCycle == 255 || dutyCycle == 0)
  {
    velocity *= -1;
  }
  delay(10);
}