#include <Arduino.h>
//4021
#define I_CLKPIN 32
#define I_LATCHPIN 33
#define I_DATAPIN 35
#define I_NINEPIN 36
//595
#define O_DATAPIN 2
#define O_CLKPIN 21
#define O_LATCHPIN 4
#define O_NINEPIN 22

void iBtnHandler();   // 4021
void oLightHandler(); // 595

long timer, timeStep, globalTimer;
int iBtnState[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};
char pressedBtn;
bool oLightSates[] = {1, 1, 1, 1, 1, 1, 1, 1, 1};

void setup()
{
  //start serial
  Serial.begin(9600);
  Serial.println("START");

  //define pin modes
  //4021
  pinMode(I_LATCHPIN, OUTPUT);
  pinMode(I_CLKPIN, OUTPUT);
  pinMode(I_DATAPIN, INPUT);
  pinMode(I_NINEPIN, INPUT);

  //595
  pinMode(O_DATAPIN, OUTPUT);
  pinMode(O_CLKPIN, OUTPUT);
  pinMode(O_LATCHPIN, OUTPUT);
  pinMode(O_NINEPIN, OUTPUT);

  oLightHandler();

  pressedBtn = 'q';

  //timer
  globalTimer = millis();
  timer = globalTimer;
  timeStep = 90;
}

void loop()
{
  globalTimer = millis();
  oLightHandler();
  iBtnHandler();
}

//CD4021
void iBtnHandler()
{
  if (globalTimer - timer > timeStep) //check 4021 evey 30ms
  {
    digitalWrite(I_LATCHPIN, 1); // HIGH -> 4021 collect data
    delayMicroseconds(20);
    digitalWrite(I_LATCHPIN, 0); // LOW -> mcu read data

    int _value;
    for (int i = 7; i >= 0; i--)
    {
      digitalWrite(I_CLKPIN, 0); // LOW to HIGH, sequencially read data from btn7 to btn0
      delayMicroseconds(0.2);
      _value = digitalRead(I_DATAPIN);
      if (_value)
      {
        int _btnValue = iBtnState[i];
        if( pressedBtn != _btnValue){
          Serial.println(_btnValue);
          pressedBtn = iBtnState[i];
        }
      }
      digitalWrite(I_CLKPIN, 1);
    }
    int _pinValue = digitalRead(I_NINEPIN);
    if (_pinValue && pressedBtn !=9)
    {
      Serial.print(9);
      pressedBtn = 9;
    }

    timer = globalTimer;
  }
}

void oLightHandler()
{
  if (Serial.available() > 0)
  {
    byte serialIn = Serial.read();
    if (serialIn >= 49 && serialIn <= 57)
    {
      oLightSates[serialIn - 49] = 0; // 0 light on
    }
    if (serialIn >= 65 && serialIn <= 73)
    {
      oLightSates[serialIn - 65] = 1; // 1 light off
    }
    digitalWrite(O_LATCHPIN, LOW);
    int i;
    for (i = 0; i < 8; i++)
    {
      int index = 7 - i;
      digitalWrite(O_DATAPIN, oLightSates[index]);
      digitalWrite(O_CLKPIN, HIGH);
      digitalWrite(O_CLKPIN, LOW);
    }
    digitalWrite(O_LATCHPIN, HIGH);
  }
}