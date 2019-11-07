#include <Arduino.h>
#define DATA_PIN 17
#define CLK_PIN 4
#define LATCH_PIN 16

//http://coopermaa2nd.blogspot.com/2010/12/arduino-lab12-74hc595-16-led.html

void btnLightControl();
bool btnSates[] = {1, 1, 1, 1, 1, 1, 1, 1}; // btn intial state

void setup()
{
  Serial.begin(9600);
  pinMode(DATA_PIN, OUTPUT);
  pinMode(CLK_PIN, OUTPUT);
  pinMode(LATCH_PIN, OUTPUT);

  // init btns
  btnLightControl(); // turn all lights off
}

void loop()
{
  if (Serial.available() > 0)
  {
    byte serialIn = Serial.read();
    if (serialIn >= 48 && serialIn <= 56)
    {
      btnSates[serialIn - 48] = 1; // 1 light off
    }
    if (serialIn >= 65 && serialIn <= 73)
    {
      btnSates[serialIn - 65] = 0; // 0 light on
    }
    btnLightControl();
  }
}

void btnLightControl()
{
  digitalWrite(LATCH_PIN, LOW);
  int i;
  for (i = 0; i < 8; i++)
  {
    int index = 7 - i;
    digitalWrite(DATA_PIN, btnSates[index]); 
    digitalWrite(CLK_PIN, HIGH);
    digitalWrite(CLK_PIN, LOW);
  }
  digitalWrite(LATCH_PIN, HIGH);
}