#include <Arduino.h>
#define TOUCH_PIN 4
#define LED_PIN 2

unsigned long timer = 0;
unsigned long touch_timer = 0;
bool touch_state = 0;

void setup()
{
  Serial.begin(9600);
  delay(1000); // give me time to bring up serial monitor
  Serial.println("Touch Test");
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);
}

void loop()
{
  timer = millis();
  if (timer - touch_timer > 50)
  {
    if (!touch_state && touchRead(TOUCH_PIN) < 50)
    {
      touch_state = 1;
      touch_timer = timer;
      digitalWrite(LED_PIN, HIGH);
    }
    else if (touch_state && touchRead(TOUCH_PIN) > 50)
    {
      touch_state = 0;
      touch_timer = timer;
      digitalWrite(LED_PIN, LOW);
    }
  }
}