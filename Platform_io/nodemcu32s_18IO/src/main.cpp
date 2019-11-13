#include <Arduino.h>
//4021
#define I_CLKPIN 33
#define I_LATCHPIN 32
#define I_DATAPIN 34
//595
#define O_DATA_PIN 17
#define O_CLK_PIN 4
#define O_LATCH_PIN 16

void iBtnHandler();   // 4021
void oLightHandler(); // 595

long timer, timeStep, serialTimer, serialTimeStep, globalTimer;
char iBtnState[] = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'};
char pressedBtn;
bool oLightSates[] = {1, 1, 1, 1, 1, 1, 1, 1};

void setup()
{
  //start serial
  Serial.begin(9600);
  Serial.println("START");

  //define pin modes
  pinMode(I_LATCHPIN, OUTPUT);
  pinMode(I_CLKPIN, OUTPUT);
  pinMode(I_DATAPIN, INPUT);
  pinMode(O_DATA_PIN, OUTPUT);
  pinMode(O_CLK_PIN, OUTPUT);
  pinMode(O_LATCH_PIN, OUTPUT);

  oLightHandler();

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
  iBtnHandler();

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
        pressedBtn = iBtnState[i];
        break;
      }
      else
      {
        pressedBtn = 'q';
      }
      digitalWrite(I_CLKPIN, 1);
    }

    timer = globalTimer;
  }
}

void oLightHandler()
{
  if (Serial.available() > 0)
  {
    byte serialIn = Serial.read();
    if (serialIn >= 48 && serialIn <= 56)
    {
      oLightSates[serialIn - 48] = 1; // 1 light off
    }
    if (serialIn >= 65 && serialIn <= 73)
    {
      oLightSates[serialIn - 65] = 0; // 0 light on
    }
    digitalWrite(O_LATCH_PIN, LOW);
    int i;
    for (i = 0; i < 8; i++)
    {
      int index = 7 - i;
      digitalWrite(O_DATA_PIN, oLightSates[index]);
      digitalWrite(O_CLK_PIN, HIGH);
      digitalWrite(O_CLK_PIN, LOW);
    }
    digitalWrite(O_LATCH_PIN, HIGH);
  }
}