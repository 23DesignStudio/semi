#ifndef OTA23_h
#define OTA23_h

#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include "Arduino.h"

class OTA23{
  public:
    void init(const char* ssid, const char* password, int baudrate);
    void run();
};

#endif
