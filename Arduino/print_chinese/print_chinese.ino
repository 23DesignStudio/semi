#include "hz.c"

void setup() {
  Serial.begin(9600);
  Serial.println("...Start...");

}

void loop() {
  Serial.println(hz[0]);
  delay(1000);  
  Serial.println(hz[1]);
  delay(1000);   
  Serial.println(hz[2]);
  delay(1000);             

}
