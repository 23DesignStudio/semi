#include <Arduino.h>
const byte LED = 2;
void setup(){
    pinMode(LED, OUTPUT);
    digitalWrite(LED, 0);
}

void loop(){
    digitalWrite(LED, 1);
    delay(1000);
    digitalWrite(LED, 0);
    delay(1000);
}