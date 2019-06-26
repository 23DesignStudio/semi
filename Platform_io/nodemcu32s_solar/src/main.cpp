#include <Arduino.h>
// #include "MegunoLink.h"
// #include "Filter.h"
#define SOLAR_A 4
#define SOLAR_B 2
#define ARR_SIZE 10

unsigned long timer = 0;
unsigned long trigger = 0;
// ExponentialFilter<long> ADCFilter_A(10, 0);
// ExponentialFilter<long> ADCFilter_B(10, 0);
unsigned long avgTimer = 0;
int solarArray_A[ARR_SIZE];
int solarArray_B[ARR_SIZE];
byte counter = 0;

void addToBuffer(unsigned long timeStep, int scalar)
{
  if (counter >= ARR_SIZE)
  {
    counter = 0;
  }
  if ((timer - avgTimer) > timeStep)
  {
    solarArray_A[counter] = int(analogRead(SOLAR_A) / scalar);
    solarArray_B[counter] = int(analogRead(SOLAR_B) / scalar);
    avgTimer = timer;
    counter++;
  }
}

int avgValue(byte run, int *ptr)
{
  int sum = 0;
  for (byte i = 0; i < run; i++)
  {
    int temp = *(ptr + i);
    sum += temp;
  }
  return (sum / run);
}

void setup()
{
  pinMode(SOLAR_A, INPUT);
  pinMode(SOLAR_B, INPUT);

  for (byte i = 0; i < ARR_SIZE; i++)
  {
    solarArray_A[i] = 0;
    solarArray_B[i] = 0;
  }
  Serial.begin(9600);
}

void loop()
{
  timer = millis();
  addToBuffer(10, 64); //4096 / 64 > 0 - 63
  // int raw_B = analogRead(SOLAR_B);
  // ADCFilter_B.Filter(raw_B);
  if (timer > 2000 && timer - trigger > 1000)
  {
    // Serial.println("--------------");
    // Serial.println(solarArray_A[0]);
    // Serial.println(solarArray_A[1]);
    // Serial.println(solarArray_A[2]);
    // Serial.println(solarArray_A[3]);
    // Serial.println(solarArray_A[4]);
    // Serial.println(solarArray_A[5]);
    // Serial.println(solarArray_A[6]);
    // Serial.println(solarArray_A[7]);
    // Serial.println(solarArray_A[8]);
    // Serial.println(solarArray_A[9]);
    // Serial.println("--------------");

    // Serial.print(ADCFilter_A.Current());
    int value_A = avgValue(ARR_SIZE, solarArray_A) - 37;
    if (value_A < 0)
    {
      value_A = 0;
    }
    int value_B = avgValue(ARR_SIZE, solarArray_B) - 10;
    if (value_B < 0)
    {
      value_B = 0;
    }
    Serial.print(value_A);
    Serial.print(",");
    // Serial.println(ADCFilter_B.Current());
    Serial.println(value_B);
    trigger = timer;
  }
}