#include "OTA23.h"
#define TOUCH_PIN 4

const char* ssid = "eball 2G";
const char* pwd = "0922981891";
unsigned long timer = 0;
unsigned long read_timer = 0;
unsigned long interval = 200;

OTA23 ota23;
void setup() {
  ota23.init(ssid, pwd, 115200);
}

void loop() {
  timer = millis();
  ota23.run();
  if(timer - read_timer > interval){
    int value = touchRead(TOUCH_PIN);
    ota23.print("Value: ");
    ota23.println(String(value));
    read_timer = timer;
  }
}
