#include <Arduino.h>
#include "MegunoLink.h"
#include "Filter.h"
#define PUL 27 //define Pulse pin
#define DIR 14 //define Direction pin
#define POT 26 //POT pin
#define IR 12  //IR sensor pin
#define LED 2  //built-in LED

//Target
int _LEFT = -400;
int _MID = 0;
int _RIGHT = 400;

int oldState = 0;
int newState = 0;
int dirState = 0;

//stepper
bool pulState = 0;

unsigned long timer = 0;
unsigned long motorTimer = 0;
unsigned long motorInterval = 5;
bool motorState = 0;

//pot
unsigned long potTimer = 0;
unsigned long potInterval = 2000;
ExponentialFilter<long> ADCFilter(10, 0);

//initiate
bool isInit = 0;

//serial event
bool isReady = 0;

void runTo(int direction)
{
  if (timer - motorTimer > motorInterval)
  {
    if (newState == _MID)
    {
      if (!digitalRead(IR))
      {
        motorState = !motorState;
        digitalWrite(PUL, motorState);
        motorTimer = timer;
        oldState += direction;
      }
      else
      {
        oldState = 0;
      }
    }
    else
    {
      if (oldState < newState)
      {
        motorState = !motorState;
        digitalWrite(PUL, motorState);
        motorTimer = timer;
        oldState += direction;
      }
      else if (oldState > newState)
      {
        motorState = !motorState;
        digitalWrite(PUL, motorState);
        motorTimer = timer;
        oldState += direction;
      }
    }
  }
}

void run(unsigned long interval)
{
  if (timer - motorTimer > interval)
  {
    motorState = !motorState;
    digitalWrite(PUL, motorState);
    motorTimer = timer;
  }
}

void sendAngle()
{
  if (timer - potTimer > potInterval)
  {
    Serial.println(ADCFilter.Current());
    potTimer = timer;
  }
}

void serialEvent()
{
  if (isReady && Serial.available())
  {
    char in = (char)Serial.read();
    switch (in)
    {
    case 'L':
      newState = _LEFT;
      digitalWrite(LED, 0);
      break;
    case 'M':
      newState = _MID;
      digitalWrite(LED, 0);
      break;
    case 'R':
      newState = _RIGHT;
      digitalWrite(LED, 0);
      break;
    case 'B':
      digitalWrite(LED, 1);
      break;
    }
    if (newState - oldState < 0)
    {
      digitalWrite(DIR, 1);
      dirState = -1;
    }
    else
    {
      digitalWrite(DIR, 0);
      dirState = 1;
    }
  }
}

void setup()
{
  //init pin
  pinMode(PUL, OUTPUT);
  pinMode(DIR, OUTPUT);
  pinMode(LED, OUTPUT);
  pinMode(IR, INPUT);
  pinMode(POT, INPUT);

  //init direction and pulse
  digitalWrite(DIR, 0); //clockwise
  digitalWrite(PUL, pulState);
  digitalWrite(LED, 1);

  Serial.begin(9600);
  delay(5000);
  Serial.println("...Init...");
  delay(1000);
  Serial.println("Finding Zero");
  while (!isInit)
  {
    timer = millis();
    run(2);
    if (digitalRead(IR))
    {
      isInit = 1;
    }
  }
  Serial.println("Reach Zero");
  Serial.println("...Ready...");
  delay(2000);
  oldState = _MID;
  newState = _MID;
  isReady = 1;
}

void loop()
{
  timer = millis();
  serialEvent();
  // int rawPot = floor(analogRead(POT) / 68.3); //0-59
  // ADCFilter.Filter(rawPot);
  // sendAngle();
  runTo(dirState);
}
