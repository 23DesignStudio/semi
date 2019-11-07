#include <Arduino.h>
#define CLKPIN 33
#define LATCHPIN 32
#define DATAPIN 34

//https://www.arduino.cc/en/tutorial/ShiftIn
//https://assets.nexperia.com/documents/data-sheet/HEF4021B.pdf

long timer, timeStep, serialTimer, serialTimeStep, globalTimer;
char btnState[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'};
char pressedBtn;

void setup()
{
  //start serial
  Serial.begin(9600);
  Serial.println("START");

  //define pin modes
  pinMode(LATCHPIN, OUTPUT);
  pinMode(CLKPIN, OUTPUT);
  pinMode(DATAPIN, INPUT);

  pressedBtn = 'q';

  //timer
  globalTimer = millis();
  timer = globalTimer;
  timeStep = 1000;
  serialTimer = globalTimer;
  serialTimeStep = 1000;
}

void loop()
{
  globalTimer = millis();

  if (globalTimer - timer > timeStep) //check 4021 evey 30ms
  {
    digitalWrite(LATCHPIN, 1); // HIGH -> 4021 collect data
    delayMicroseconds(20);
    digitalWrite(LATCHPIN, 0); // LOW -> mcu read data

    int _value;
    for (int i = 7; i >= 0; i--)
    {
      digitalWrite(CLKPIN, 0); // LOW to HIGH, sequencially read data from btn7 to btn0
      delayMicroseconds(0.2);
      _value = digitalRead(DATAPIN);
      if (_value)
      {
        pressedBtn = btnState[i];
        break;
      }
      else
      {
        pressedBtn = 'q';
      }
      digitalWrite(CLKPIN, 1);
    }

    timer = globalTimer;
  }

  if (globalTimer - serialTimer > serialTimeStep)
  {
    if (pressedBtn != 'q')
    {
      Serial.println("====================");
      Serial.print(pressedBtn);
      Serial.println(" is pressed.");
    }
    serialTimer = globalTimer;
  }
}
