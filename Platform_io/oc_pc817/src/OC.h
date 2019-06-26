
#ifndef OC_H
#define OC_H
#include <Arduino.h>
class OC
{
public:
  OC();
  ~OC();
  void setup(byte pin, char key);
  bool getState();
  char getKey();
  bool check(unsigned long timer, unsigned long &step);
  bool turnOn(unsigned long timer);
  bool turnOff();

private:
  byte _pin;
  bool _state;
  unsigned long _timer;
  char _key;
};
#endif
