#include <Arduino.h>
#define PUL 26      //define Pulse pin
#define DIR 27      //define Direction pin
#define LED 2       //define LED pin

////function

//step driver run
void run(unsigned long interval);



////global variable
bool isInit = 0;

//step driver param
bool pulseState = 0;

//time param
unsigned long timer = 0;
unsigned long motorTimer = 0;
unsigned long motorInterval = 1;

//led
bool ledState = 0;

void setup() {
  pinMode(PUL, OUTPUT);
  pinMode(DIR, OUTPUT);
  pinMode(LED, OUTPUT);

  //init
  digitalWrite(DIR, 0); //ccw
  digitalWrite(PUL, pulseState);
  digitalWrite(LED, ledState);

  isInit = 1;

}

void loop() {
  while(isInit){
    timer = millis();
    run(motorInterval);
  }
}

void run(unsigned long interval)
{

  if (timer - motorTimer > interval)
  {
    pulseState = !pulseState;
    ledState = !ledState;
    digitalWrite(PUL, pulseState);
    digitalWrite(LED, ledState);
    motorTimer = timer;
  }
}