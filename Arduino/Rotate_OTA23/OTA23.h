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
    void print(String message);
    void println(String message);
  private:
    WiFiServer _telnet;
    WiFiClient _client;
    bool _haveClient;
};

#endif
