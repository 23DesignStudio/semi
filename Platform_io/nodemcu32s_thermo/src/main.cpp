#include <Arduino.h>
#include "cmd.cpp"
#define RX2 16
#define TX2 17
#define BUFFER_SIZE 16
#define ARRAY_SIZE(array) (sizeof(array) / sizeof(array[0]))

byte buffer[BUFFER_SIZE];
// functions
void resetBuffer()
{
  for (int i = 0; i < BUFFER_SIZE; i++)
  {
    buffer[i] = 0;
  }
}

void mcuToThermo()
{
  if (Serial.available() > 0)
  {
    Serial.readBytes(buffer, BUFFER_SIZE);
    // String str = Serial.readString();
    // Serial.write("write: ");
    // Serial.write(buffer, BUFFER_SIZE);
    // Serial.write('\n');
    // delay(10);
    if (Serial2.availableForWrite() > 0)
    {
      Serial2.write(THERMO_INIT, ARRAY_SIZE(THERMO_INIT));
      Serial2.write(buffer, BUFFER_SIZE);
      Serial2.write(THERMO_PRINT, ARRAY_SIZE(THERMO_PRINT));
    }
    Serial.write("data is sent to thermo");
    delay(10);
    resetBuffer();
  }
}

// main thread
void setup()
{
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RX2, TX2);
  resetBuffer();
  delay(2000);
  Serial.write("Serial & Serial2 start...");
}

void loop()
{
  mcuToThermo();
}