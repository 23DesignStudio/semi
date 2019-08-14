#include <Arduino.h>
#include <FastLED.h>

#define NUM_LEDS 16
#define DATA_PIN 2

CRGB leds[NUM_LEDS];

void setup()
{
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

  for (byte i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = CRGB::Red;
  }
  FastLED.show();
}

void loop()
{
}