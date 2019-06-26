#include "OTA23.h"

OTA23 ota23;
const char* ssid = "eball 2G";
const char* password = "0922981891";

const int led = 2; 
unsigned long previousMillis = 0;  
const unsigned long interval = 500;  
int ledState = LOW;

void setup() {
  pinMode(led, OUTPUT);
  digitalWrite(led, 0);
  ota23.init(ssid, password, 115200);
}

void loop() {
  ota23.run();
  
  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;
    ledState = !ledState;
    digitalWrite(led,  ledState);
  }
}
