#include "OC.h"
OC::OC()
{
  _state = false; //oc state
  _timer = 0;
}
OC::~OC()
{
}

void OC::setup(byte pin, char key)
{
  _pin = pin; // Arduino outpout pin
  _key = key; // letter sent from Unity 
  pinMode(_pin, OUTPUT);
  digitalWrite(_pin, 1); // initiate pin state
}

bool OC::getState()
{
  return _state;
}

char OC::getKey()
{
  return _key;
}

bool OC::check(unsigned long timer, unsigned long &step)
{
  if (_state && timer - _timer > step)
  {
    return true;
  }
  else
  {
    return false;
  }
}

bool OC::turnOn(unsigned long timer)
{
  if (_state)
  {
    return false;
  }
  else
  {
    digitalWrite(_pin, 0);
    _timer = timer;
    _state = true;
    return true;
  }
}

bool OC::turnOff()
{

  if (!_state)
  {
    return false;
  }
  else
  {
    digitalWrite(_pin, 1);
    _state = false;
    return true;
  }
}