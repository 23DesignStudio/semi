#include "OTA23.h"
#define ROTARY 36

const char* ssid = "eball 2G";
const char* pwd = "0922981891";
unsigned long timer = 0;
unsigned long read_timer = 0;
unsigned long interval = 200;

OTA23 ota23;
void setup() {
  pinMode(ROTARY, INPUT);
  ota23.init(ssid, pwd, 115200);

}

void loop() {
  timer = millis();
  ota23.run();
  if(timer - read_timer > interval){
    int value = analogRead(ROTARY);
    ota23.print("Value: ");
    ota23.println(String(value));
    read_timer = timer;
  }
}
