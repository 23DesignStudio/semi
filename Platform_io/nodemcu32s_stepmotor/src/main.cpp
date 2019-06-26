#include <Arduino.h>
#include "MegunoLink.h"
#include "Filter.h"
#define PUL 27 //define Pulse pin
#define DIR 14 //define Direction pin
#define ENA 12 //define Enable Pin
#define POT 26 

bool dirState = 0;
bool pulState = 0;

int stepCounter = 0;
unsigned long timer = 0;

//steper
unsigned long motorTimer = 0;
unsigned long motorInterval = 1;

//pot
unsigned long potTimer = 0;
unsigned long potInterval = 3000;
int prePotState = -1;
int potState = 0;

bool isSent = 0;
int sentState = -1;
unsigned long sentTimer = 0;
unsigned long sentInterval = 10000;

ExponentialFilter<long> ADCFilter(10, 0);

void runPulses()
{
  digitalWrite(PUL, 1);
  digitalWrite(PUL, 0);
}

void getPotState()
{

  if (!isSent)
  {
    potState = floor((analogRead(POT) - 440) / 980.0);
    if (potState != sentState)
    {
      if (potState != prePotState)
      {
        potTimer = timer;
        prePotState = potState;
      }
      else
      {
        if (timer - potTimer > potInterval)
        {
          Serial.print("Sent: ");
          Serial.println(potState);
          potTimer = timer;
          isSent = 1;
          sentTimer = timer;
          sentState = potState;
        }
      }
    }
    else
    {
      potTimer = timer;
    }
  }
  else
  {
    if (timer - sentTimer > sentInterval)
    {
      potState = floor((analogRead(POT) - 440) / 980.0);
      isSent = 0;
      sentState = potState;
      prePotState = potState;
      Serial.println("ready to get new state...");
    }
  }
}

void setup()
{
  pinMode(PUL, OUTPUT);
  pinMode(DIR, OUTPUT);
  pinMode(ENA, OUTPUT);
  pinMode(POT, INPUT);
  digitalWrite(ENA, LOW);
  digitalWrite(DIR, LOW);
  digitalWrite(PUL, HIGH);

  Serial.begin(9600);
}

void loop()
{
  // timer = millis();
  // getPotState();

  runPulses();
  stepCounter++;
  if (stepCounter >= 2240)
  {
    dirState = !dirState;
    digitalWrite(DIR, dirState);
    stepCounter = 0;
  }
}
