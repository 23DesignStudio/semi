#include <Arduino.h>

byte data;
const byte buttonPin[] = {22, 24, 26, 28, 30, 32, 34, 40, 38};
const byte relay[] = {2, 3, 4, 5, 6, 7, 8, 9, 10};
bool btnState[8];
unsigned long btnTimer[8];

void serialEvent()
{
  while (Serial.available())
  {
    data = (byte)Serial.read();
    Serial.print("data : ");
    Serial.print(data);

    if (data > 64 && data < 73)
    {
      digitalWrite(relay[data - 64], 0);
    }
    else if (data > 48 && data < 58)
    {
      digitalWrite(relay[data - 48], 1);
    }
  }
}

void setup()
{
  Serial.begin(9600);
  for (byte i = 0; i < 9; ++i)
  {
    pinMode(buttonPin[i], INPUT_PULLUP);
    pinMode(relay[i], OUTPUT);
    digitalWrite(relay[i], 0);
    btnState[i] = 0;
    btnTimer[i] = 0;
  }
}

void loop()
{
  unsigned long timer = millis();
  for (byte i = 0; i < 9; i++)
  {
    if (!btnState[i] && digitalRead(i))
    {
      btnState[i] = 1;
      btnTimer[i] = timer;
      Serial.write(i);
    }
    if (btnState[i] && timer - btnTimer[i] > 50)
    {
      btnState[i] = 0;
    }
  }
}
