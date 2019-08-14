#include <Arduino.h>
#include <FastLED.h>
#define PUL 27 //define Pulse pin
#define DIR 14 //define Direction pin
#define IR 12  //IR sensor pin
#define NUM_LEDS 16
#define LED 22 //WS2812

// functions
void run(unsigned long interval);
void changeDirection();
void shutdownDevice();
void showLed();

unsigned long timer = 0;
unsigned long motorTimer = 0;
unsigned long touchTimer = 0;
unsigned long motorInterval = 5;

int res = 0;
bool isInit = 0;
bool shouldShutdown = 0;
int direction = 1;

//FastLED
CRGB leds[NUM_LEDS];

void setup()
{
  pinMode(PUL, OUTPUT);
  pinMode(DIR, OUTPUT);
  pinMode(IR, INPUT);

  digitalWrite(DIR, 0); //clockwise
  digitalWrite(PUL, 0);

  Serial.begin(9600);
  delay(5000);
  Serial.println("...Init...");
  delay(1000);
  Serial.println("...Finding Zero...");

  while (!isInit)
  {
    timer = millis();
    run(2);
    if (digitalRead(IR))
    {
      isInit = 1;
      digitalWrite(PUL, 0);
      res = 0;
      Serial.println("...Zero is Found...");
    }
  }
  showLed();
}

void loop()
{
  while (isInit)
  {
    timer = millis();
    if (digitalRead(IR))
    {
      res = 0;
    }
    shutdownDevice();
    changeDirection();
    run(2);
  }
}

void run(unsigned long interval)
{
  if (timer - motorTimer > interval)
  {
    digitalWrite(PUL, 1);
    res += direction;
    motorTimer = timer;
  }
}

void changeDirection()
{
  if (res > 100)
  {
    digitalWrite(DIR, 1); //counter clockwise
    direction = -1;
  }
  else if (res < -100)
  {
    digitalWrite(DIR, 0); //clockwise
    direction = 1;
  }
}

void shutdownDevice()
{
  if (touchRead(T0) < 20)
  {
    shouldShutdown = 1;
    Serial.println("...Shutdown Device...");
  }
  if (shouldShutdown && digitalRead(IR))
  {
    Serial.println("...Device is off...");
    isInit = 0;
  }
}

void showLed()
{
  FastLED.addLeds<NEOPIXEL, LED>(leds, NUM_LEDS);

  for (byte i = 0; i < NUM_LEDS; i++)
  {
    leds[i] = CRGB::Blue;
  }
  FastLED.show();
}
