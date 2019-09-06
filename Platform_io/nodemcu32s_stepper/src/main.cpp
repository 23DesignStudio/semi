#include <Arduino.h>
#include <FastLED.h>
#define PUL 12      //define Pulse pin
#define DIR 14      //define Direction pin
#define IR_LEFT 26  //IR sensor 1
#define IR_RIGHT 27 //IR sensor 2
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

bool isInit = 1;
bool shouldShutdown = 0;
bool direction = 1; //1 : cw; -1 : ccw
bool pulseState = 0;

int step_counter = 0;

//FastLED
CRGB leds[NUM_LEDS];

void setup()
{
  pinMode(PUL, OUTPUT);
  pinMode(DIR, OUTPUT);
  pinMode(IR_LEFT, INPUT);
  pinMode(IR_RIGHT, INPUT);

  digitalWrite(DIR, 0); //ccw
  digitalWrite(PUL, pulseState);

  Serial.begin(9600);
  showLed();
}

void loop()
{
  while (isInit)
  {
    timer = millis();
    shutdownDevice();
    changeDirection();
    run(1);
  }
}

void run(unsigned long interval)
{

  if (timer - motorTimer > interval)
  {
    pulseState = !pulseState;
    digitalWrite(PUL, pulseState);
    step_counter += direction;
    motorTimer = timer;
  }
}

void changeDirection()
{
  if (digitalRead(IR_RIGHT))
  {
    digitalWrite(DIR, 0); //ccw
    direction = 1;
    Serial.print('step: ');
    Serial.println(step_counter);
  }
  else if (digitalRead(IR_LEFT))
  {
    digitalWrite(DIR, 1); //ccw
    direction = -1;
    Serial.print('step: ');
    Serial.println(step_counter);
  }
}

void shutdownDevice()
{
  if (shouldShutdown != 1 && touchRead(T0) < 20)
  {
    shouldShutdown = 1;
    Serial.println("...Shutdown Device...");
  }
  if (shouldShutdown && digitalRead(IR_RIGHT))
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
