#include <Arduino.h>
#include <DigiCDC.h>

void setup() {
  SerialUSB.begin(); 
}

// the loop routine runs over and over again forever:
void loop() {

  // if (SerialUSB.available()) {
  //   SerialUSB.write(SerialUSB.read());
  // }

  SerialUSB.println(F("TEST!")); //wrap your strings in F() to save ram!
  
  SerialUSB.delay(1000);

   //SerialUSB.delay(10);
   /*
   if you don't call a SerialUSB function (write, print, read, available, etc) 
   every 10ms or less then you must throw in some SerialUSB.refresh(); 
   for the USB to keep alive - also replace your delays - ie. delay(100); 
   with SerialUSB.delays ie. SerialUSB.delay(100);
   */
}