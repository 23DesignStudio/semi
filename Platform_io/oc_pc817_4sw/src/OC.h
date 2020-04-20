
#ifndef OC_H
#define OC_H
#include <Arduino.h>
class OC
{
public:
  OC();
  ~OC();
  void setup(byte pin, char key); // define arduino output pin and trigger letter sent from Unity
  bool getState(); // get oc state 
  char getKey(); // get letter defined by Unity
  bool check(unsigned long timer, unsigned long &step); // check if time of oc state set to true last longer than step
  bool turnOn(unsigned long timer); // set output LOW to turn oc on
  bool turnOff();// set output HIGH to turn oc off

private:
  byte _pin;
  bool _state;
  unsigned long _timer;
  char _key;
};
#endif
